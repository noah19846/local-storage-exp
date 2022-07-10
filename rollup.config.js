// rollup.config.js
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/lse.cjs',
    format: 'cjs'
    // file: 'dist/lse.mjs',
    // format: 'esm'
  },
  plugins: [typescript(/*{ plugin options }*/)]
}
