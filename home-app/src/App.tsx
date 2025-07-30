import './App.css'
import { ArchitectureSummary } from './ArchitectureSummary'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { NavBar } from './NavBar'
import { ExampleOfSharedComponentsWithGlobalState } from './ExampleOfSharedComponentsWithGlobalState'
import { NewsFeedWithInformation } from './NewsFeedWithInformation'

function App() {
    return (
        <BrowserRouter>
            <NavBar>
                <nav>
                    <ul
                        className=" flex flex-col [&_li]:hover:bg-gray-300 [&_li]:ease-in-out
                            [&_li]:transition-[background] [&_li]:duration-900 [&_a]:block [&_a]:p-2"
                    >
                        <li>
                            <Link to="/">Home</Link>
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
            </NavBar>
            <Routes>
                <Route path="/" Component={ArchitectureSummary} />
                <Route path="/news-feed" Component={NewsFeedWithInformation} />
                <Route
                    path="/shared-components-example"
                    Component={ExampleOfSharedComponentsWithGlobalState}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
