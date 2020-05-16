module.exports = {
  lintOnSave: false,
  // publicPath: "/ar-meet/",
  devServer: {
    https: true,
    proxy: {
      '/api': {
        target:'http://192.168.18.252:9090/api',
        changeOrigin:true,
        pathRewrite: {
          '^/api':'/'
        }
      }
    }
  }
};
