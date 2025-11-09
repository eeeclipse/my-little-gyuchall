import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                autumn: {
                    50: '#fef6ee',
                    100: '#fdecd7',
                    200: '#fad4ae',
                    300: '#f7b67a',
                    400: '#f38d44',
                    500: '#f06d1f',
                    600: '#e15115',
                    700: '#bb3b13',
                    800: '#953017',
                    900: '#792916',
                },
                leaf: {
                    50: '#f5f8f0',
                    100: '#e8f0dd',
                    200: '#d1e2bd',
                    300: '#aecb93',
                    400: '#8ab46c',
                    500: '#689a4b',
                    600: '#507b3a',
                    700: '#3f5f2f',
                    800: '#344d28',
                    900: '#2c4124',
                },
            },
        },
     },
    plugins: [],
}

export default config