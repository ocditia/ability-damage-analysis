import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    worker: { format: 'es', plugins: () => [svelte()] },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
