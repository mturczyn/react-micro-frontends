import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'host_app',
            remotes: {
                remoteApp:
                    'http://mf-remote.azurewebsites.net/assets/remoteEntry.js',
            },
            shared: ['react', 'react-dom'],
        }),
    ],
})
