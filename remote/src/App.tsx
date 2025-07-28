import './App.css'
import { SharedCounterButton } from './SharedCounterButton'
import { CounterButton } from './CounterButton'
import useCount from './store'

function App() {
    const [count, setCount] = useCount()

    return (
        <>
            <h1>Remote app with counter button</h1>
            <CounterButton />
            <div>
                <h1>Shared state (with Jotai)</h1>
                <SharedCounterButton />
                <button
                    className="counter-btn"
                    onClick={() => setCount((c: number) => c + 1)}
                >
                    count is {count} (from the store)
                </button>
            </div>
        </>
    )
}

export default App
