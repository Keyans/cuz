import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Main colors from Printify
        'primary': '#303018', // Dark olive green
        'secondary': '#afe468', // Light green
        'background': '#f5f5ee', // Off-white
        'accent': '#8ed9ec', // Light blue
        'brown': '#925d40', // Brown
        'purple': '#bc97e1', // Light purple
        'green': '#52ae7c', // Green
        'sand': '#d0c39d', // Sand/beige
        'gray': '#c1cdd1', // Light gray
      },
      fontFamily: {
        'ambit': ['Ambit', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
