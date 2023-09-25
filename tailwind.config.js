/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            'orange': '#DE8667',
            'alt-orange': '#EFB467',
            'dark': '#322D38',
            'white': '#FFFFFF',
            'light-gray': '#e7e7e7',
            'lighter-gray': '#f6f6f6'
        },
        fontFamily: {
            sans: ['Raleway', 'sans-serif']
        },
        extend: {
            screens: {
                'lg': '990px',
            },
            dropShadow: {
                'sm': '0 0 5px #00000008',
                'sm-ext': '0 0 10px #00000008',
                'md': '0 0 10px #00000018'
            },
            boxShadow: {
                'md': '0px 0px 8px 0px rgba(0, 0, 0, 0.15)',
                'navbar': '0px 0px 8px 0px rgba(0, 0, 0, 0.15)',
                'lightener': 'inset 0 0 100px 100px rgba(255, 255, 255, 0.1)',
                'darkener': 'inset 0 0 100px 100px rgba(0, 0, 0, 0.025)'
            },
            borderRadius: {
                'card': '16px'
            }
        },
    },
    plugins: [],
}
