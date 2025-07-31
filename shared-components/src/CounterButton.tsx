import { useState } from 'react'
import './App.css'

export const CounterButton = () => {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <button
                className="counter-btn"
                onClick={() => setCounter(counter + 1)}
            >
                Count = {counter}
            </button>
        </>
    )
}
