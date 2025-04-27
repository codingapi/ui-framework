import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'util'],
  plugins: [
    del({ targets: 'dist/*' }),
    peerDepsExternal(),
    alias({
      entries: [
        { find: 'util', replacement: 'util/' }
      ]
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      useTsconfigDeclarationDir: true,
    }),
    postcss({
      extensions: ['.css'],
    }),
  ],
};
