/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      clear: "rgba(0, 0, 0, 0)",
      darkClear: "rgba(0, 0, 0, 0.4)",
      dark: {
        "100": "#17202A",
        "200": "#1C2733",
        "300": "#283340",
        "400": "#3A444C",
        "500": "#5B7083",
        "600": "#8899A6",
        "650": "#CFD9DE",
        "700": "#EBEEF0",
        "800": "#F7F9F9",
      },
      greyTxt: "#536471",
      white: "#FFFFFF",
      black: "#0F1419",
      blackHov: "#0f14191a",
      greyBorder: "#d2dbe0",
      blue: "#1DA1F2",
      blueClear: "rgba(29, 155, 240, 0.1)",
      avatarHover: "rgba(231, 233, 234, 0.1)",
      searchbar: "#EFF3F4",
      likesHover: "rgba(249, 24, 128, 0.1)",
      likesLineHover: "rgb(249, 24, 128)",
      retweetHover: "rgba(0, 186, 124, 0.1)",
      retweetLineHover: "rgb(0, 186, 124)",
      blueHover: "rgba(29, 155, 240, 0.1)",
      blueLineHover: "rgb(29, 155, 240)",
      time: "#8B98A5",
      imgBg: "rgba(15, 20, 25, 0.75)",
      imgHov: "rgba(39, 44, 48, 0.75)",
    },
    extend: {
      boxShadow: {
        'reg': 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
      }
    },
    screens: {
      'med': {'max': '1200px'},
      'maxRmenu': {'max': '1040px'},
    }
  },
  plugins: [],
};
