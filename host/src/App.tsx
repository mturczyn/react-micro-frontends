import './App.css'
import { CounterButton } from 'remoteApp/CounterButton'
import { SharedCounterButton } from 'remoteApp/SharedCounterButton'
import useCount from 'remoteApp/store'

function App() {
    const [count, setCount] = useCount()

    return (
        <>
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
        </>
    )
}

export default App
