import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useResponsiveScale } from '../../hooks/useResponsiveScale'
import { usePopAnimation } from '../../hooks/usePopAnimation'
import { useTextModel } from '../../hooks/useTextModel'

// Preload the notepad model
useGLTF.preload('/notepad.glb')

export default function Notepad({ onClick, fileName }) {
    const gltf = useGLTF('/notepad.glb')
    const { scale, isMobile } = useResponsiveScale(0.5)
    const animScale = usePopAnimation()
    
    // Get the appropriate text model using the passed fileName
    const textGltf = useTextModel(fileName)
    
    const meshRef = useRef()
    const textMeshRef = useRef()

    return (
        <>
            <primitive
                ref={meshRef}
                object={gltf.scene}
                onClick={onClick}
                scale={scale * animScale}
                position={[0, isMobile ? -0.8 : 0, 0]}
            />
            {textGltf && (
                <primitive
                    ref={textMeshRef}
                    object={textGltf.scene}
                    onClick={onClick}
                    scale={scale * animScale}
                    position={[0, (isMobile ? -0.8 : 0) - (1 * scale * 2), 0]}
                />
            )}
        </>
    )
}
