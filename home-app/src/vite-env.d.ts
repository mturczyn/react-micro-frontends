/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SHARED_COMPONENTS_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
