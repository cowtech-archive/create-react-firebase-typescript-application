const {setup} = require('@cowtech/webpack-config');

module.exports = function(env){
  return setup(env, {
    entries: {'js/app.js': './src/js/application.tsx'},
    indexFile: 'src/index.html.tsx',
    transpilers: ['typescript', 'react'],
    distFolder: 'dist',
    externals: [{firebase: 'firebase'}]
  });
};
