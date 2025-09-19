"use client";

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useMqtt } from '@/contexts/mqtt-context';
import { toast } from "sonner";

interface PixelDisplayProps {
  image: string;
  author: string | null;
  created_at: string;
}

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
const DISPLAY_SIZE = 240; // 24 * 10
const PIXEL_SCALE = DISPLAY_SIZE / GRID_SIZE;
const MQTT_TOPIC = 'ehpmcp/esp/pixel/set';

const PixelDisplay: React.FC<PixelDisplayProps> = ({ image, author, created_at }) => {
  const { client, connectionStatus } = useMqtt();

  const parseAndDrawImage = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = DISPLAY_SIZE;
    canvas.height = DISPLAY_SIZE;
    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < image.length; i++) {
      const colorIndex = parseInt(image[i], 10);
      const x = i % GRID_SIZE;
      const y = Math.floor(i / GRID_SIZE);

      ctx.fillStyle = PIXEL_COLORS[colorIndex] || PIXEL_COLORS[0]; // Default to black if index is out of bounds
      ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
    }
  }, [image]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      parseAndDrawImage(canvasRef.current);
    }
  }, [parseAndDrawImage]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  const handleSendMqtt = () => {
    if (!client || connectionStatus !== 'connected') {
      toast.error("MQTT client not connected.", {
        description: "Please wait for the connection to be established or check the console for errors.",
      });
      return;
    }

    toast.info("Enviando imagem!");

    const imageId = Math.random().toString(36).substring(2, 10);
    const totalPixels = GRID_SIZE * GRID_SIZE;
    const chunkSize = totalPixels / 4;
    const dataString = image;
    let partsSent = 0;

    for (let i = 0; i < 4; i++) {
      const chunkData = dataString.substring(i * chunkSize, (i + 1) * chunkSize);
      const payload = `${imageId},${i + 1},${chunkData}`;
      
      client.publish(MQTT_TOPIC, payload, (err) => {
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
          }
        }
      });
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col items-center">
      <canvas ref={canvasRef} className="border border-gray-300"></canvas>
      <div className="mt-2 text-center">
        <p className="text-lg font-semibold">{author || 'Anônimo'}</p>
        <p className="text-sm text-gray-500">{formatDateTime(created_at)}</p>
      </div>
      <Button onClick={handleSendMqtt} className="mt-4" size="sm" variant="outline">
        <Send className="w-4 h-4 mr-2" /> Enviar via MQTT
      </Button>
    </div>
  );
};

export default PixelDisplay;
