import 'react-simple-keyboard/build/css/index.css'
import '../app/keyboard.css'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Keyboard from 'react-simple-keyboard'

import Rack from './rack'
import { Wordlist } from '../lib/wordlist'

const ignoreKeys = ['Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Escape']

const isTile = (code: number) => {
    return (
        (code > 64 && code < 91) ||   // A-Z
        (code > 96 && code < 123) ||  // a-z
        (code === 63)                 // '?'
    )
}

interface TileInputProps {
    tiles: string[]
    setTiles: Dispatch<SetStateAction<string[]>>
    setDisplayResults: (display: boolean) => void
    solver: (tiles: string[]) => void
}

export default function TileInputKeyboard(props: TileInputProps) {
    const { tiles, setTiles, setDisplayResults, solver } = props
    const [cursor, setCursor] = useState<number>(tiles.length - 1)

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    })

    const onKeyPress = (e: KeyboardEvent) => {
        if (ignoreKeys.includes(e.key)) return
        e.preventDefault()

        switch (e.key) {
            case 'Backspace':
                setDisplayResults(false)
                if (e.metaKey) {
                    setTiles([''])
                    setCursor(0)
                    // setDisplayResults(false)
                    // setSolveResults([])
                } else if (tiles[cursor] === '') {
                    // don't delete the last tile
                    if (tiles.length === 1) return

                    // delete the current empty tile and set the cursor back one
                    setTiles(prev => prev.slice(0, -1))
                    setCursor(prev => prev - 1)
                } else {
                    // delete the last letter in the current tile
                    const t = [...tiles]
                    t[cursor] = t[cursor].slice(0, -1)
                    setTiles(t)
                }
                break
            case 'Enter':
                // remove empty tiles and update cursor
                const newTiles = tiles.filter((t) => t.length > 0)
                setTiles(newTiles)
                setCursor(newTiles.length - 1)
                return solver(tiles)
            case 'Tab':
                // don't create an empty tile
                if (tiles[cursor] === '') return

                setTiles(prev => [...prev, ...['']])
                setCursor(tiles.length)
                break
            default:
                if (!isTile(e.key.charCodeAt(0))) return
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

    const onSoftKeyPress = (button: string, e?: MouseEvent) => {
        switch (button) {
            case '{bksp}':
                onKeyPress(new KeyboardEvent('keydown', { key: 'Backspace' }))
                break
            case '{tab}':
                onKeyPress(new KeyboardEvent('keydown', { key: 'Tab' }))
                break
            default:
                onKeyPress(new KeyboardEvent('keydown', { key: button }))
        }
    }

    return (
        <div className="sm:rounded-lg mb-4 sm:m-4 shadow-lg">
            {/*  Rack Window */}
            <div className="p-1 sm:rounded-t-lg bg-paper-900/60 border-b-0">
                <div className="p-4 rounded-lg bg-linen border border-paper-900/50">
                    <Rack wordlist={Wordlist} tiles={tiles} cursor={cursor} />
                </div>
            </div>
            <Keyboard
                onKeyPress={onSoftKeyPress}
                layout={{
                    default: [
                        'Q W E R T Y U I O P {bksp}',
                        'A S D F G H J K L {tab}',
                        'Z X C V B N M ?',
                    ]
                }}
                display={{
                    '{bksp}': 'delete ⌫',
                    '{tab}': 'next →',
                    '?': 'wild ?'
                }}
                buttonTheme={[{
                    class: 'specialBtn',
                    buttons: '{bksp} {tab} ?'
                }]} />
        </div>
    )

}
