export const ArchitectureSummary = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 [&_pre]:bg-gray-700 [&_p]:pb-3 [&_p]:pt-3">
            <h1 className="text-3xl font-bold text-indigo-600">
                🧩 Microfrontend Architecture with Vite, Docker & GitHub Actions
            </h1>

            <p>
                This project uses a microfrontend architecture powered by{' '}
                <strong>Module Federation</strong> with{' '}
                <strong>React + Vite</strong>. It consists of following
                microfrontends:
            </p>
            <ul className="list-disc list-inside ml-4">
                <li>
                    <strong>Home App</strong> (Shell) - this application
                </li>
                <li>
                    <a
                        href={
                            new URL(import.meta.env.VITE_SHARED_COMPONENTS_URL)
                                .origin
                        }
                    >
                        <strong>Shared Components</strong>
                    </a>
                </li>
                <li>
                    <a
                        href={
                            new URL(import.meta.env.VITE_NEWS_FEED_URL).origin
                        }
                    >
                        <strong>News Feed</strong>
                    </a>
                </li>
            </ul>

            <p>
                Each is independently built, containerized, and deployed via
                Docker and GitHub Actions to Azure.
            </p>

            <section>
                <h2 className="text-xl font-semibold">📦 Tech Stack</h2>
                <ul className="list-disc list-inside ml-4">
                    <li>Vite + React</li>
                    <li>
                        Module Federation via{' '}
                        <code>@originjs/vite-plugin-federation</code>
                    </li>
                    <li>Docker for builds</li>
                    <li>Nginx for static serving</li>
                    <li>GitHub Actions for CI/CD</li>
                    <li>Azure App Service for hosting</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold">🚀 Environments</h2>
                <p>
                    Environment-specific configs are handled with{' '}
                    <code>.env</code> files and Vite:
                </p>

                <pre className="p-4 rounded text-sm overflow-auto">
                    {`# .env.local (dev)
VITE_REMOTE_URL=http://localhost:5001/assets/remoteEntry.js

# .env.production (prod)
VITE_REMOTE_URL=https://mf-remote.azurewebsites.net/assets/remoteEntry.js`}
                </pre>

                <p>
                    Used in <code>vite.config.ts</code>:
                </p>
                <pre className="p-4 rounded text-sm overflow-auto">
                    {`import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: 'host_app',
        remotes: {
          remoteApp: env.VITE_REMOTE_URL,
        },
        shared: ['react', 'react-dom'],
      }),
    ],
  };
});`}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">🐳 Dockerfile</h2>
                <p>Two-stage build: Node for build, Nginx for serving:</p>

                <pre className="p-4 rounded text-sm overflow-auto">
                    {`FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --mode production

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]`}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">🤖 GitHub Actions</h2>
                <p>Reusable workflow to deploy with secrets and matrix jobs:</p>
                <pre className="p-4 rounded text-sm overflow-auto">
                    {`jobs:
  deploy-remote-app-to-prod:
    uses: './.github/workflows/deploy-infra-and-website-to-env.yml'
    with:
      dockerFilePath: './remote/Dockerfile'
      dockerImageNameAndTag: module-federation-remote:latest
      resourceGroupName: intrinsic-rg
    secrets:
      clientId: \${{ secrets.AZURE_CLIENT_ID }}
      ...`}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">
                    🌐 Cross-Origin (CORS)
                </h2>
                <p>In Nginx, to allow cross-origin MF loading:</p>
                <pre className="p-4 rounded text-sm overflow-auto">
                    {`add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, OPTIONS';
add_header 'Access-Control-Allow-Headers' '*';`}
                </pre>
            </section>
        </div>
    )
}
