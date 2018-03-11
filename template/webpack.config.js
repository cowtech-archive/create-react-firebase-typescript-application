const {setup} = require('@cowtech/webpack-config-lite');
const {loader} = require('@cowtech/webpack-config-icons-font-awesome');

module.exports = function(env){
  return setup(env, {
    entries: {'js/app.js': './src/js/application.tsx'},
    indexFile: 'src/index.html.tsx',
    transpilers: ['typescript', 'react'],
    externals: [{firebase: 'firebase'}],
    icons: ['arrow-up@chevron-up', 'copyright', 'email@envelope', 'favorite@heart'],
    iconsLoader: {loader},
    server: {
      https: true
    }
  });
};
