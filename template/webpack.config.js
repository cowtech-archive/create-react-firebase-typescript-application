const cowtechWebpack = require('@cowtech/webpack-config');

module.exports = function(env){
  return cowtechWebpack.webpackConfig(env, {
    entries: {
      'js/app.js': './src/js/application.tsx',
      'sw.js': './src/js/service-worker.ts'
    },
    indexFile: 'src/index.html.tsx',
    transpilers: ['typescript', 'react'],
    distFolder: 'dist',
    externals: [{firebase: 'firebase'}]
  });
};
