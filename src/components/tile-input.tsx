import 'react-simple-keyboard/build/css/index.css'
import '../app/keyboard.css'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Keyboard from 'react-simple-keyboard'

import Rack from './rack'
import { Wordlist } from '../lib/wordlist'

const ignoreKeys = ['Shift', 'Control', 'Alt', 'Meta', 'Escape']

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

// const insertChar = (char:string, _tiles:string[], cursor:number) => {
//     const tiles = [..._tiles]
//     tiles.splice(cursor, 0, char)
//     return [tiles, cursor]
// }

// console.log(insertChar('W', ['A', 'B', 'C'], 1))

export default function TileInputKeyboard(props: TileInputProps) {
    const { tiles, setTiles, setDisplayResults, solver } = props
    const [cursor, setCursor] = useState<number>(tiles.length - 1)

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    })

    const clearRack = () => {
        setDisplayResults(false)
        setTiles([''])
        setCursor(0)
    }

    const onKeyPress = (e: KeyboardEvent) => {
        if (ignoreKeys.includes(e.key)) return
        e.preventDefault()

        switch (e.key) {
            case 'Backspace':
                setDisplayResults(false)
                if (e.metaKey) {
                    clearRack()
                } else if (tiles[cursor] === '') {
                    // don't delete the last tile
                    if (tiles.length === 1) return

                    // delete the tile at the cursor position:
                    setTiles(prev => prev.filter((_, i) => i !== cursor))

                    // setTiles(prev => prev.slice(0, -1))
                    setCursor(prev => prev - 1)
                } else {
                    // delete the last letter in the current tile
                    const t = [...tiles]
                    t[cursor] = t[cursor].slice(0, -1)
                    setTiles(t)
                }
                break
            case 'Enter':
                // if current tile is empty, they're probably trying to submit
                if (tiles[cursor] === '') {
                    const newTiles = tiles.filter((t) => t.length > 0)
                    if (newTiles.length === 0) newTiles.push('')

                    setTiles(newTiles)
                    setCursor(newTiles.length - 1)
                    return solver(tiles)
                }

                // move the cursor to the next tile if it's not the last tile
                if (cursor !== tiles.length - 1) {
                    return setCursor(prev => prev + 1)
                }
                // otherwise roll over to the tab case, which will create a new tile
            case 'Tab':
                // don't create an empty tile
                if (tiles[cursor] === '') return
                setTiles(prev => [...prev, ...['']])
                setCursor(tiles.length)
                break
            case 'ArrowLeft':
                if (cursor === 0) return
                setCursor(prev => prev - 1)
                break
            case 'ArrowRight':
                if (cursor === tiles.length - 1) return
                setCursor(prev => prev + 1)
                break
            case '?':
                // only allow one '?' on tile, so if they try to enter one on a tile that already has
                // a character in it, create a new tile with the ?
                if (tiles[cursor] !== '') {
                    setTiles(prev => [...prev, ...['?']])
                    setCursor(tiles.length)
                    return
                }
            default:
                if (!isTile(e.key.charCodeAt(0))) return
                if (tiles[cursor].length > 1) return

                // if the tile already has a ? in it, create a new tile with the newly attempted char
                if (tiles[cursor] === '?') {
                    setTiles(prev => [...prev, ...[e.key]])
                    setCursor(tiles.length)
                    return
                }

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
            case '{enter}':
                onKeyPress(new KeyboardEvent('keydown', { key: 'Enter' }))
                break
            default:
                onKeyPress(new KeyboardEvent('keydown', { key: button }))
        }
    }

    return (
        <div className="sm:rounded-lg mb-4 sm:m-4 shadow-lg">
            {/*  Rack Window */}
            <div className="p-1 sm:rounded-t-lg bg-paper-900/20 border border-paper-900/40 border-b-0">
                <div className="p-4 rounded-lg border-0 border-paper-900/50">
                    <Rack wordlist={Wordlist} tiles={tiles} cursor={cursor} setCursor={setCursor} clearRack={clearRack}/>
                </div>
            </div>
            <Keyboard
                onKeyPress={onSoftKeyPress}
                layout={{
                    default: [
                        'Q W E R T Y U I O P {bksp}',
                        'A S D F G H J K L {enter}',
                        'Z X C V B N M ?',
                    ]
                }}
                display={{
                    '{bksp}': 'delete ⌫',
                    '{enter}': 'next →',
                    '?': 'wild ?'
                }}
                buttonTheme={[{
                    class: 'specialBtn',
                    buttons: '{bksp} {enter} ?'
                }]} />
        </div>
    )

}
