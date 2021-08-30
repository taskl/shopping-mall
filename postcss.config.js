module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //将iphone6屏幕作为标准屏
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};