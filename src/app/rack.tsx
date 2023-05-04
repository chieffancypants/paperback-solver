'use client'

import {
  useEffect,
  useState,
} from 'react';

import Tile from './tile';

const ignoreKeys = ['Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Escape']


const isAlpha = (code:number) => {
    return (
        (code > 64 && code < 91) ||   // A-Z
        (code > 96 && code < 123) ||  // a-z
        (code === 63)                 // '?'
    )
}



type RackState = {
    tiles: string[],
    ghost: string[]
}

export default function Rack () {
    
    const [tiles, setTiles] = useState<string[]>([])
    const [ghostTile, setGhostTile] = useState<string>('')
    // const [state, setState] = useState<RackState>({tiles:[], ghost:[]})
    
    useEffect(() => {
        window.addEventListener('keyup', onKeyPress)
        return () => {
            window.removeEventListener('keyup', onKeyPress)
        }
    })
    
    let tileWIP = ''
    const onKeyPress = (e:KeyboardEvent) => {
        if (ignoreKeys.includes(e.key)) return
        
        if (e.key === 'Backspace') {
            if (ghostTile === '') {
                console.log('delete last tile')
            } else {
                setGhostTile(ghostTile.slice(0,-1))
                console.log(ghostTile)
            }
        } else if (e.key === 'Enter') {
            const newTiles = tiles.concat(ghostTile)
            setTiles(newTiles)
            setGhostTile('')
        } else if (isAlpha(e.key.charCodeAt(0))) {
            setGhostTile(ghostTile + e.key)
        }
    }



    return (
        <div className="container" id="Rack">
            <div className="container flex justify-center items-center">
                {
                    tiles.map((tile, i) => {
                        return <Tile key={i} chars={tile.toUpperCase()}></Tile>
                    })
                }
                <Tile chars={ghostTile} underline={true} selected={true}></Tile>
            </div>
            <div className="container flex justify-center p-10">
                <button className="rounded-lg text-xl p-4 px-10 bg-gray-300/20 shadow-xl border border-gray-500">
                    Clear 
                    {' '}<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="inline"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path><line x1="18" x2="12" y1="9" y2="15"></line><line x1="12" x2="18" y1="9" y2="15"></line></svg>
                </button>
            </div>
        </div>
        )

    }