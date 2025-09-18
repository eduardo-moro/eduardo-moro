"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import mqtt, { MqttClient } from 'mqtt';

interface MqttContextType {
  client: MqttClient | null;
  connectionStatus: 'connecting' | 'connected' | 'error' | 'offline';
}

const MqttContext = createContext<MqttContextType | undefined>(undefined);

interface MqttProviderProps {
  children: ReactNode;
  brokerUrl: string;
}

export const MqttProvider = ({ children, brokerUrl }: MqttProviderProps) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error' | 'offline'>('offline');

  useEffect(() => {
    setConnectionStatus('connecting');
    const mqttClient = mqtt.connect(brokerUrl);
    setClient(mqttClient);

    mqttClient.on('connect', () => {
      setConnectionStatus('connected');
      console.log('Shared MQTT client connected');
    });

    mqttClient.on('error', (err) => {
      setConnectionStatus('error');
      console.error('Shared MQTT client connection error:', err);
    });

    mqttClient.on('close', () => {
      setConnectionStatus('offline');
      console.log('Shared MQTT client disconnected');
    });
    
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [brokerUrl]);

  return (
    <MqttContext.Provider value={{ client, connectionStatus }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => {
  const context = useContext(MqttContext);
  if (context === undefined) {
    throw new Error('useMqtt must be used within an MqttProvider');
  }
  return context;
};
