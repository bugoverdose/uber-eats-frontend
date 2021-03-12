/*
  디폴트 글씨체 적용 방법? 
  - tailwind.config.js에서 fontFamily 관련 클래스들 최대한 제거
  - tailwind.css에 *에 대해 설정하여 styles.css 마지막에 적용되도록.
    => 자동으로 모든 font-family 속성들 덮어쓰도록. 
*/
// tailwind.css
@tailwind base;
@tailwind components; 
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
@tailwind utilities;

// =========================================================
// tailwind.config.js
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

// =========================================================