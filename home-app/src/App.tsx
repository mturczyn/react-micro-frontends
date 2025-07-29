import './App.css'
import { NewsFeed } from 'newsFeed/NewsFeed'
import { ArchitectureSummary } from './ArchitectureSummary'

function App() {
    return (
        <>
            <ArchitectureSummary />
            <h1>News feed from another microfrontend</h1>
            <NewsFeed />
        </>
    )
}

export default App
