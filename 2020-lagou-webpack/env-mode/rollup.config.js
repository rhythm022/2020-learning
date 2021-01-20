import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


const format = [
    'es',
    // 'amd',
    // 'iife',
    // 'cjs'
]

export default format.map(format=>({
  input:'src/about.js',
  output:{
    file:`rollup-dist/bundle.${format}.js`,
    format
  },
  plugins:[
    json(),
    nodeResolve({
      browser: true,
      preferBuiltins:true
    }),
    commonjs(),
  ]
}))
