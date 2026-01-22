import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/support/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                tickets: resolve(__dirname, 'tickets.html'),
                report: resolve(__dirname, 'report.html'),
            }
        },
    },
});
