const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');

export default {
    input: 'src/js/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'main',
        file: 'public/js/main.bundle.js',
      },
    plugins: [builtins(), nodeResolve(), commonjs(), json()]
};
