export interface Repo {
    id: number
    name: string
    fullName: string
    htmlUrl: string
    description: string
    stargazersCount: number
    forksCount: number
    owner: {
        login: string
    }
}
