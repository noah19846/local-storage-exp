// rollup.config.js
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/lsc.cjs',
    format: 'cjs'
    // file: 'dist/lsc.mjs',
    // format: 'esm'
  },
  plugins: [typescript(/*{ plugin options }*/)]
}
