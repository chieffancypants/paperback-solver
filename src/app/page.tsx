'use client';

import {
    useEffect,
    useState,
} from 'react';

import { Inter } from 'next/font/google';

import {
    BackspaceIcon,
    ReturnIcon,
} from './icons';
import { Wordlist } from './lib/wordlist';
import LoadingIndicator from './loading-indicator';
import Rack from './rack';

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
    const [wordlist, setWordlist] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            let words:string[] = await Wordlist.loadWordlist()
            setWordlist(words)
        })()
    }, [])

    return (
        <main className="flex flex-col items-stretch justify-between p-4 bg-gray-800 sm:p-8 md:p-12 lg:p-24">
            <LoadingIndicator visible={ wordlist.length === 0 } />
            <Rack wordlist={Wordlist} />
            <ul className='text-center text-gray-500 mt-20'>
                <li><ReturnIcon /> <span className="text-gray-600">to create a new tile</span></li>
                <li><BackspaceIcon /> <span className="text-gray-600">to delete a tile</span></li>
            </ul>
        </main>
    )
}
