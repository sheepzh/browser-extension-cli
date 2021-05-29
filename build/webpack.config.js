const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        index: './src/index'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', 'bin')
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', include: 'index.js', raw: true })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
    }
}