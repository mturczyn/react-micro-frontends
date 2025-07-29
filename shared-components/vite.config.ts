import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'shared_components_app',
            // It is default name used by bundler.
            // It's accessible under URL
            // localhost:5001/assets/remoteEntry.js
            filename: 'remoteEntry.js',
            // What we are exposing
            exposes: {
                './CounterButton': './src/CounterButton',
                './SharedCounterButton': './src/SharedCounterButton',
                './store': './src/store',
            },
            // Exposes/shares libraries that our components
            // rely on. In our case it's react and react-dom.
            shared: ['react', 'react-dom', 'jotai'],
        }),
    ],
    build: {
        cssCodeSplit: false,
    },
})
