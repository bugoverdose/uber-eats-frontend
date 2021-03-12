const colors = require("tailwindcss/colors");

module.exports = {
  corePlugins: {
    fontFamily: false, // deactivation : 글씨체 관련 디폴트 적용 완전 제외.
  },
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
