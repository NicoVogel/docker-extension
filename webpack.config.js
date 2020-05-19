'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BannerPlugin, DefinePlugin } = require('webpack');
const path = require('path');

const config = {
    target: 'node',
    entry: './src/docker-extension.ts',
    plugins: [
        new CleanWebpackPlugin(),
        new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
        new DefinePlugin({
            __VERSION__: JSON.stringify(process.env.npm_package_version),
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'docker-extension.js',
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
};

module.exports = config;