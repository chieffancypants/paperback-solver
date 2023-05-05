'use client';

import { Inter } from 'next/font/google';

import {
  BackspaceIcon,
  ReturnIcon,
} from './icons';
import Rack from './rack';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  return (
    <main className="flex flex-col items-stretch justify-between p-4 bg-gray-800 sm:p-8 md:p-12 lg:p-24">
      <Rack />

        <ul className='text-center text-gray-500 mt-20'>
          <li><ReturnIcon /> to create a new tile</li>
          <li><BackspaceIcon /> to delete a tile </li>
        </ul>
    </main>
  )
}
