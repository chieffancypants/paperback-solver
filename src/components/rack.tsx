'use client'

import Tile from './tile/tile'

import type { Wordlist } from '../lib/wordlist'

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
    tiles: string[]
    cursor: number
    setCursor: (cursor: number) => void
}
export default function Rack (props:RackProps) {
    const { tiles, cursor } = props

    return (
        <div className="flex flex-col gap-5" id="Rack">
            <div className="flex -space-x-4 sm:-space-x-0 sm:gap-2 md:gap-4 justify-around sm:justify-center items-center">
                {
                    tiles.map((tile, i) => {
                        return <Tile key={i} chars={tile.toUpperCase()} selected={i === cursor} onClick={() => props.setCursor(i)}></Tile>
                    })
                }
            </div>
        </div>
    )
}
