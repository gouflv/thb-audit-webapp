module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue({ file }) {
        return file.indexOf("vant") !== -1 ? 16 : 16 * 2;
      },
      propList: ["*"],
    },
  },
};
