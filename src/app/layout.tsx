import './globals.css'

import { Special_Elite } from 'next/font/google'

const se = Special_Elite({ subsets:['latin'], weight: '400' })

export const metadata = {
    title: 'Paperback Solver',
    description: 'Provides best-case solutions for the card game Paperback',
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="bg-linen bg-paper-500">
            <body className={`${se.className}`}>{children}</body>
        </html>
    )
}
