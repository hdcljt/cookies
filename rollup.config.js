import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/cookies.esm.js',
      format: 'es',
      exports: 'named'
    },
    {
      file: 'lib/cookies.esm.min.js',
      format: 'es',
      exports: 'named',
      plugins: [terser()]
    }
  ],
  plugins: [typescript({ useTsconfigDeclarationDir: true })]
}
