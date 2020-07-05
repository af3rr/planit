const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                '@primary-color': '#495266',
                '@border-radius-base': '3px',
                '@box-shadow-base': '0 2px 8px #DADEE6'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
