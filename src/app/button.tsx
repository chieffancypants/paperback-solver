import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}
export default function Button(props: ButtonProps) {
    const { className:classNames, ...otherProps } = props

    return (
        <div className="bg-paper-900 flex text-3xl text-[#4A4646] rounded-2xl transition-all relative ml-2 mt-2">
            <button className={`${classNames} ${styles.button} bg-paper-500 rounded-2xl py-2 px-8 border-[3px] border-[#4A4646]`} {...otherProps}>
                <div className="absolute flex left-[1px] top-[1px] w-4/6 h-2/3 text-paper-100"><ButtonSvg /></div>
                <div className="absolute flex right-[1px] bottom-[1px] w-4/6 h-3/4 text-paper-700 opacity-70 rotate-180"><ButtonSvg /></div>
                {props.children}
            </button>
        </div>
    )
}

function ButtonSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="100%" height="100%" viewBox="0 0 86 38" preserveAspectRatio='none'>
            <path fill="currentColor" d="M85 1.4c-7.6-2.5-67-1-77.7 0C-.3 2-.9 21 .8 37.2c2.7.4 1.7 1.2 1.4-4.4C.8 7.3 6.5 7.1 9.5 5.5c6.7-3.6 85-1 75.5-4.1Z" />
        </svg>
    )
}