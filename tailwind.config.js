/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'ted-red': '#e62b1e', // For buttons, links, and highlights
                'ted-black': '#121212', // Primary background color
                'ted-dark-gray': '#1f1f1f', // Secondary background color for cards, sections, or overlays
                'ted-dark-gray2': '1e1e1e',
                'ted-light-gray': '#e0e0e0', // Text color for good contrast against the dark background
                'ted-off-white': '#f5f5f5', // For text or elements that need to stand out, like headings or important info
            },
            fontFamily: {
                ted: ['SofiaPro', 'sans-serif']
            },
            animation: {
                'spin-once': 'spin 500ms ease-in-out'
            }
        }
    },
    plugins: []
};
