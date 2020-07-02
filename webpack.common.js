const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.ts',
        double_angle: './src/double-angle/double-angle.ts',
        wt_plate: './src/wt-plate/wt-plate.ts',
        wf_truss: './src/wf-truss/wf-truss.ts',
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
                test: /\.(svg|png|jpe?g|html)$/,
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
            template: './src/index.ejs',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'Double angle connection',
            filename: 'double-angle/index.html',
            template: './src/app.ejs',
            chunks: ['double_angle']
        }),
        new HtmlWebpackPlugin({
            title: 'WT bolted connection',
            filename: 'wt-plate/index.html',
            template: './src/app.ejs',
            chunks: ['wt_plate']
        }),
        new HtmlWebpackPlugin({
            title: 'Wide flange truss connection',
            filename: 'wf-truss/index.html',
            template: './src/app.ejs',
            chunks: ['wf_truss']
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all'
        }
    }
}
