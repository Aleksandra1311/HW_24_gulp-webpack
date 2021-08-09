const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js', // точка входа, начальный файл
    output: {
        filename: 'bundle.js', // то куда положить файл
        path: path.resolve(__dirname, 'dist'), // путь куда положить
    },
     plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo Webpack',
            template: './src/index.html',
        }),
    ],
    module: { // сюда подключаются разные loaders
        rules: [ // правила по которым подключ loader
            {
                test: /\.css$/, //это определённая маска для подкл css файл заканчивается на css
                use: ['style-loader', 'css-loader'], //писать в обратном порядке (css-loader умеет читать css файлы)(style-loader он умеет записывать их инлайново)
            }
        ],
    }
};

