/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'); // WORK WITH HTML (TURN TO FOLDER DIST WITH OTHER FILES CHANGES)
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // CLEAN FOLDER DIST WHEN "NPM START"
const CopyWebpackPlugin = require('copy-webpack-plugin'); // FAVICON
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // FOR CSS
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // FOR MINIMIZE CSS
const TerserWebpackPlugin = require('terser-webpack-plugin'); // FOR MINIMIZE JS
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; // VAR FOR DEVELOPMENT OR PRODUCTION
const isProd = !isDev;

const optimization = () => {
    const config = {
        // CREATE COMMON FILE WITH COMMON LIBRARIES INSTEAD OF EACH LIBRARY FROM EACH FILE
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    };

    if (isProd) {
        // in relation to dev or prod CREATE all or minimize CSS, JS
        config.minimizer = [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()];
    }

    return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`); // in relation to dev or prod CREATE all or minimize filename CSS, JS

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index'),
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: optimization(),
    devServer: {
        // WEBPACK-DEV-SERVER
        port: 4000, // CHOOSE PORT
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : false, // View initial files css, js, etc.
    plugins: [
        new HTMLWebpackPlugin({
            // WORK WITH HTML (TURN TO FOLDER DIST WITH OTHER FILES CHANGES)
            template: path.resolve(__dirname, './src/index.html'), // PATTERN FOR FINISH HTML
            minify: {
                collapseWhitespace: isProd, // MINIMIZE HTML FOR PRODUCTION
            },
        }),
        new CleanWebpackPlugin(), // CLEAN FOLDER DIST WHEN "NPM START"
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }],
            options: {
                concurrency: 100,
            },
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new ESLintPlugin({ extensions: 'ts' }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // FILE EXTENSION .CSS
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // NEW FOR WORK WITH CSS
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(mp3|wav)$/,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/, // FILE EXTENSION .SCSS
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [require('autoprefixer')],
                            },
                        },
                    },
                ],
            },

            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
        ],
    },
};
