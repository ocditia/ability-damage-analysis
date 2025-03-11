import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
    plugins: [
        sveltekit()
    ],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    base: './',
    resolve: {
        alias: {
            '$components': '/src/components',
            '$lib': '/src/lib',
            '$styles': '/src/styles'
        }
    }
});
