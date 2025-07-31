import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
// import { resolve } from 'path'

// https://vite.dev/config/
// Commented parts are for informational purposes only:
// it was used to modify build based on parameters passed
// into vite command (like command "serve", etc.)
export default defineConfig((/*{ command }*/) => {
    // // Only will affect dev, when we running it with server.
    // // With preview, assets already are build in dist.
    // const isDevCommand = command === 'serve'

    // const entryPoint = isDevCommand
    //     ? 'index.html'
    //     : resolve(__dirname, './src/index.ts')

    return {
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
            // rollupOptions: {
            //     input: entryPoint,
            // },
            cssCodeSplit: false,
        },
    }
})
