export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#02060F', navy: '#041A33', deep: '#071E3A', hull: '#EEF3FA', mist: '#93A6C2',
        flame: '#4B0082', 'flame-hover': '#6A1FB0', ember: '#C9A0F5', print: '#8ED8FF'
      },
      fontFamily: {
        display: ['Unbounded', 'Figtree', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      maxWidth: { prose: '62ch' },
      zIndex: { 1: '1' },
      keyframes: {
        'star-movement-bottom': { '0%': { transform: 'translate(0%, 0%)', opacity: '1' }, '100%': { transform: 'translate(-100%, 0%)', opacity: '0' } },
        'star-movement-top': { '0%': { transform: 'translate(0%, 0%)', opacity: '1' }, '100%': { transform: 'translate(100%, 0%)', opacity: '0' } }
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate'
      }
    }
  },
  plugins: []
};
