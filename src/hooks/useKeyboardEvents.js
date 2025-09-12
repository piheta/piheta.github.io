import { useEffect } from 'react'

export function useKeyboardEvents({
    showSidebar,
    currentPath,
    onEscape
}) {
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape' && (showSidebar || currentPath !== '/')) {
                e.preventDefault()
                onEscape()
            }
        }
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [showSidebar, currentPath, onEscape])

    useEffect(() => {
        const handlePopState = () => {
            if (showSidebar || currentPath !== '/') {
                onEscape()
            }
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [showSidebar, currentPath, onEscape])
}