import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
    input: "src/index.js",
    output: [
      {
        file: "dist/GitHubLogin.js",
        format: "umd",
        name: "GithubLogin",
        plugins: [
          commonjs(),
          babel({ babelHelpers: "bundled", presets: ["@babel/preset-react"] }),
          terser({ compress: true }),
        ],
      },
    ],
    external: ["react", "prop-types"],
  };
  