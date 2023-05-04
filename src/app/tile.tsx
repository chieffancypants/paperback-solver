
type TileProps = {
    chars: string
    underline?: boolean
    selected?: boolean
}

export default function Tile (props:TileProps) {

    let underline = props.selected ? 'bg-cyan-100' : 'bg-none'
    let border = props.selected ? 'border-cyan-500' : 'border-gray-400'
    let color = props.selected ? 'text-cyan-100' : ' text-gray-200'

    return (
        <div className={`tile w-24 h-24 m-4 bg-gradient-to-b from-gray-700 to-gray-600/50 rounded-lg flex flex-col items-center justify-center font-bold text-4xl shadow-xl ${color} border-4 ${border}`}>
            <div className="w-full h-full p-2 pt-3">
                <div className="w-full h-full flex items-center justify-center uppercase">{props.chars}</div>
                <div className={`animate-pulse m-auto h-1 mb-2 ${underline}`}></div>
            </div>
        </div>
    )
}
