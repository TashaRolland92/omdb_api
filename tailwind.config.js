/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
    colors: {
      'primary-color': '#04355d',
      'primary-content': '#67b7f8',
      'primary-light': '#06518e',
      'primary-dark': '#02192c',
      'secondary-color': '#3b045d',
      'secondary-content': '#c167f8',
      'secondary-light': '#5a068e',
      'secondary-dark': '#1c022c',
      'foreground-background--color': '#1d2730',
      'foreground-copy--color': '#fafbfc',
      'background-color': '#131a20',
      'background-copy-light--color': '#cfdae2',
      'border-color': '#304150',
      'border-copy-light--color': '#8fa8bc',
      'success-background--color': '#045d04',
      'success--color': '#67f867',
      'warning-background--color': '#5d5d04',
      'warning--color': '#f8f867',
      'danger-background--color': '#5d0404',
      'danger--color': '#f86767',
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      anton: ['Anton', 'sans-serif'],
    },
  },
  plugins: [],
}