import type { PropsWithChildren } from 'react'
import FloatingNavMenu from './FloatingNavMenu'

export const NavBar = ({ children }: PropsWithChildren) => {
    return (
        <div className="sticky z-50 top-0 left-0 pointer-events-none p-4 [&_*]:pointer-events-auto">
            <FloatingNavMenu>{children}</FloatingNavMenu>
        </div>
    )
}
