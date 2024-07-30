const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#FA541C', '@default-color': '#FFFFFF' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
