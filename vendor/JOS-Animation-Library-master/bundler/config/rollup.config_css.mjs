import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss"; // css

export default {
  input: "../bundler/original/jos_tmp.css", // Path to your input CSS file
  output: {
    file: "../bundler/original/jos.css",
    //sourcemap: true,
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      autoModules: true,
      minimize: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
    terser(),
  ],
};
