import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useResponsiveScale } from '../../hooks/useResponsiveScale'
import { usePopAnimation } from '../../hooks/usePopAnimation'

// Preload the computer model
useGLTF.preload('/computer.glb')

export default function Computer({ onClick }) {
    const gltf = useGLTF('/computer.glb')
    const { scale } = useResponsiveScale(0.5)
    const animScale = usePopAnimation()
    const meshRef = useRef()

    return <primitive
        ref={meshRef}
        object={gltf.scene}
        onClick={onClick}
        scale={scale * animScale}
        position={[0, -1, 0]}
    />
}
