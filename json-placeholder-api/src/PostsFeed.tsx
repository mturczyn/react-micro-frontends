import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
    userId: number
    id: number
    title: string
    body: string
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
    )
    return response.data
}

const PostsFeed: React.FC = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if (isLoading) {
        return <div className="p-4 text-gray-500">Loading posts...</div>
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load posts: {(error as Error).message}
            </div>
        )
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Posts Feed
            </h2>
            <div className="space-y-4">
                {posts?.slice(0, 10).map((post) => (
                    <div
                        key={post.id}
                        className="border border-gray-300 rounded-md p-4 bg-white shadow-sm"
                    >
                        <h3 className="font-semibold text-lg mb-2 text-blue-800">
                            {post.title}
                        </h3>
                        <p className="text-gray-700">{post.body}</p>
                        <div className="text-xs text-gray-500 mt-2">
                            User ID: {post.userId}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostsFeed
