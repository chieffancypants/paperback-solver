'use client'

import { useEffect, useState } from 'react'

import Button from './button'
import { CommandIcon, ReturnIcon } from './icons'
import KeyboardButton from './keyboard-button'
import SolveResults from './solve-results'
import Tile from './tile'

import type { Wordlist } from './lib/wordlist'

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
    // const [tiles, setTiles] = useState<string[]>([''])
    const [tiles, setTiles] = useState<string[]>(['?'])
    const [cursor, setCursor] = useState<number>(tiles.length - 1)
    const [solveResults, setSolveResults] = useState<string[]>([])
    const [displayResults, setDisplayResults] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    })

    const solveTiles = async () => {
        const matches = await props.wordlist.findMatches(tiles)

        setSolveResults(matches)
        setDisplayResults(true)
    }

    const onKeyPress = (e:KeyboardEvent) => {
        if (ignoreKeys.includes(e.key)) return

        if (e.key === 'Backspace') {
            setDisplayResults(false)

            if (e.metaKey) {
                setTiles([''])
                setCursor(0)
                setSolveResults([])
            } else if (tiles[cursor] === '') {
                // don't delete the last tile
                if (tiles.length === 1) return

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
        // TODO: Show keyboard for particular tile
    }

    return (
        <div className="flex flex-col gap-5" id="Rack">
            <div className="flex -space-x-4 sm:-space-x-0 sm:gap-2 md:gap-4 justify-between sm:justify-center items-center" onClick={ showKeyboard }>
                {
                    tiles.map((tile, i) => {
                        return <Tile key={i} chars={tile.toUpperCase()} selected={i === cursor}></Tile>
                    })
                }
            </div>


            <div className="flex justify-center gap-2">
                <KeyboardButton />
                <Button onClick={solveTiles} className="flex items-center h-16">
                    <span className="flex-grow pr-3 mt-[6px]">Solve</span>
                    <span className="flex text-paper-900 opacity-60"><CommandIcon /><ReturnIcon /></span>
                </Button>
            </div>

            <SolveResults matches={solveResults} display={displayResults} />
        </div>
    )
}
