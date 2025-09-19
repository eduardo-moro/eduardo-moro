"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Undo, Redo, Eraser, Grid, Download, Send } from 'lucide-react';
import { useMqtt } from '@/contexts/mqtt-context';
import { toast } from "sonner";

// --- Constants ---
const GRID_SIZE = 24;
const PIXEL_COLORS = [
  '#000000', // 0 TFT_BLACK
  '#e43b44', // 1 red
  '#ffa300', // 2 orange
  '#fbf236', // 3 yellow
  '#32cd32', // 4 green
  '#00ffff', // 5 cyan
  '#2472c8', // 6 blue
  '#7b41d9', // 7 purple
  '#f81894', // 8 pink
  '#FFFFFF', // 9 TFT_WHITE
];
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 40;
const PREVIEW_SIZE = 240;
const MQTT_TOPIC = 'ehpmcp/esp/pixel/set';
const SEND_COOLDOWN_MS = 5000; // 5 seconds cooldown


// --- Helper Functions ---
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

// --- Main Component ---
const PixelEditor = () => {
  // --- State and Refs ---
  const [grid, setGrid] = useState<Uint8Array>(() => new Uint8Array(GRID_SIZE * GRID_SIZE).fill(0));
  const [author, setAuthor] = useState('');
  const [currentColorIndex, setCurrentColorIndex] = useState(1);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGridLines, setShowGridLines] = useState(true);
  const { client, connectionStatus } = useMqtt();
  const [showIntro, setShowIntro] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const undoStack = useRef<Uint8Array[]>([]);
  const redoStack = useRef<Uint8Array[]>([]);
  const isPanning = useRef(false);
  const isPainting = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const lastPixel = useRef<{ x: number, y: number } | null>(null);
  const lastSentImage = useRef<string | null>(null);
  const lastSentTime = useRef<number>(0);

  // --- Core Drawing Logic ---
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const container = containerRef.current;
    if (!ctx || !canvas || !container) return;

    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const pixelSize = (width / GRID_SIZE) * zoom;
    const gap = showGridLines ? 1 : 0;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    const startX = pan.x - (pixelSize * GRID_SIZE - width) / 2;
    const startY = pan.y - (pixelSize * GRID_SIZE - height) / 2;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const colorIndex = grid[y * GRID_SIZE + x];
        ctx.fillStyle = PIXEL_COLORS[colorIndex];
        ctx.fillRect(
          startX + x * pixelSize,
          startY + y * pixelSize,
          pixelSize - gap,
          pixelSize - gap
        );
      }
    }
  }, [grid, zoom, pan, showGridLines]);

  const drawPreview = useCallback(() => {
    const canvas = previewRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    canvas.width = PREVIEW_SIZE;
    canvas.height = PREVIEW_SIZE;
    ctx.imageSmoothingEnabled = false;
    const pixelSize = PREVIEW_SIZE / GRID_SIZE;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const colorIndex = grid[y * GRID_SIZE + x];
        ctx.fillStyle = PIXEL_COLORS[colorIndex];
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [grid]);

  // --- Effects ---
  useEffect(() => {
    const savedGrid = localStorage.getItem('pixelArt');
    if (savedGrid) {
      try {
        const parsedGrid = JSON.parse(savedGrid);
        if (parsedGrid.length === GRID_SIZE * GRID_SIZE) {
          setGrid(new Uint8Array(parsedGrid));
        }
      } catch (e) {
        console.error("Failed to load from localStorage", e);
      }
    }
    // Set initial zoom to fit grid
    if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const initialPixelSize = width / GRID_SIZE;
        setZoom(initialPixelSize / (width / GRID_SIZE));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pixelArt', JSON.stringify(Array.from(grid)));
    drawGrid();
    drawPreview();
  }, [grid, drawGrid, drawPreview]);

  useEffect(() => {
    drawGrid();
  }, [zoom, pan, showGridLines, drawGrid]);

  useEffect(() => {
    const handleResize = () => drawGrid();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawGrid]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro) return;
      if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (!isNaN(parseInt(e.key))) {
        const num = parseInt(e.key);
        if (num >= 0 && num < PIXEL_COLORS.length) {
          setCurrentColorIndex(num);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro]);

  // --- State Modifiers ---
  const updateGridPixel = (x: number, y: number, colorIndex: number) => {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;
    const index = y * GRID_SIZE + x;
    if (grid[index] !== colorIndex) {
      const newGrid = new Uint8Array(grid);
      newGrid[index] = colorIndex;
      setGrid(newGrid);
    }
  };
  
  const recordUndo = () => {
    undoStack.current.push(new Uint8Array(grid));
    redoStack.current = []; // Clear redo stack on new action
    if (undoStack.current.length > 50) { // Limit undo history
        undoStack.current.shift();
    }
  };

  // --- Event Handlers ---
  const getMousePosOnGrid = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return null;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const pixelSize = (rect.width / GRID_SIZE) * zoom;
    const startX = pan.x - (pixelSize * GRID_SIZE - rect.width) / 2;
    const startY = pan.y - (pixelSize * GRID_SIZE - rect.height) / 2;

    const x = Math.floor((clientX - rect.left - startX) / pixelSize);
    const y = Math.floor((clientY - rect.top - startY) / pixelSize);

    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) { // Middle mouse or Ctrl+Click
      isPanning.current = true;
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
    } else if (e.button === 0) { // Left click
      isPainting.current = true;
      recordUndo();
      const pos = getMousePosOnGrid(e);
      if (pos) {
        updateGridPixel(pos.x, pos.y, currentColorIndex);
        lastPixel.current = pos;
      }
    } else if (e.button === 2) { // Right click for eyedropper
        const pos = getMousePosOnGrid(e);
        if (pos && pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE) {
            const colorIndex = grid[pos.y * GRID_SIZE + pos.x];
            setCurrentColorIndex(colorIndex);
        }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPanning.current) {
      const dx = e.clientX - lastPanPoint.current.x;
      const dy = e.clientY - lastPanPoint.current.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
    } else if (isPainting.current) {
      const pos = getMousePosOnGrid(e);
      if (pos && (pos.x !== lastPixel.current?.x || pos.y !== lastPixel.current?.y)) {
        updateGridPixel(pos.x, pos.y, currentColorIndex);
        lastPixel.current = pos;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    isPanning.current = false;
    isPainting.current = false;
    lastPixel.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -Math.sign(e.deltaY);
    const zoomFactor = 1.2;
    const newZoom = clamp(zoom * (delta > 0 ? zoomFactor : 1 / zoomFactor), MIN_ZOOM, MAX_ZOOM);
    setZoom(newZoom);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) { // Paint
        isPainting.current = true;
        recordUndo();
        const pos = getMousePosOnGrid(e);
        if (pos) {
            updateGridPixel(pos.x, pos.y, currentColorIndex);
            lastPixel.current = pos;
        }
    } else if (e.touches.length === 2) { // Pan / Zoom
        isPanning.current = true;
        // Add pinch-to-zoom logic here if desired
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      e.preventDefault();
      if (isPainting.current && e.touches.length === 1) {
          const pos = getMousePosOnGrid(e);
          if (pos && (pos.x !== lastPixel.current?.x || pos.y !== lastPixel.current?.y)) {
              updateGridPixel(pos.x, pos.y, currentColorIndex);
              lastPixel.current = pos;
          }
      }
  };

  const handleTouchEnd = () => {
      isPainting.current = false;
      isPanning.current = false;
      lastPixel.current = null;
  };

  // --- Button Actions ---
  const handleUndo = useCallback(() => {
    if (undoStack.current.length > 0) {
      const lastState = undoStack.current.pop();
      if (lastState) {
        redoStack.current.push(new Uint8Array(grid));
        setGrid(lastState);
      }
    }
  }, [grid]);

  const handleRedo = useCallback(() => {
    if (redoStack.current.length > 0) {
      const nextState = redoStack.current.pop();
      if (nextState) {
        undoStack.current.push(new Uint8Array(grid));
        setGrid(nextState);
      }
    }
  }, [grid]);

  const handleClear = () => {
    recordUndo();
    setGrid(new Uint8Array(GRID_SIZE * GRID_SIZE).fill(0));
  };

  const handleSend = async () => {
    if (!client || connectionStatus !== 'connected') {
      toast.error("MQTT client not connected.", {
        description: "Please wait for the connection to be established or check the console for errors.",
      });
      return;
    }

    const dataString = Array.from(grid).join('');
    const currentTime = Date.now();

    if (lastSentImage.current === dataString && (currentTime - lastSentTime.current < SEND_COOLDOWN_MS)) {
      toast.info("Same image sent recently. Please wait or make changes.");
      return;
    }

    toast.info("Sending pixel data via MQTT...");

    const imageId = Math.random().toString(36).substring(2, 10);
    const totalPixels = GRID_SIZE * GRID_SIZE;
    const chunkSize = totalPixels / 4;
    let partsSent = 0;

    for (let i = 0; i < 4; i++) {
      const chunkData = dataString.substring(i * chunkSize, (i + 1) * chunkSize);
      const payload = `${imageId},${i + 1},${chunkData}`;
      
      client.publish(MQTT_TOPIC, payload, async (err) => {
        if (err) {
          console.error(`Failed to send part ${i + 1}`, err);
          toast.error(`Failed to send part ${i + 1}`, { description: err.message });
        } else {
          console.log(`Successfully sent part ${i + 1}`);
          partsSent++;
          if (partsSent === 4) {
            toast.success("Pixel data sent successfully!", {
              description: `Image ID: ${imageId}`,
            });
            // Save to Supabase after successful MQTT send
            const response = await fetch('/api/pixels', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ author, image: dataString }),
            });

            if (response.ok) {
              toast.success("Arte salva no banco de dados!");
              lastSentImage.current = dataString;
              lastSentTime.current = currentTime;
            } else {
              toast.error("Ih, deu ruim pra salvar a arte no banco de dados");
            }
          }
        }
      });
    }
  };

  const handleSavePng = () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = GRID_SIZE;
    tempCanvas.height = GRID_SIZE;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        ctx.fillStyle = PIXEL_COLORS[grid[y * GRID_SIZE + x]];
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className='pb-12 pt-[-2em]'>
      <canvas
        ref={previewRef}
        className="sticky z-10 rounded-2xl top-14 left-4 opacity-50 border-1 border-foreground hover:opacity-100 hidden md:block"
        style={{ imageRendering: 'pixelated', width: `${PREVIEW_SIZE}px`, height: `${PREVIEW_SIZE}px` }}
      />
      <div className="top-[-5em] w-full h-[90dvh] pt-12 flex flex-col md:flex-row  text-gray-900 dark:text-gray-100 items-center">
        {/* --- Toolbar --- */}
        <div className="flex flex-row md:flex-col items-center p-2 space-x-2 md:space-x-0 md:space-y-2">
          <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
              <Button title="Undo (Ctrl+Z)" size="icon" variant="outline" onClick={handleUndo}><Undo className="w-5 h-5" /></Button>
              <Button title="Redo (Ctrl+Y)" size="icon" variant="outline" onClick={handleRedo}><Redo className="w-5 h-5" /></Button>
          </div>
          <div className="w-px md:w-full h-full md:h-px bg-gray-400 dark:bg-gray-600 my-2"></div>
          <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
              <Button title="Toggle Grid"  size="icon" variant={showGridLines ? "secondary" : "outline"} onClick={() => setShowGridLines(s => !s)}><Grid className="w-5 h-5" /></Button>
              <Button title="Clear Canvas" size="icon" variant="outline" onClick={handleClear}><Eraser className="w-5 h-5" /></Button>
              <Button title="Save as PNG"  size="icon" variant="outline" onClick={handleSavePng}><Download className="w-5 h-5" /></Button>
              <Button title="Send to MQTT" size="icon" variant="outline" onClick={handleSend}><Send className="w-5 h-5" /></Button>
          </div>
          <div className="w-px md:w-full h-full md:h-px bg-gray-400 dark:bg-gray-600 my-2"></div>
            <Input
                type="text"
                placeholder="Seu nome (opcional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-24"
            />
        </div>

        {/* --- Main Canvas --- */}
        <div className='flex justify-around overflow-hidden rounded w-full'>
          <div
            ref={containerRef}
            className="relative flex-1 cursor-crosshair overflow-hidden touch-none drop-shadow-white drop-shadow aspect-square max-w-[1000px]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => e.preventDefault()}
            >
            {showIntro && (
                <div className="absolute inset-0 bg-[#0006] backdrop-blur-sm z-20 flex items-center justify-center p-4">
                    <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-lg max-w-sm text-center font-sans">
                        <h2 className="text-2xl font-bold mb-4">Bem vindo ao meu paint!</h2>
                        <p className="mb-4 ">Este quadro de pixel art está conectado ao meu <a href='https://github.com/eduardo-moro/fake-geek-magic-os'>relógio de mesa</a>, você pode baixar sua arte, ou me envia-la, ela vai aparecer por aqui por meio minuto, pode confiar!<br/><br/><span className='text-sm hidden md:block'>Pro tip: você pode me enviar uma animação de até 10 frames também, é só desenhar e enviar os frames em sequência e poderei visualiza-los!</span></p>
                        <Button onClick={() => setShowIntro(false)}>Que massa! bora lá</Button>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef}/>
          </div>
        </div>


        {/* --- Palette --- */}
        <div className="flex flex-row justify-around items-center w-70 flex-wrap center p-6 h-34 md:w-20 md:h-full md:flex-col">
          {PIXEL_COLORS.map((color, index) => (
            <button
              key={color}
              title={`${color.toUpperCase()} (${index})`}
              onClick={() => setCurrentColorIndex(index)}
              className={`relative w-10 h-10 aspect-square rounded-full transition-transform duration-150 border-foreground border-2 ${currentColorIndex === index ? 'scale-120' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PixelEditor;
