const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.ts',
        double_angle: './src/collections/double-angle/double-angle.ts',
        wf_truss: './src/collections/wf-truss/wf-truss.ts',
    },
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
                test: /\.(svg)$/,
                loader: 'file-loader',
                options: {
                    context: 'src',
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /.(gltf|glb)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[contenthash].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    context: 'src/collections',
                    name: '[path][name].[ext]'
                }
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
            chunks: ['double_angle']
        }),
        new HtmlWebpackPlugin({
            title: 'Wide flange truss connection',
            filename: 'models/wf-truss-connection.html',
            template: './src/model-page.ejs',
            chunks: ['wf_truss']
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
