import {
    useEffect,
    useRef,
} from 'react';

import {
    ChevronUpIcon,
    KeyboardIcon,
} from './icons';

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
            <button 
                onClick={ showKeyboard }
                className="rounded-lg text-xl p-4 px-5 bg-gray-300/20 shadow-xl border border-gray-500 hover:border-gray-400 text-slate-300">
                <KeyboardIcon size={32} />
                <ChevronUpIcon size={32} />
            </button>
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