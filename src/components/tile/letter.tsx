import styles from './letter.module.css'

interface LetterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    selected?: boolean
}
export default function Letter (props: LetterProps) {
    // stupid font is stupid and positioned too high relative to other fonts:
    const defaultClasses = 'mt-2 sm:mt-4 text-center text-5xl md:text-6xl'

    let { className = '', selected = false } = props
    className = className.split(' ').concat(defaultClasses.split(' ')).join(' ')

    return (
        <div className={`
            ${ selected ? styles.selected : styles.shadow }
            ${className}
        `}>{props.children}</div>
    )
}
