'use client'

import {
  useEffect,
  useState,
} from 'react';

import SolveResults from './solve-results';
import Tile from './tile';

const ignoreKeys = ['Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Escape']


const isAlpha = (code:number) => {
    return (
        (code > 64 && code < 91) ||   // A-Z
        (code > 96 && code < 123) ||  // a-z
        (code === 63)                 // '?'
    )
}

export default function Rack () {
    
    const [tiles, setTiles] = useState<string[]>(['C', 'A', '?', 'P', '?', 'T'])
    const [cursor, setCursor] = useState<number>(tiles.length - 1)
    const [solveResults, setSolveResults] = useState<string[]>([])
    
    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => {
            window.removeEventListener('keydown', onKeyPress)
        }
    })

    const solveTiles = async () => {
        const resp = await fetch('/api/solver', { method: 'POST', body: JSON.stringify({ tiles }) })
        const data:{matches: string[]} = await resp.json()

        // sort matches first by length (longer first), then alphabetically
        data.matches.sort((a, b) => {
            return b.length - a.length || a.localeCompare(b)
        })

        setSolveResults(data.matches)
    }
    
    const onKeyPress = (e:KeyboardEvent) => {
        if (ignoreKeys.includes(e.key)) return
        
        if (e.key === 'Backspace') {
            if (e.metaKey) {
                setTiles([''])
                setCursor(0)
                setSolveResults([])
                return
            }
            if (tiles[cursor] === '') {
                // delete the current empty tile and set the cursor back one
                setTiles(prev => prev.slice(0, -1))
                setCursor(prev => prev - 1)
                console.log('delete last tile')
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
        } else if (isAlpha(e.key.charCodeAt(0))) {
            if (tiles[cursor].length > 1) return

            const activeTile = tiles[cursor] + e.key
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


    return (
        <div className="container" id="Rack">
            <div className="container flex justify-center items-center">
                {
                    tiles.map((tile, i) => {
                        return <Tile key={i} chars={tile.toUpperCase()} selected={i === cursor}></Tile>
                    })
                }
                {/* <div className="flex items-center gap-1 text-sm">
                    <div>{backspaceIco()}</div>
                    <div className="text-xs font-light text-slate-500">Backspace<br/> to delete</div>
                </div> */}
            </div>

            <SolveResults matches={solveResults} />

            <div className="container flex justify-center p-10">
                <button 
                    onClick={solveTiles}
                    className="flex gap-2 rounded-lg text-xl p-4 px-10 bg-gray-300/20 shadow-xl border border-gray-500 hover:border-gray-400 text-slate-300">

                    <div className="flex items-center">
                        Solve&nbsp;&nbsp;<span className="flex text-slate-500">{commandIco()}{returnIco()}</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

function backspaceIco () {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path><line x1="18" x2="12" y1="9" y2="15"></line><line x1="12" x2="18" y1="9" y2="15"></line></svg>
}

function commandIco () {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path></svg>
}

function returnIco () {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
}