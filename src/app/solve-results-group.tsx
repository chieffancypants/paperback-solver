import styles from './solve-results.module.css'

type SolveResultsGroup = {
    results: string[]
}
export default function SolveResultsGroup (props: SolveResultsGroup) {
    return (
        <div className="rounded-md bg-paper-900/75 m-5 border-2 shadow-xl border-paper-900">
            <div className={`${ styles.shadow } text-3xl text-center p-2 rounded-md bg-paper-500 text-paper-900 border-b-paper-900 border-r-paper-900 border`}>{props.results[0].length} characters:</div>
            <div className="grid grid-cols-4 gap-4 p-4">
                {
                    props.results.map(result => {
                        return <div key={ result } className="text-center text-paper-100 text-xl font-thin">{ result }</div>
                    })
                }
            </div>
        </div>
    )
}
