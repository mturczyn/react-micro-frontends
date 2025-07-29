import './App.css'
import { NewsFeed } from 'newsFeed/NewsFeed'
import { ArchitectureSummary } from './ArchitectureSummary'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import useCount from 'sharedComponents/store'
import { CounterButton } from 'sharedComponents/CounterButton'
import { SharedCounterButton } from 'sharedComponents/SharedCounterButton'

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/architecture">
                            Architecture and project description
                        </Link>
                    </li>
                    <li>
                        <Link to="/news-feed">News Feed</Link>
                    </li>
                    <li>
                        <Link to="/shared-components-example">
                            Shared Components Example
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/architecture" Component={ArchitectureSummary} />
                <Route path="/news-feed" Component={NewsFeedWithInformation} />
                <Route
                    path="/shared-components-example"
                    Component={ExampleOfSharedComponentsWithGlobalState}
                />
            </Routes>
        </BrowserRouter>
    )
}

const NewsFeedWithInformation = () => (
    <>
        <h1 className="sticky top-0 bg-inherit">
            News feed from another microfrontend
        </h1>
        <NewsFeed />
    </>
)

const ExampleOfSharedComponentsWithGlobalState = () => {
    const [count, setCount] = useCount()
    return (
        <section>
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

export default App
