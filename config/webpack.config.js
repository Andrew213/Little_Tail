const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HotModuleReplacementPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const CssMinimizerPlugin = require(`css-minimizer-webpack-plugin`);
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'prod';

const appDirectory = fs.realpathSync(process.cwd());
const isProductionMode = NODE_ENV !== 'development';
const webpackMode = isProductionMode ? 'production' : 'development';
const localIdentName = isProductionMode ? '[hash:base64]' : '[path][name]__[local]';

const fontsOptions = isProductionMode
    ? {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media/fonts',
          publicPath: './fonts',
          useRelativePaths: true,
      }
    : { name: 'static/media/fonts/[name].[hash:8].[ext]' };

const lessLoader = {
    loader: 'less-loader',
    options: {
        lessOptions: {
            javascriptEnabled: true,
        },
    },
};

const cssLoaders = extra => {
    const loaders = [
        {
            loader: isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName,
                    exportLocalsConvention: 'camelCase',
                    auto: resourcePath => resourcePath.endsWith('.module.scss'),
                },
            },
        },
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const plugins = () => {
    return [
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            chunksSortMode: 'auto',
            env: {
                production: isProductionMode,
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        !isProductionMode && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[fullhash:8].css',
            ignoreOrder: true,
        }),
    ].filter(Boolean);
};
module.exports = {
    entry: './src/index.tsx',
    target: 'web',
    mode: webpackMode,
    devtool: isProductionMode ? undefined : 'inline-source-map',
    optimization: {
        minimize: isProductionMode,
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
        },
        minimizer: isProductionMode ? [new TerserPlugin(), new CssMinimizerPlugin()] : undefined,
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [
                                tsImportPluginFactory([
                                    {
                                        style: false,
                                        libraryName: 'lodash',
                                        libraryDirectory: null,
                                        camel2DashComponentName: false,
                                    },
                                ]),
                            ],
                        }),
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.less$/,
                use: cssLoaders(lessLoader),
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName,
                                exportLocalsConvention: 'camelCase',
                                auto: resourcePath => resourcePath.endsWith('.module.scss'),
                            },
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    fallback: 'file-loader',
                    name: 'static/media/img/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: fontsOptions,
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgo: false,
                        },
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/svg/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(appDirectory, './src'),
            '@img': path.resolve(appDirectory, './src/img'),
            '@hooks': path.resolve(appDirectory, './src/hooks'),
        },
    },
    output: {
        filename: isProductionMode ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        chunkFilename: isProductionMode ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        path: path.resolve(appDirectory, 'build'),
    },
    plugins: plugins(),
};
