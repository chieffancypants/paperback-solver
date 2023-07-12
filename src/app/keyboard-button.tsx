import { useEffect, useRef } from 'react'

import Button from './button'
import { ChevronUpIcon, KeyboardIcon } from './icons'

export default function KeyboardButton () {
    const inputRef = useRef<HTMLInputElement>(null)

    const showKeyboard = () => {
        const i = inputRef.current?.focus()
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.display = 'inline'
        }
    })

    return (
        <div>
            <Button
                onClick={ showKeyboard }
                className="h-16 px-4">
                <KeyboardIcon size={32} />
                <ChevronUpIcon size={32} />
            </Button>
            <input
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                className="absolute -top-10 left-0 hidden"
                enterKeyHint="next"
                inputMode="text"
                id="input-keyboard"
                ref={inputRef}
                spellCheck="false"
                type="text">
            </input>
        </div>
    )
}
