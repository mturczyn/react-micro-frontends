import { useState, type PropsWithChildren } from 'react'

export default function FloatingNavMenu({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={`fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg transition-all duration-300 cursor-pointer ${
                isOpen ? 'w-32 h-auto py-2' : 'w-12 h-12'
            }`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div
                className={`flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'h-8' : 'h-12'
                }`}
            >
                <div className="w-5 h-4 flex flex-col justify-between relative">
                    <span
                        className={`h-0.5 bg-blue-600 rounded transition-transform duration-300 ${
                            isOpen ? 'rotate-45 translate-y-1.5' : ''
                        }`}
                    ></span>
                    <span
                        className={`h-0.5 bg-blue-600 rounded transition-opacity duration-300 ${
                            isOpen ? 'opacity-0' : ''
                        }`}
                    ></span>
                    <span
                        className={`h-0.5 bg-blue-600 rounded transition-transform duration-300 ${
                            isOpen ? '-rotate-45 -translate-y-1.5' : ''
                        }`}
                    ></span>
                </div>
            </div>

            {/* Menu items - only visible when expanded */}
            {isOpen && children}
        </div>
    )
}
