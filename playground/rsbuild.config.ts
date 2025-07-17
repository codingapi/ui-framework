import * as path from 'path';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSass} from '@rsbuild/plugin-sass';

export default defineConfig({
    plugins: [
        pluginReact(),
        pluginSass(),
    ],
    server:{
        port: 8000,
    },
    source: {
        entry: {
            index: './src/index.tsx',
        },
        decorators: {
            version: 'legacy',
        },
    },
    resolve:{
        alias:{
            '@': path.resolve(__dirname, 'src'),
        }
    },
    html: {
        template: './public/index.html',
    },
    performance: {
        chunkSplit: {
            strategy: 'split-by-size',
            minSize: 10000,
            maxSize: 30000,
        },
    },
    tools:{

    }
});
