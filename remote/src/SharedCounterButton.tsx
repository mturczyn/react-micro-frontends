import useCount from './store'
import './SharedCounterButton.css'

export const SharedCounterButton = () => {
    const [count, setCount] = useCount()

    return (
        <>
            <button
                className="shared-counter-btn"
                onClick={() => setCount(count + 1)}
            >
                Count = {count} (from the store)
            </button>
        </>
    )
}
