import SolveResultsGroup from './solve-results-group';

type ResultProps = {
    matches: string[]
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

    return (
        <div className="flex flex-col gap-2">
            {
                Object.entries(organized)
                    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                    .map(group => {
                        return <SolveResultsGroup key={group[0]} results={group[1]}></SolveResultsGroup>
                    })
                // props.matches.map(match => <div key={match}>{match}</div>)
            }
        </div>
    )
}