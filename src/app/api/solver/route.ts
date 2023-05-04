import { NextResponse } from 'next/server';

import findWords from '../../lib/find-words';
import wordlist from '../../lib/wordlist';

export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

export async function POST(request: Request) {
  const json = await request.json();
  const tiles = json.tiles;

  const matches = findWords(tiles, wordlist)
  return NextResponse.json({ matches })
}

