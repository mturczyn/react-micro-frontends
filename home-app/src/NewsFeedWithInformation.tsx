import { NewsFeed } from 'newsFeed/NewsFeed'

export const NewsFeedWithInformation = () => (
    <>
        <h1 className="text-center top-0 sticky text-xl p-2 backdrop-blur-[20px] [text-shadow:_-1px_-1px_5px_#000,_1px_-1px_5px_#000,_-1px_1px_0_#000,_1px_1px_5px_#000]">
            News feed from another microfrontend
        </h1>
        <NewsFeed />
    </>
)
