import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            react(),
            tailwindcss(),
            federation({
                name: 'host_app',
                remotes: {
                    sharedComponents: env.VITE_SHARED_COMPONENTS_URL,
                    newsFeed: env.VITE_NEWS_FEED_URL,
                },
                shared: ['react', 'react-dom'],
            }),
        ],
    }
})
