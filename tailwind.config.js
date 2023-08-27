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
            'white': "#FFFFFF"
        },
        fontFamily: {
            sans: ['Raleway', 'sans-serif']
        },
        extend: {
            dropShadow: {
                'md': '0 0 10px 0 #0000001A'
            }
        },
    },
    plugins: [],
}
