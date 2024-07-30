const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#389e0d', '@default-color': '#FFFFFF' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
