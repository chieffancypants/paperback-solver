import styles from './tile.module.css';

type TileProps = {
    chars: string
    selected?: boolean
}
export default function Tile({ chars, selected }: TileProps) {
    return (
        <div className={`
            ${styles.shadow}
            ${selected ? styles.selected : ''}
            ${selected ? 'text-teal border-teal' : 'text-paper-900 border-paper-900'}
            ${selected ? 'border-[5px]' : 'border-[2px]'}
            animate-entrance w-24 h-24 rounded-2xl
            flex flex-col items-center justify-center relative font-bold text-6xl
            bg-[#DCD4AD] border-paper-900
        `}>
            <div className="w-full h-full p-3 pt-8">
                <div className="w-full h-full flex items-center justify-center uppercase">{chars}</div>
                <div className={`${styles.underlineBlink} m-auto h-1 rounded-full ${ selected ? 'bg-teal' : 'bg-none' }`}></div>
            </div>
            <div className={`absolute top-0 left-[2px] w-full ${ selected ? 'opacity-50' : '' }`}><TileSVG /></div>
        </div>
    )
}


function TileSVG() {
    return (
        <svg width="89" height="92" viewBox="0 0 87 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M67.212 2.27176C59.6207 -0.25868 18.2192 1.21741 7.5 2.27176C-0.0913038 2.8875 -0.721816 31.8281 1.03543 48.0897C3.6713 48.4412 2.63833 46.2373 2.35338 40.7093C1.03543 15.1413 3.80983 12.7717 7.50005 7.5C11.1903 2.22826 76.7012 5.4348 67.212 2.27176Z" fill="#F1E6D6" />
            <path d="M17.2064 87.4646C25.6412 88.7825 74.1624 90.6902 79.5 87C80.3536 86.4098 85.5675 80.1357 86 77C86.8726 70.6739 86.5461 32.669 86.5461 18.4971C83.9102 18.1457 84.3715 39.5279 84.3715 45.0632C84.3715 53.3148 84.1902 76.6575 80.5 81.9292C76.8098 87.201 7.32387 85.9204 17.2064 87.4646Z" fill="#A48A3A" fillOpacity="0.69" />
        </svg>
    )
}