import typescript from 'rollup-plugin-typescript2';

const packageInfo = require('../package.json');
const environment = process.env.production ? 'production' : 'development';
const env = Object.assign({environment}, packageInfo.site.common, packageInfo.site[environment] || {});

env.version = new Date().toISOString().replace(/([-:])|(\.\d+Z$)/g, '').replace('T', '.');

export default {
  input: './src/js/cloud-functions/index.ts',
  output: {
    file: './cloud-functions/index.js',
    format: 'cjs',
    intro: `const env = ${JSON.stringify(env)};`
  },

  plugins: [
    typescript({clean: true, cacheRoot: 'tmp/.rpt2_cache', tsconfig: 'tsconfig.f.json', rollupCommonJSResolveHack: true}),
  ],
  external: [...Object.keys(require('./package.json').dependencies)]
}