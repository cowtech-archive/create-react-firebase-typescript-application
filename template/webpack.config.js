const {setup} = require('@cowtech/webpack-config');
const {loader} = require('@cowtech/webpack-config-icons-font-awesome');

module.exports = function(env){
  return setup(env, {
    entries: {'js/app.js': './src/js/application.tsx'},
    indexFile: 'src/index.html.tsx',
    transpilers: ['typescript', 'react'],
    distFolder: 'dist',
    externals: [{firebase: 'firebase'}],
    icons: ['arrow-up@chevron-up', 'copy', 'copyright', 'email@envelope', 'favorite@heart'],
    iconsLoader: {loader}
  });
};
