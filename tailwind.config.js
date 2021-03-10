// tailwind.config.js
module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ['./public/index.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'silence-image': "url('https://i.pinimg.com/originals/72/39/ea/7239ea3bb245c4877a56737e572cdfcd.png')"
        
      }),
      boxShadow: {
        'offset-black': '4px 6px black',
        // 'offset-white':'4px 6px white'
      },
      colors:{
        'kinda-green':'#52F58C'
      },
      width:{
        '1/7': '14.2857143%',
      },
      
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}