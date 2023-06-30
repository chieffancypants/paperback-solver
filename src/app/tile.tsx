import styles from './tile.module.css';

type TileProps = {
    chars: string
    selected?: boolean
}
export default function Tile ({ chars, selected }:TileProps) {

    return (
        <div className={`
            ${ styles.shadow }
            ${ selected ? styles.selected : '' }
            ${ selected ? 'text-teal-700' : 'text-paper-900' }
            animate-entrance w-24 h-28 rounded-2xl
            flex flex-col items-center justify-center font-bold text-6xl border border-black
        `}>
            <div className="w-full h-full p-3 pt-8">
                <div className="w-full h-full flex items-center justify-center uppercase">{chars}</div>
                <div className={`underline-blink m-auto h-1 rounded-full ${ selected ? 'bg-teal-700' : 'bg-none' }`}></div>
            </div>
        </div>
    )
}
