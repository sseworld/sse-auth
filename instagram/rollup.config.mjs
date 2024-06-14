import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/instagram-login.js",
      format: "umd",
      name: "InstagramLogin",
      plugins: [
        commonjs(),
        babel({ babelHelpers: "bundled" }),
        terser({ compress: true }),
      ],
    },
  ],
  external: ["react", "react-dom", "prop-types"],
};
