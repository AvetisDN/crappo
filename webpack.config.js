const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/js/app.js', './src/styles/app.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            sources: false
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "fonts"
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/assets'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            inject: "body",
        })
    ]
};