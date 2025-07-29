import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        federation({
            name: 'news_feed_app',
            // It is default name used by bundler.
            // It's accessible under URL
            // localhost:5002/assets/remoteEntry.js
            filename: 'remoteEntry.js',
            // What we are exposing
            exposes: {
                './NewsFeed': './src/NewsFeed',
            },
            // Exposes/shares libraries that our components
            // rely on. In our case it's react and react-dom.
            shared: ['react', 'react-dom', 'axios', '@tanstack/react-query'],
        }),
    ],
    build: {
        cssCodeSplit: false,
    },
})
