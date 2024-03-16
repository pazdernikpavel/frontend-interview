/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'danger-600': '#db2c66',
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

