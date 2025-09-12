import { useState, useEffect } from 'react'
import { MOBILE_BREAKPOINT } from '../constants'

export function useViewport() {
    const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
            setWindowWidth(window.innerWidth)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return {
        isMobile,
        windowWidth
    }
}