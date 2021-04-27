module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.vue'],
  safelist: ['bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-pink-500', 'bg-red-500', 'bg-gray-500'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        logo: ["Roboto", "sans-serif"]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
