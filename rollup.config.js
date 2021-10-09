import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import html from '@rollup/plugin-html';
import path from 'path';

import { namespace, repo } from './scripts/initialize.json';
import { name, version, homepage, license } from './package.json';

const BUILD_MODE = !process.env.ROLLUP_WATCH;
const OUTPUT_DIR = BUILD_MODE ? 'build' : 'demo';

const banner = `/*!
 * ${name} v${version} - ${homepage}
 *
 * (c) COXCORE / Park U-yeong
 * ${license} License
 */
`;

const ns = (namespace || repo?.split('/')[0] || 'coxcore')
    .replace('@', '')
    .replace(/-([a-z])/g, (str, char) => char.toUpperCase());

const fileName = (file) => path.resolve(__dirname, OUTPUT_DIR, file);

const production = () => ({
    input: 'src/lib/index.ts',
    output: [
        {
            banner,
            file: fileName('index.js'),
            format: 'esm',
            sourcemap: true,
        },
        {
            banner,
            file: fileName('index.min.js'),
            format: 'umd',
            name: ns,
            exports: 'named',
            extend: true,
            sourcemap: true,
            plugins: [terser()],
        },
    ],
    plugins: [
        del({ targets: OUTPUT_DIR }),
        typescript(),
        resolve({ extensions: ['.js', '.ts'] }),
    ],
});

const development = () => ({
    input: `src/${OUTPUT_DIR}/index.ts`,
    output: [
        {
            banner,
            file: fileName('index.js'),
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        resolve({ extensions: ['.js', '.ts'] }),
        html({ title: name }),
        serve({
            open: true,
            contentBase: OUTPUT_DIR,
            port: 9090,
        }),
        livereload(`${OUTPUT_DIR}/index.html`),
    ],
});

export default BUILD_MODE ? production() : development();
