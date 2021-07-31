const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/js/main.js',
    output: [
        {
            sourcemap: true,
            format: 'iife',
            name: 'main',
            file: 'dist/js/bundle.js'
        },
        {
            file: 'dist/js/bundle.min.js',
            format: 'iife',
            name: 'main'
        }
    ],
    plugins: [nodeResolve(), commonjs(), json(), terser()]
};