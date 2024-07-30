const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': `#00AEEF`, '@default-color': '#FFFFFF' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
