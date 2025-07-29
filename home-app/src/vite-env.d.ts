/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SHARED_COMPONENTS_URL: string
    readonly VITE_NEWS_FEED_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
