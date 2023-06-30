/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                // 'textured': 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(/paper-texture.jpg)',
                // 'textured': 'radial-gradient(#00000000, #3a2501b0), url(/paper-texture.jpg)',
                // 'textured': 'radial-gradient(circle, rgba(255,171,0,0) 80%, rgb(50 29 0 / 51%) 100%), url(/paper-texture.jpg)'
                // 'textured': 'radial-gradient(circle, rgba(255,171,0,0) 20%, rgb(50 29 0 / 51%) 90%), linear-gradient(#ECF7FC66, #FEFEFE66), url(/paper-texture.jpg)'
                'textured': 'linear-gradient(#DCD4AD88, #DCD4AD88), url(/paper-texture.jpg)'
            },
            colors: {
                'paper': {
                    100: '#F1E6D6',
                    500: '#DCD4AD',
                    700: '#A48A3A',
                    900: '#222020'
                }
            }
        },
    },
    plugins: [],
}
