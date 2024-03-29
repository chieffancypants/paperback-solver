'use client'

import { useEffect, useRef, useState } from 'react'

import { BackspaceIcon, CommandIcon, InfoIcon, ReturnIcon } from './icons'
import Button from '../components/button/button'
import LoadingIndicator from '../components/loading-indicator'
import Modal from '../components/modal'
import SolveResults from '../components/solve-results'
import TileInputKeyboard from '../components/tile-input'
import { Wordlist } from '../lib/wordlist'

export default function Home() {
    const [wordlist, setWordlist] = useState<string[]>([])
    const [showHelp, setShowHelp] = useState<boolean>(false)
    const [tiles, setTiles] = useState<string[]>(['P', 'A', 'P', 'ER', 'B', 'A', 'CK', ''])
    const [solveResults, setSolveResults] = useState<string[]>([])
    const [displayResults, setDisplayResults] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        (async () => {
            let words: string[] = await Wordlist.loadWordlist()
            setWordlist(words)
        })()
    }, [])

    const solveTiles = async () => {
        const matches = await Wordlist.findMatches(tiles)
        setSolveResults(matches)
        setDisplayResults(true)
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <main className="flex flex-col items-stretch justify-between sm:p-1 lg:p-10 text-paper-900 gap-5">

            <LoadingIndicator visible={wordlist.length === 0} />
            <TileInputKeyboard tiles={tiles} setTiles={setTiles} setDisplayResults={setDisplayResults} solver={solveTiles} />

            <div className="flex justify-center gap-2">
                <Button onClick={solveTiles} className="flex items-center h-16">
                    <span className="flex-grow pr-3 mt-[6px]">Solve</span>
                    <span className="flex text-paper-900 opacity-60"><CommandIcon /><ReturnIcon /></span>
                </Button>
            </div>

            <SolveResults ref={ref} matches={solveResults} display={displayResults} />

            <div className="w-3/4 m-auto text-center sm:hidden font-sans font-bold italic"><InfoIcon /> Hint: Rotate your device for easier viewing.</div>

            <div className="flex items-center gap-2 mt-4 m-auto">
                <Button onClick={() => setShowHelp(!showHelp)} className="px-2 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                </Button>
                <div className="font-sans">Help me! I don&apos;t know how to use this!</div>
            </div>

            {
                showHelp ?
                    <Modal visible={showHelp} setVisible={setShowHelp}>
                        <div>
                            <span className="text-3xl m-2 inline-block">Getting Started</span>
                            <div className="flex flex-col">
                                <p className="font-sans mt-5 mb-2">Let&apos;s assume you have the following starting hand (N T ? L S):</p>
                                {/* eslint-disable-next-line */}
                                <img className="rounded-lg" src="starting-hand.jpg"/>
                                {/* <div className="flex mt-5 mb-10 gap-1">
                                    <Tile chars='N' />
                                    <Tile chars='T' />
                                    <Tile chars='?' />
                                    <Tile chars='L' />
                                    <Tile chars='S' />
                                </div> */}
                                <p className="font-sans mt-10 mb-2">Play the video below to see how to go about solving this hand:</p>

                            </div>
                            <video poster="poster.jpg" src="starting-hand.mp4" controls className="w-full border border-paper-900 rounded-md mb-10" />

                            <p className="font-sans mt-10 mb-2 font-bold">Step by step directions for solving a hand:</p>
                            <ul className="ml-6 list-decimal font-sans">
                                <li className="m-1">Type the letters from your card using your keyboard or if you&apos;re on mobile, tap the keys on the onscreen keyboard</li>
                                <li className="m-1">You can enter up to 2 letters on a card (just like in the game)</li>
                                <li className="m-1">Use a question mark <span className="border py-[1px] px-[2px] border-paper-900/50">?</span> for wild (fame) cards</li>
                                <li className="m-1">Tap next or use the enter key to create another card</li>
                                <li className="m-1">Hit the backspace key <BackspaceIcon /> to delete the last letter or card</li>
                                <li className="m-1">When complete, scroll down and tap the solve button, or hit the enter key twice</li>
                            </ul>
                        </div>
                    </Modal>
                    : ''
            }


        </main>
    )
}
