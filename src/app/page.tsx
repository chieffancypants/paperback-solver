'use client'

import { useEffect, useState } from 'react'

import { BackspaceIcon, CommandIcon, ReturnIcon } from './icons'
import LoadingIndicator from './loading-indicator'
import Rack from './rack'
import { Wordlist } from './lib/wordlist'

export default function Home () {
    const [wordlist, setWordlist] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            let words:string[] = await Wordlist.loadWordlist()
            setWordlist(words)
        })()
    }, [])

    return (
        <main className="flex flex-col items-stretch justify-between p-4 sm:p-8 md:p-12 lg:p-24 text-paper-900">
            <LoadingIndicator visible={ wordlist.length === 0 } />
            <Rack wordlist={Wordlist} />
            <ul className='mt-20 text-xl text-paper-900 m-auto'>
                <li>
                    <span className="opacity-70 w-12 inline-block text-right"><ReturnIcon /></span>
                    <span className="pl-4">to create a new card</span>
                </li>
                <li>
                    <span className="opacity-70 w-12 inline-block text-right"><BackspaceIcon /></span>
                    <span className="pl-4">to delete a letter or card</span>
                </li>
                <li>
                    <span className="opacity-70 w-12 inline-block text-right"><CommandIcon /><BackspaceIcon /></span>
                    <span className="pl-4">to delete all letters</span>
                </li>
                <li>
                    <span className="opacity-70 w-12 inline-block text-right"><CommandIcon /><ReturnIcon /></span>
                    <span className="pl-4">to solve</span>
                </li>
            </ul>

            <div className="max-w-4xl m-auto mt-8 flex gap-4">
                <div className="text-8xl">?</div>
                <div className="font-sans text-sm opacity-70">
                    <p>To get started, simply type letters using your keyboard (up to 2 per card, just like in the game), or if you&apos;re on mobile, click the keyboard button which will launch your soft keyboard. Use a <span className="border py-[1px] px-[2px] border-paper-900/50">?</span> for wild. Hit the return key to enter the card, and create a another one.  When the letters match your hand, click the solve button</p>
                </div>
            </div>
        </main>
    )
}
