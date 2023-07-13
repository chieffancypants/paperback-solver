/** @type {import('tailwindcss').Config} */

// When building for production (Github Pages), add the repo name as the base path
const basePath = process.env.NODE_ENV === 'production' ? '/paperback-solver' : ''

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                // 'linen': `url(${basePath}/bg.webp)`
                'linen': `url(${basePath}/bg.jpg)`
            },
            boxShadow: {
                'xl': '2px 4px 0px 1px rgb(74, 70, 70), 4px 7px 0px 1px rgb(74, 70, 70)',
                '2xl': '2px 4px 0px 1px rgb(74, 70, 70), 6px 9px 0px 1px rgb(74, 70, 70)',
            },
            colors: {
                'paper': {
                    100: '#F1E6D6',
                    500: '#DCD4AD',
                    700: '#A48A3A',
                    900: '#4A4646'
                },
                teal: '#21A3A8'
            }
        },
    },
    plugins: [],
}
