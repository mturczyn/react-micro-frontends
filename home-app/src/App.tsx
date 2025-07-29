import './App.css'
import { CounterButton } from 'sharedComponents/CounterButton'
import { SharedCounterButton } from 'sharedComponents/SharedCounterButton'
import useCount from 'sharedComponents/store'
import { NewsFeed } from 'newsFeed/NewsFeed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    const [count, setCount] = useCount()

    return (
        <QueryClientProvider client={queryClient}>
            <h1>Host Application</h1>
            <CounterButton />
            <div>
                <h1>Shared state (with Jotai)</h1>
                <SharedCounterButton />
                <button
                    className="host-btn"
                    onClick={() => setCount((c: number) => c + 1)}
                >
                    count is {count} (from the remote store)
                </button>
            </div>
            <h1>News feed from another microfrontend</h1>
            <NewsFeed />
        </QueryClientProvider>
    )
}

export default App
