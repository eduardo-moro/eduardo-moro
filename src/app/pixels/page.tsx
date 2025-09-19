'use client';

import { useEffect, useState } from 'react';
import PixelDisplay from '@/components/personal/pixel-display';
import { supabase } from '@/lib/supabase-client';

interface Pixel {
  id: string;
  image: string;
  author: string;
  created_at: string;
}

export default function Pixels() {
  const [pixels, setPixels] = useState<Pixel[]>([]);

  useEffect(() => {
    const fetchPixels = async () => {
      const { data, error } = await supabase.from('pixels').select('*');
      if (data) {
        setPixels(data);
      }
      if (error) {
        console.error('Error fetching pixels:', error);
      }
    };

    fetchPixels();

    const channel = supabase
      .channel('realtime pixels')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pixels' },
        (payload) => {
          console.log('Change received!', payload);
          fetchPixels();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Pixels</h1>
      {pixels.map(pixel => {
        return <PixelDisplay key={pixel.id} image={pixel.image} author={pixel.author} created_at={pixel.created_at} />
      })}
    </div>
  );
}