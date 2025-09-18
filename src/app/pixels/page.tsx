import { supabase } from '@/lib/supabase-client';
import PixelDisplay from '@/components/personal/pixel-display';

export default async function Pixels() {
  const { data: pixels } = await supabase.from("pixels").select();

  return (
    <div className='m-12 max-w-[800px] w-full font-sans'>
      <h1 className="text-3xl font-bold mb-6">Pixel Art Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pixels?.map((pixel: any) => (
          <PixelDisplay
            key={pixel.id}
            image={pixel.image}
            author={pixel.author}
            created_at={pixel.created_at}
          />
        ))}
      </div>
    </div>
  );
}