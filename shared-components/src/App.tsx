import './App.css'
import { SharedCounterButton } from './exposed/SharedCounterButton'
import { CounterButton } from './exposed/CounterButton'
import useCount from './exposed/store'

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
