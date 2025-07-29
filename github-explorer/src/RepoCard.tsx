// components/RepoCard.tsx
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Repo } from './types/Repo'

const fetchCommits = async (
    owner: string,
    repo: string,
    since: Date,
    until: Date
) => {
    const url = new URL(`https://api.github.com/repos/${owner}/${repo}/commits`)
    url.searchParams.append('since', since.toISOString())
    url.searchParams.append('until', until.toISOString())

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
    })

    if (!res.ok) throw new Error('Failed to fetch commits in range')
    return res.json()
}

export default function RepoCard({ repo }: { repo: Repo }) {
    const {
        data: commits,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['commit-activity', repo.owner.login, repo.name],
        queryFn: () =>
            fetchCommits(
                repo.owner.login,
                repo.name,
                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                new Date()
            ),
        staleTime: 1000 * 60 * 10, // 10 mins
        enabled: !!repo?.name,
    })

    return (
        <div className="rounded-xl shadow border p-4 mb-4">
            <h2 className="text-lg font-semibold text-blue-400">
                <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {repo.fullName}
                </a>
            </h2>
            {repo.description && (
                <p className="text-sm mb-2">{repo.description}</p>
            )}
            <div className="flex text-sm gap-4">
                <div>⭐ {repo.stargazersCount}</div>
                <div>🍴 {repo.forksCount}</div>
                <div>
                    🧑‍💻 Last week commits:{' '}
                    <strong>
                        {isLoading
                            ? 'Loading...'
                            : isError
                            ? 'Error'
                            : commits.length ?? '–'}
                    </strong>
                </div>
            </div>
        </div>
    )
}
