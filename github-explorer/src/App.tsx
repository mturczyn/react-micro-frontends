// App.tsx
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import RepoCard from './RepoCard'
import type { Repo } from './types/Repo'

const fetchRepos = async (username: string): Promise<Repo[]> => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Optional
        },
    })
    if (!res.ok) throw new Error(`GitHub Error: ${res.status}`)
    return ((await res.json()) as unknown as Repo[]).map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        htmlUrl: repo.html_url,
        description: repo.description,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        owner: {
            login: repo.owner.login,
        },
    }))
}

export default function App() {
    const [username, setUsername] = useState('mturczyn')
    const [input, setInput] = useState('mturczyn')

    const {
        data: repos,
        isLoading,
        isError,
        refetch,
        error,
    } = useQuery({
        queryKey: ['repos', username],
        queryFn: () => fetchRepos(username),
        refetchOnWindowFocus: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setUsername(input.trim())
        refetch()
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">GitHub Repo Viewer</h1>

            <form
                onSubmit={handleSubmit}
                className="mb-6 flex items-center space-x-2"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter GitHub user/org"
                    className="border px-3 py-2 rounded w-64"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Load Repos
                </button>
            </form>

            {isLoading && <p className="text-gray-600">Loading...</p>}
            {isError && (
                <p className="text-red-600">{(error as Error).message}</p>
            )}

            {repos?.length
                ? repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
                : !isLoading &&
                  !isError && (
                      <p className="text-gray-600">No repositories found.</p>
                  )}
        </div>
    )
}
