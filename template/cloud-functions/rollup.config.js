import typescript from "rollup-plugin-typescript2";

const packageInfo = require("../package.json");
const env = process.env.production ? "production" : "development";

export default {
  entry: "./src/js/cloud-functions/index.ts",
  dest: "./cloud-functions/index.js",
  format: "cjs",

  plugins: [
    typescript({clean: true, cacheRoot: "tmp/.rpt2_cache", tsconfig: "tsconfig.node.json"})
  ],
  external: [...Object.keys(require("./package.json").dependencies)],
  intro: `const env = ${JSON.stringify(Object.assign({environment: env}, packageInfo.site.common, packageInfo.site[env] || {}))};`
}