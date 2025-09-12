import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useResponsiveScale } from '../../hooks/useResponsiveScale'
import { usePopAnimation } from '../../hooks/usePopAnimation'

// Preload the folder model
useGLTF.preload('/folder.glb')

export default function Folder({ onClick }) {
    const gltf = useGLTF('/folder.glb')
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
