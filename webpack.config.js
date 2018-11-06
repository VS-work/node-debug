const path = require('path');

module.exports = () => ({
    mode: 'production',
    entry: {
        'waffle-server': './src/waffle-server.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'waffle-server.js',
        libraryTarget: 'var',
        library: 'logic'
    },
    performance: {hints: false},
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: []
});
