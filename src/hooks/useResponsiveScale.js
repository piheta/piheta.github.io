import { useState, useEffect } from 'react'
import { MOBILE_BREAKPOINT } from '../constants'

export function useResponsiveScale(baseScale = 0.5, mobileBreakpoint = MOBILE_BREAKPOINT) {
    const [scale, setScale] = useState(baseScale)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const updateScale = () => {
            setScale(Math.min(window.innerWidth / 1200, 1) * baseScale)
            setIsMobile(window.innerWidth <= mobileBreakpoint)
        }
        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [baseScale, mobileBreakpoint])

    return { scale, isMobile }
}