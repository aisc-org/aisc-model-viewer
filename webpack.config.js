const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: { contentBase: './dist' },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.gltf$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        plugins: [PnpWebpackPlugin],
        extensions: ['.ts', '.js']
    },
    resolveLoader: {
        plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ title: "Combining yarn, webpack, and three.js" })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
