const child_process = require('child_process')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        //Sculpture Connections
        full_AISC_sculpture: './src/full-AISC-sculpture/full-AISC-sculpture.ts',
        shear_tab: './src/shear-tab/shear-tab.ts',
        seated_truss: './src/seated-truss/seated-truss.ts',
        BW_double_angle: './src/BW-double-angle/BW-double-angle.ts',
        bent_plate: './src/bent-plate/bent-plate.ts',
        column_splice: './src/column-splice/column-splice.ts',
        base_plate: './src/base-plate/base-plate.ts',
        direct_weld: './src/direct-weld/direct-weld.ts',
        moment_splice: './src/moment-splice/moment-splice.ts',
        end_plate: './src/end-plate/end-plate.ts',
        flange_plate: './src/flange-plate/flange-plate.ts',
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
            },
            {
                test: /\.md$/,
                loader: 'html-loader',
                options: {
                    preprocessor: (content, loaderContext) => {
                        let result = child_process.execFileSync(
                            'pandoc', ['-t', 'html', '--mathjax'], { input: content }
                        )
                        return result.toString()
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff2|svg|png|jpe?g|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(gltf|glb)$/,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
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
        new HtmlWebpackPlugin({
            title: 'AISC Steel Sculpture',
            filename: 'full-AISC-sculpture/index.html',
            template: './src/app.ejs',
            chunks: ['full_AISC_sculpture']
        }),
        new HtmlWebpackPlugin({
            title: 'Shear Tab Connection',
            filename: 'shear-tab/index.html',
            template: './src/app.ejs',
            chunks: ['shear_tab']
        }),
        new HtmlWebpackPlugin({
            title: 'Seated Truss Connection',
            filename: 'seated-truss/index.html',
            template: './src/app.ejs',
            chunks: ['seated_truss']
        }),
        new HtmlWebpackPlugin({
            title: 'Bolted Double Angle Connection',
            filename: 'BW-double-angle/index.html',
            template: './src/app.ejs',
            chunks: ['BW_double_angle']
        }),
        new HtmlWebpackPlugin({
            title: 'Bent Plate Connection',
            filename: 'bent-plate/index.html',
            template: './src/app.ejs',
            chunks: ['bent_plate']
        }),
        new HtmlWebpackPlugin({
            title: 'Column Splice Connection',
            filename: 'column-splice/index.html',
            template: './src/app.ejs',
            chunks: ['column_splice']
        }),
        new HtmlWebpackPlugin({
            title: 'Base Plate Connection',
            filename: 'base-plate/index.html',
            template: './src/app.ejs',
            chunks: ['base_plate']
        }),
        new HtmlWebpackPlugin({
            title: 'Directly Welded Flange Moment Connection',
            filename: 'direct-weld/index.html',
            template: './src/app.ejs',
            chunks: ['direct_weld']
        }),
        new HtmlWebpackPlugin({
            title: 'Moment Splice Connection',
            filename: 'moment-splice/index.html',
            template: './src/app.ejs',
            chunks: ['moment_splice']
        }),
        new HtmlWebpackPlugin({
            title: 'End Plate Connection',
            filename: 'end-plate/index.html',
            template: './src/app.ejs',
            chunks: ['end_plate']
        }),
        new HtmlWebpackPlugin({
            title: 'Flange Plate Connection',
            filename: 'flange-plate/index.html',
            template: './src/app.ejs',
            chunks: ['flange_plate']
        })


    ],
    output: {
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/[name]-[hash][ext]',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.ts', '...']
    }
}
