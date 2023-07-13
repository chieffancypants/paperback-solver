'use client'

import { useEffect, useState } from 'react'

import { BackspaceIcon, CommandIcon, KeyboardIcon, ReturnIcon } from './icons'
import Button from './button'
import LoadingIndicator from './loading-indicator'
import Modal from './modal'
import Rack from './rack'
import { Wordlist } from './lib/wordlist'

export default function Home() {
    const [wordlist, setWordlist] = useState<string[]>([])
    const [showHelp, setShowHelp] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            let words: string[] = await Wordlist.loadWordlist()
            setWordlist(words)
        })()
    }, [])

    return (
        <main className="flex flex-col items-stretch justify-between p-4 sm:p-8 md:p-12 lg:p-24 text-paper-900">

            <LoadingIndicator visible={wordlist.length === 0} />
            <Modal visible={showHelp} setVisible={setShowHelp}>
                <div>
                    <span className="text-2xl mt-2 inline-block">To get started:</span>
                    <ul className="ml-6 list-decimal font-sans">
                        <li className="m-1">Type letters using your keyboard or if you&apos;re on mobile, click the keyboard button <KeyboardIcon /> which will launch your soft keyboard. </li>
                        <li className="m-1">You can enter up to 2 letters on a card (just like in the game)</li>
                        <li className="m-1">Use a question mark <span className="border py-[1px] px-[2px] border-paper-900/50">?</span> for wild cards</li>
                        <li className="m-1">Hit the return key <ReturnIcon /> to finish this card and create another card</li>
                        <li className="m-1">Hit the backspace key <BackspaceIcon /> to delete the last letter</li>
                        <li className="m-1">When complete, click the solve button</li>
                    </ul>
                </div>
            </Modal>

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

            <div onClick={() => setShowHelp(!showHelp)} className="fixed right-5 bottom-5">
                <Button className="px-3 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                </Button>
            </div>
        </main>
    )
}
