const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/content/index.js", "src/background/index.js"],
  loader: { ".js": "jsx", ".jsx": "jsx" },
  outdir: "dist",
  bundle: true,
  format: "iife",   // content.js
  sourcemap: true,
  minify: false
}).catch(() => process.exit(1));