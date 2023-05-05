type SolveResultsGroup = {
    results: string[]
}

export default function SolveResultsGroup (props: SolveResultsGroup) {
    return (
        <div className="rounded-md bg-gray-800">
            <div className="text-xl text-center p-2 my-5 rounded-md shadow-xl border border-gray-600 bg-gray-700">{props.results[0].length} characters:</div>
            <div className="grid grid-cols-4 gap-4">
                {
                    props.results.map(r => {
                        return <div key={r} className="text-center">{ r }</div>
                    }) 
                }
            </div>
        </div>
    )
}