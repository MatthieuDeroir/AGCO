const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            webpackConfig.resolve.alias = {
                ...webpackConfig.resolve.alias,
                '@components': path.resolve(__dirname, 'src/components/')
            };


            return webpackConfig;
        }
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            // ... other polyfills if needed
        }
    },
    node: {
        path: true,
        // ... other Node.js core modules if needed
    }
};
