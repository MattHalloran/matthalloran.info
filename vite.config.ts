import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.md', '**/*.png', '**/*.svg'],
    server: {
        host: true,
        port: 3003,
    },
    resolve: {
        alias: [
            // Set up absolute imports for each top-level folder and file in the src directory
            { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
            { find: 'components', replacement: path.resolve(__dirname, './src/components') },
            { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
            { find: 'utils', replacement: path.resolve(__dirname, './src/utils') },
            { find: 'Routes', replacement: path.resolve(__dirname, './src/Routes') },
            { find: 'styles', replacement: path.resolve(__dirname, './src/styles') },
        ]
    },
    // Enable source maps for debugging. Can be disabled in production, but it only saves a few seconds
    build: {
        sourcemap: true
    }
})
