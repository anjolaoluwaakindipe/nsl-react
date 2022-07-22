const webpack = require("webpack")
var CompressionPlugin = require("compression-webpack-plugin")
// import { createWebpackProdConfig} from "@craco/craco"

module.exports = {
    webpack: {
        plugins: [
            new webpack.DefinePlugin({
                // <-- key to reducing React's size
                "process.env": {
                    NODE_ENV: JSON.stringify("production"),
                },
            }),
            // new webpack.optimize.DedupePlugin(), //dedupe similar code
            // new webpack.optimize.UglifyJsPlugin(), //minify everything
            new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
            new CompressionPlugin({
                // asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
        ],
    },
};