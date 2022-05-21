module.exports = {
    lintOnSave: false,
    configureWebpack:{
      //这里我们可以剔除掉一些通用包,自己的包不打包这些类库,需要用户环境来提供
      externals: {
        vue: "vue",
        ElementUI: "element-ui"
      },
    }
  }