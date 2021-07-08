const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const child_process = require('child_process')

module.exports = {
    entry: {
        index: './src/index.ts',
        docs: './src/docs/docs.ts',
        guide_to_2d_drawings: './src/guide-to-2d-drawings/guide.ts',
        // Tension members
        double_angle: './src/double-angle/double-angle.ts',
        slotted_hss: './src/slotted-hss/slotted-hss.ts',
        wt_plate: './src/wt-plate/wt-plate.ts',
        wf_truss: './src/wf-truss/wf-truss.ts',
        // Buckling members
        buckling_wf_columns: './src/buckling-wf-columns/buckling-wf-columns.ts',
        buckling_i_shaped_beam: './src/buckling-i-shaped-beam/buckling-i-shaped-beam.ts',
        buckling_hss: './src/buckling-hss/buckling-hss.ts',
        buckling_double_angle: './src/buckling-double-angle/buckling-double-angle.ts',
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
            title: 'Model Viewer Documentation',
            filename: 'docs/index.html',
            template: './src/app.ejs',
            chunks: ['docs']
        }),
        new HtmlWebpackPlugin({
            title: 'Guide to 2D Drawings',
            filename: 'guide-to-2d-drawings/index.html',
            template: './src/app.ejs',
            chunks: ['guide_to_2d_drawings']
        }),
        new HtmlWebpackPlugin({
            title: 'Double-angle Brace Connection',
            filename: 'double-angle/index.html',
            template: './src/app.ejs',
            chunks: ['double_angle']
        }),
        new HtmlWebpackPlugin({
            title: 'Slotted HSS Connection',
            filename: 'slotted-hss/index.html',
            template: './src/app.ejs',
            chunks: ['slotted_hss']
        }),
        new HtmlWebpackPlugin({
            title: 'WT Bolted Connection',
            filename: 'wt-plate/index.html',
            template: './src/app.ejs',
            chunks: ['wt_plate']
        }),
        new HtmlWebpackPlugin({
            title: 'Wide-flange Truss Connection',
            filename: 'wf-truss/index.html',
            template: './src/app.ejs',
            chunks: ['wf_truss']
        }),
        new HtmlWebpackPlugin({
            title: 'Buckling of Wide-flange Columns',
            filename: 'buckling-wf-columns/index.html',
            template: './src/app.ejs',
            chunks: ['buckling_wf_columns']
        }),
        new HtmlWebpackPlugin({
            title: 'Buckling of I-shaped Plate Girder',
            filename: 'buckling-i-shaped-beam/index.html',
            template: './src/app.ejs',
            chunks: ['buckling_i_shaped_beam']
        }),
        new HtmlWebpackPlugin({
            title: 'Buckling of HSS',
            filename: 'buckling-hss/index.html',
            template: './src/app.ejs',
            chunks: ['buckling_hss']
        }),
        new HtmlWebpackPlugin({
            title: 'Buckling of Double Angle',
            filename: 'buckling-double-angle/index.html',
            template: './src/app.ejs',
            chunks: ['buckling_double_angle']
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
