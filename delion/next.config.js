const path = require('path');

module.exports = {
  images: {
    domains: ['localhost', '127.0.0.1', 'molid.delion.ru', 'storage.yandexcloud.net'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
    prependData: `@import "_variables.scss";@import "_media.scss";@import "mixins.scss";`,
  },
};
