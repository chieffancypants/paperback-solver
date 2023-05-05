'use client'

import {
    useEffect,
    useState,
} from 'react';

import {
    CommandIcon,
    ReturnIcon,
} from './icons';
import KeyboardButton from './keyboard-button';
import type { Wordlist } from './lib/wordlist';
import SolveResults from './solve-results';
import Tile from './tile';

const ignoreKeys = ['Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Escape']

const isTile = (code:number) => {
    return (
        (code > 64 && code < 91) ||   // A-Z
        (code > 96 && code < 123) ||  // a-z
        (code === 63)                 // '?'
    )
}

type RackProps = {
    wordlist: Wordlist
}
export default function Rack (props:RackProps) {
    const [tiles, setTiles] = useState<string[]>([''])
    const [cursor, setCursor] = useState<number>(tiles.length - 1)
    const [solveResults, setSolveResults] = useState<string[]>([])
    const [displayResults, setDisplayResults] = useState<boolean>(false)    

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    })

    const solveTiles = async () => {
        const matches = await props.wordlist.findMatches(tiles)
        // const resp = await fetch('/api/solver', { method: 'POST', body: JSON.stringify({ tiles }) })
        // const data:{matches: string[]} = await resp.json()

        // // sort matches first by length (longer first), then alphabetically
        // data.matches.sort((a, b) => {
        //     return b.length - a.length || a.localeCompare(b)
        // })

        setSolveResults(matches)
        setDisplayResults(true)
    }
    
    const onKeyPress = (e:KeyboardEvent) => {
        if (ignoreKeys.includes(e.key)) return
        
        if (e.key === 'Backspace') {
            if (tiles.length === 0) return

            setDisplayResults(false)

            if (e.metaKey) {
                setTiles([''])
                setCursor(0)
                setSolveResults([])
            } else if (tiles[cursor] === '') {
                // delete the current empty tile and set the cursor back one
                setTiles(prev => prev.slice(0, -1))
                setCursor(prev => prev - 1)
            } else {
                // delete the last letter in the current tile
                const t = [ ...tiles ]
                t[cursor] = t[cursor].slice(0, -1)
                setTiles(t)
            }
        } else if (e.key === 'Enter') {
            if (e.metaKey) {
                // remove empty tiles and update cursor
                const newTiles = tiles.filter((t) => t.length > 0)
                setTiles(newTiles)
                setCursor(newTiles.length - 1)

                // submit to solve API
                return solveTiles()
            }

            // don't create an empty tile
            if (tiles[cursor] === '') return

            setTiles(prev => [ ...prev, ...[''] ])
            setCursor(tiles.length)
        } else if (isTile(e.key.charCodeAt(0))) {
            if (tiles[cursor].length > 1) return

            setDisplayResults(false)
            setTiles(prev => {
                return prev.map((tile, i) => { 
                    if (i === cursor) {
                        return tile + e.key
                    }
                    return tile
                })
            })
        }
    }

    const showKeyboard = () => {
        // TODO: Show keyboard
    }

    return (
        <div className="flex flex-col gap-5" id="Rack">
            <div className="flex justify-center items-center gap-2 md:gap-4" onClick={ showKeyboard }>
                {
                    tiles.map((tile, i) => {
                        return <Tile key={i} chars={tile.toUpperCase()} selected={i === cursor}></Tile>
                    })
                }
            </div>


            <div className="flex justify-center gap-2">
                <KeyboardButton />
                <button
                    onClick={solveTiles}
                    className="rounded-lg text-xl p-4 px-6 bg-gray-300/20 shadow-xl border border-gray-500 hover:border-gray-400 text-slate-300">
                    <div className="flex items-center">
                        Solve&nbsp;&nbsp;<span className="flex text-slate-500"><CommandIcon /><ReturnIcon /></span>
                    </div>
                </button>
            </div>

            <SolveResults matches={solveResults} display={displayResults} />
        </div>
    )
}

