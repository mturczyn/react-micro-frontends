import NewsFeed from './NewsFeed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <h1 className="text-2xl font-bold text-center py-6">
                    🗞️ Latest News
                </h1>
                <NewsFeed />
            </div>
        </QueryClientProvider>
    )
}

export default App
