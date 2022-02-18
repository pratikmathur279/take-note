import path from 'path';
const __dirname = path.resolve();
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
// import CompressionPlugin from 'compression-webpack-plugin';

var BUILD_DIR = path.resolve(__dirname, 'public/javascript');
var APP_DIR = path.resolve(__dirname, 'src/');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
};

var config = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: APP_DIR + '/index.js',

    output: {
        path: BUILD_DIR,
        filename: 'my-website.js',
        publicPath: '/'
    },

    optimization: {
        minimizer: [new webpack.DefinePlugin(GLOBALS), new UglifyJsPlugin()],
    },

    // plugins: [new CompressionPlugin()],

    module: {
        rules: [
            {
                test: /\.js?/,
                include: APP_DIR,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // Inline files smaller than 10 kB (10240 bytes)
                    limit: 10 * 1024,
                }
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true // true outputs JSX tags
                        }
                    }
                ]
            }
        ]
    }
};

export default config;