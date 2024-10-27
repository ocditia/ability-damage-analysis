import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: undefined,
            precompress: false,
            strict: true
        }),
        paths: {
            base: '/ability-damage-analysis',
        },
        alias: {
            $components: path.resolve('src/components'),
            $lib: path.resolve('src/lib') // Additional useful alias
        }
    }
};

export default config;
