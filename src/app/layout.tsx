import './globals.css'

import Script from 'next/script'
import { Special_Elite } from 'next/font/google'

import { GithubIcon, HeartIcon } from './icons'

const se = Special_Elite({ subsets: ['latin'], weight: '400' })

export const metadata = {
    title: 'Paperback Solver',
    description: 'Provides best-case solutions for the card game Paperback',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="bg-linen bg-paper-500">
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XSZ8VT2JER"></Script>
            <Script id="gtag">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XSZ8VT2JER');
            `}</Script>

            <body className={`${se.className}`}>
                {children}
                <footer className="text-center p-3 text-paper-900 font-sans">
                    <p className="py-2">Made with <HeartIcon /> for the board game community.</p>
                    <a className="no-underline" href="https://github.com/chieffancypants/paperback-solver"><GithubIcon /> Source Code Here</a>
                </footer>
            </body>

        </html>
    )
}
