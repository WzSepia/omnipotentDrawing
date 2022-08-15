const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    open:false,
    // host:'localhost',
    // port:8080,
    hot:true,
    https:false,
    proxy:{

    },
  },
  transpileDependencies: true,
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "./src/components/css/variables.scss";`,
  //     },
  //   },
  // },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: "./src/components/css/variables.scss",
        })
        .end();
    });
  },
});
