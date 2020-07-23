const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const child_process = require('child_process')

module.exports = {
    entry: {
        index: './src/index.ts',
        double_angle: './src/double-angle/double-angle.ts',
        slotted_hss: './src/slotted-hss/slotted-hss.ts',
        wt_plate: './src/wt-plate/wt-plate.ts',
        wf_truss: './src/wf-truss/wf-truss.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                }
            },
            {
                test: /\.md$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    preprocessor: (content, loaderContext) => {
                        let result = child_process.execFileSync(
                            'pandoc', ['-t', 'html', '--mathjax'], { input: content }
                        )
                        return result.toString()
                    }
                }
            },
            {
                test: /\.(css|woff2|svg|png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    context: 'src',
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(gltf|glb)$/,
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
            title: 'Slotted HSS connection',
            filename: 'slotted-hss/index.html',
            template: './src/app.ejs',
            chunks: ['slotted_hss']
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
