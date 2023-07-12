import { SpinnerIcon } from './icons';

type LoadingIndicatorProps = {
    visible: boolean
}
export default function LoadingIndicator (props:LoadingIndicatorProps) {
    return (
        <div className={`flex items-center bg-paper-900 p-4 mb-5 absolute rounded-lg ${ props.visible ? 'visible' : 'hidden' }`}>
            <SpinnerIcon />
            <div className="text-gray-500 pl-4">loading wordlist...</div>
        </div>
    )
}