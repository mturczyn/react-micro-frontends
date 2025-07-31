import { QueryClient, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { withQueryClient } from './withQueryClient'

const queryClient = new QueryClient()

type NewsArticle = {
    title: string
    description: string
    url: string
    image: string
    publishedAt: string
    source: { name: string }
}

const fetchNews = async (): Promise<NewsArticle[]> => {
    const API_KEY = import.meta.env.VITE_GNEWS_API_KEY
    const res = await axios.get(
        `https://gnews.io/api/v4/top-headlines?lang=en&token=${API_KEY}`
    )
    return res?.data.articles
}

export const NewsFeed = withQueryClient(queryClient, function NewsFeed() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['news'],
        queryFn: fetchNews,
    })
    console.log(error)
    if (isLoading) return <div className="text-center p-4">Loading news...</div>
    if (error)
        return (
            <div className="text-red-500 p-4 grid place-items-center">
                <h1 className="text-xl">Error loading news</h1>
                {(error as AxiosError)?.status === 401 && (
                    <p>Daily news limit has been reached.</p>
                )}
            </div>
        )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {data?.map((article, i) => (
                <a
                    key={i}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                        />
                    )}
                    <div className="p-4">
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {article.description}
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                            {article.source.name} —{' '}
                            {new Date(article.publishedAt).toLocaleString()}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
})
