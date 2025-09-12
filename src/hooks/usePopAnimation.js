import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { POPUP_DURATION, OVERSHOOT_AMOUNT } from '../constants'

export function usePopAnimation(duration = POPUP_DURATION, overshootAmount = OVERSHOOT_AMOUNT) {
    const [animScale, setAnimScale] = useState(1)
    const startTimeRef = useRef(null)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        
        // Initialize start time on first frame
        if (startTimeRef.current === null) {
            startTimeRef.current = time
        }
        
        const elapsed = time - startTimeRef.current
        
        if (elapsed < duration) {
            // Quick pop: start at 1, overshoot, then bounce back
            const t = elapsed / duration
            const easeOut = 1 - Math.pow(1 - t, 4)
            const overshoot = 1 + overshootAmount * Math.sin(easeOut * Math.PI)
            setAnimScale(overshoot)
        } else {
            setAnimScale(1)
        }
    })

    return animScale
}