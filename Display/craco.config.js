const path = require('path');
const buffer = require("buffer");
const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            const definePlugin = new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
            });

            webpackConfig.plugins.push(definePlugin);
            // Adding an alias for '@components'
            webpackConfig.resolve.alias = {
                ...webpackConfig.resolve.alias,
                '@components': path.resolve(__dirname, 'src/components/')
            };

            // Adding fallbacks for Node.js core modules
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                "path": require.resolve("path-browserify"),
                "crypto": require.resolve("crypto-browserify"),
                "os": require.resolve("os-browserify/browser"),
                "stream": require.resolve("stream-browserify"),
                "buffer": require.resolve("buffer/"),

            };

            return webpackConfig;
        }
    },
    // The 'node' key is not needed in the craco configuration
    // It's generally used in Webpack's own configuration file
};
