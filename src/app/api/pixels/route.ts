
import { supabase } from '@/lib/supabase-client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { author, image } = await request.json();

  if (!image) {
    return new NextResponse('Image is required', { status: 400 });
  }

  const { data, error } = await supabase
    .from('pixels')
    .insert([{ author, image }])
    .select();

  if (error) {
    console.error('Error inserting pixel art:', error);
    return new NextResponse('Error inserting pixel art', { status: 500 });
  }

  return NextResponse.json(data);
}
