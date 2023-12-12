const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
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
