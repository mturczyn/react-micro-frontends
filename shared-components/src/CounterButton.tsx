import { useState } from 'react'

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
