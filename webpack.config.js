const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), 
    },
     plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo Webpack',
            template: './src/index.html',
        }),
    ],
    module: { 
        rules: [ 
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            }
        ],
    }
};

