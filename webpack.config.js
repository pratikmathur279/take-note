import path from 'path';
const __dirname = path.resolve();
import webpack from 'webpack';
import livereload from 'webpack-livereload-plugin';

const port = process.env.PORT || 3010;

var BUILD_DIR = path.resolve(__dirname, 'public/javascript');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    mode: 'development',
    devtool: 'source-map',
    entry: APP_DIR + '/index.js',
    watch: true,
    output: {
        path: BUILD_DIR,
        filename: 'takenote.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    optimization: {
        minimizer: [new livereload()],
    },

    module: {
        rules: [
            {
                test: /\.js?/,
                include: APP_DIR,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
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
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ],
    }
};

export default config;