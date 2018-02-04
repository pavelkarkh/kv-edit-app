const path = require('path');

module.exports = {
    
    entry: "./src/index",

    output: {

        path: path.resolve(__dirname, "public"),
        publicPath: "/js",
        filename: "app.js",

    },

    devServer: {
        
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 8080
        
    },
    
    devtool: "cheap-eval-source-map"
};