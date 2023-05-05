'use client'

export default function Error({ error, reset }) {
    return (
        <>
            An error occured: {error.message}
        </>
    )
}