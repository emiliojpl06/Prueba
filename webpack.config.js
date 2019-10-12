const path = require('path');

module.exports = {
    entry: {
        login: './src/login.js',
        registrarse: './src/registrarse.js',
        index: './src/index.js'

      },
      output: {
        path: __dirname+'/public/app',
        publicPath: '/app/',
        filename: '[name].js'
      },
};
