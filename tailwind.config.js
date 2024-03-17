/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        danger: '#db2c66',
        'dark-1': '#222b45',
        'dark-2': '#192038',
      },
    },
    animation: {
      'meteor-effect': 'meteor 4s linear infinite',
    },
    keyframes: {
      meteor: {
        '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
        '70%': { opacity: 1 },
        '100%': {
          transform: 'rotate(215deg) translateX(-600px)',
          opacity: 0,
        },
      },
    },
  },
};

