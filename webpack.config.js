const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
        app: './src/app.ts'
    },
    devtool: 'inline-source-map',
    devServer: { contentBase: './dist' },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.gltf$/,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
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
        new HtmlWebpackPlugin({
            title: 'AISC Model Viewer',
            filename: 'index.html',
            template: './src/main-page.ejs',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'Double angle connection',
            filename: 'models/double-angle-connection.html',
            template: './src/model-page.ejs',
            chunks: ['app']
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
