import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "index.js",
  output: {
    file: "L.Terminator.js",
    format: "umd",
    name: "L.terminator",
    globals: {
      leaflet: "L"
    }
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ],
  external: ["leaflet"]
};
