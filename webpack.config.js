

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
      module: {
        rules: [{
        
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets:[
                    ["@babel/preset-env",{
                        useBuiltIns: "usage",
                        corejs: 3
                    }]
                ],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    }]
  }
  
};
