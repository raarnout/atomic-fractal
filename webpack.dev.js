const path = require('path'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['./src/js', './node_modules']
    },
    entry: {
        main: './src/index.js'
    },
    devServer: {
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts'
                        }
                    },
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images'
                        }
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. Extract css into files
                    'css-loader', //2. Turns css into commonjs
                    'sass-loader' //1. Turns sass into css
                ]
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    useBuiltIns: 'entry',
                                    'corejs': 2
                                }
                            ]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                            '@babel/plugin-proposal-optional-chaining'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new CleanWebpackPlugin({
            // fonts and images will be removed and not regenerated on a watch.
            // Therefore we set cleanStaleWebpackAssets: false
            // https://github.com/johnagan/clean-webpack-plugin/issues/116
            cleanStaleWebpackAssets: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/', to: './assets' }
            ]
        }),
    ]
};
