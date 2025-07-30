import { CounterButton } from 'sharedComponents/CounterButton'
import { SharedCounterButton } from 'sharedComponents/SharedCounterButton'
import useCount from 'sharedComponents/store'

export const ExampleOfSharedComponentsWithGlobalState = () => {
    const [count, setCount] = useCount()

    return (
        <section className="p-6 [&_button]:mt-2 [&_button]:mb-2">
            <h2 className="text-xl font-semibold">
                Example usage of shared components from shared components
                microfrontend
            </h2>
            <p>
                Below is example of components defined in another microfrontend.
            </p>
            <p>Below button is just classic counter button:</p>
            <CounterButton />

            <h3 className="mt-3 text-l font-semibold">
                Shared state example (with Jotai)
            </h3>
            <p>
                Here's example of shared state between component imported from
                microfrontend, that uses also global state defined in that
                microfrontend (global state management is done using library{' '}
                <a href="https://jotai.org">Jotai</a>). Said microfrontend
                exposes also store to read and update global state used in below
                component.
            </p>
            <p>Below button is imported from microfrontend:</p>
            <SharedCounterButton />
            <p>
                Below button is just plain HTML button that uses global state
                imported from microfrontend:
            </p>
            <button
                className="host-btn"
                onClick={() => setCount((c: number) => c + 1)}
            >
                count is {count} (from the remote store)
            </button>
        </section>
    )
}
