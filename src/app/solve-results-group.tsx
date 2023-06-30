import styles from './solve-results.module.css';

type SolveResultsGroup = {
    results: string[]
}
export default function SolveResultsGroup (props: SolveResultsGroup) {
    return (
        <div className="rounded-md bg-gray-700/25 mb-5">
            <div className={`${ styles.shadow } text-xl text-center p-2 rounded-md highlight-rim bg-gray-700`}>{props.results[0].length} characters:</div>
            <div className="grid grid-cols-4 gap-4 p-4">
                {
                    props.results.map(r => {
                        return <div key={r} className="text-center">{ r }</div>
                    })
                }
            </div>
        </div>
    )
}