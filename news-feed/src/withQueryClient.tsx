// withQueryClient.tsx
import React, { type JSX } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function withQueryClient<P extends JSX.IntrinsicAttributes>(
    queryClient: QueryClient,
    WrappedComponent: React.ComponentType<P>
) {
    return function WithQueryClientProvider(props: P) {
        return (
            <QueryClientProvider client={queryClient}>
                <WrappedComponent {...props} />
            </QueryClientProvider>
        )
    }
}
