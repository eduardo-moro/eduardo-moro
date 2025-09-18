import React, { useState, useEffect } from 'react';
import { useMqtt } from '@/contexts/mqtt-context';

interface PomodoroProps {
  className?: string;
}

const degToRad = (degrees: number) => degrees * (Math.PI / 180);

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = {
    x: x + radius * Math.cos(degToRad(startAngle)),
    y: y + radius * Math.sin(degToRad(startAngle)),
  };
  const end = {
    x: x + radius * Math.cos(degToRad(endAngle)),
    y: y + radius * Math.sin(degToRad(endAngle)),
  };

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
  ].join(' ');

  return d;
};

export default function Pomodoro({ className = "" }: PomodoroProps) {
  const [arcAngle, setArcAngle] = useState<number>(0); // Default angle
  const [arcColor, setArcColor] = useState<string>('rgb(0,0,0)'); // Default color
  const { client, connectionStatus } = useMqtt();
  const topic = 'ehpmcp/esp/rgb/set';

  useEffect(() => {
    if (client && connectionStatus === 'connected') {
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Pomodoro subscribed to ${topic}`);
        } else {
          console.error(`Pomodoro subscription error to ${topic}:`, err);
        }
      });

      const messageHandler = (msgTopic: string, message: Buffer) => {
        if (msgTopic === topic) {
          console.log(`Pomodoro received message from topic ${msgTopic}: ${message.toString()}`);
          const parts = message.toString().split(',');
          if (parts.length === 4) {
            const angle = parseFloat(parts[0]);
            const r = parseInt(parts[1], 10);
            const g = parseInt(parts[2], 10);
            const b = parseInt(parts[3], 10);

            if (!isNaN(angle) && !isNaN(r) && !isNaN(g) && !isNaN(b)) {
              setArcAngle(angle);
              setArcColor(`rgb(${r},${g},${b})`);
            } else {
              console.warn('Invalid MQTT message format for arc:', message.toString());
            }
          } else {
            console.warn('Unexpected MQTT message format:', message.toString());
          }
        }
      };

      client.on('message', messageHandler);

      return () => {
        client.removeListener('message', messageHandler);
        client.unsubscribe(topic, (err) => {
          if (!err) {
            console.log(`Pomodoro unsubscribed from ${topic}`);
          }
        });
      };
    }
  }, [client, connectionStatus]);

  const centerX = 100;
  const centerY = 100;
  const radius = 80;

  const startAngle = 90;
  const endAngle = 90 + arcAngle -1;

  const arcPath = describeArc(centerX, centerY, radius, startAngle, endAngle);

  return (
    <div className={`select-none font-sans ${className}`}>
      <div className="flex flex-col pb-12 h-screen justify-center">
        <div className='flex flex-col md:flex-row md:gap-20'>
          <div className='flex flex-col justify-center items-center'>
            <div className='bg-accent rounded-full scale-60 md:scale-100'>
              <svg width="300" height="300" viewBox="0 0 200 200">
                <path
                  d={arcPath}
                  fill="none"
                  stroke={arcColor}
                  strokeWidth="8"
                  />
              </svg>
            </div>
          </div>
          <div className='h-full flex flex-col justify-start text-center md:text-left md:justify-center'>
            <span>
              <h3 className="text-md text-slate-400">
                <span>wss://broker.emqx.io/mqtt/esp/rgb/set</span>
              </h3>
              <br/>
              <p>Vamos focar juntos?</p>
              <br/>
              <p className='text-xs hidden md:block'>O pomodoro ao lado está conectado ao meu <a href='https://github.com/eduardo-moro/fake-geek-magic-os'>relógio de mesa</a> baseado na esp8266.</p>
              <p className='text-xs block md:hidden'>O pomodoro acima está conectado ao meu <a href='https://github.com/eduardo-moro/fake-geek-magic-os'>relógio de mesa</a> baseado na esp8266.</p>
              <p className='text-xs'>A cada segundo, este relógio envia uma mensagem ao broker da <a href='https://www.emqx.com/en' target='_blank'>emqx</a> no endereço acima, esta página está conectada ao broker, não há servidor ou calculo sendo feito nesta página.</p>
              <p className='text-xs'>Ah, também tenho uma ring light conectada à uma esp32c3-mini, que me ajuda a manter o foco.</p>
              <br/>
              <p className='text-muted-foreground text-xs'>laranja: 25 minutos de foco</p>
              <p className='text-muted-foreground text-xs'>azul: 5 minutos de descanso</p>
              <p className='text-muted-foreground text-xs'>vermelho: 45 minutos de foco</p>
              <p className='text-muted-foreground text-xs'>verde: 15 minutos de descanso</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}