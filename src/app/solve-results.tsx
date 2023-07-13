import SolveResultsGroup from './solve-results-group'
import styles from './solve-results.module.css'

type ResultProps = {
    matches: string[]
    display: boolean
}

export default function Results (props:ResultProps) {
    const organized:Record<number, string[]> = {}
    let resultGroups

    // sort matches first by length (longer first), then alphabetically
    props.matches.sort((a, b) => {
        return b.length - a.length || a.localeCompare(b)
    }).forEach(match => {
        if (organized[match.length]) {
            organized[match.length].push(match)
        } else {
            organized[match.length] = [match]
        }
    })


    if (props.matches.length === 0 && props.display) {
        return <div className={`${ styles.shadow } text-xl text-center p-2 rounded-md bg-paper-900 text-paper-100`}>No Results found, or too few characters (3 minimum)</div>
    }

    return (
        <div className="flex flex-col gap-2">
            {
                Object.entries(organized)
                    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                    .map(group => {
                        return <SolveResultsGroup key={group[0]} results={group[1]}></SolveResultsGroup>
                    })
            }
        </div>
    )
}
