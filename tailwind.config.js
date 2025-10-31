/** Dummy config for ShadCN until official Tailwind v4 support */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        xlmid: { max: '1300px' } // custom breakpoint
      }
    }
  },

  plugins: []
};
