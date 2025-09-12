import { Canvas } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Scene, Sidebar } from './components'
import { useNavigation } from './hooks/useNavigation'
import { useViewport } from './hooks/useViewport'
import { useKeyboardEvents } from './hooks/useKeyboardEvents'
import {
    CAMERA_FOV,
    CAMERA_POSITIONS,
    TRANSFORM_TRANSITION,
    DESKTOP_SIDEBAR_OFFSET,
    MOBILE_SIDEBAR_MIN,
    MOBILE_SIDEBAR_BASE,
    MOBILE_SIDEBAR_DIVISOR
} from './constants'

function App() {
    const [showSidebar, setShowSidebar] = useState(false)
    const cameraRef = useRef()

    const { isMobile, windowWidth } = useViewport()
    const {
        currentPath,
        currentModel,
        currentFolderContents,
        handleClose: navigateClose,
        handleFileClick,
        ensureComputerPath
    } = useNavigation()
    

    const getCameraPosition = () => isMobile ? CAMERA_POSITIONS.mobile : CAMERA_POSITIONS.desktop

    const handleClose = () => {
        navigateClose(() => {
            if (cameraRef.current) {
                const pos = getCameraPosition()
                cameraRef.current.setLookAt(pos[0], pos[1], pos[2], 0, 0, 0, true)
            }
            setShowSidebar(false)
        })
    }

    useKeyboardEvents({
        showSidebar,
        currentPath,
        onEscape: handleClose
    })

    useEffect(() => {
        if (showSidebar && currentPath === '/') {
            ensureComputerPath()
        }
    }, [showSidebar, currentPath, ensureComputerPath])


    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: showSidebar
                    ? (isMobile ? `translateY(-${Math.max(MOBILE_SIDEBAR_MIN, MOBILE_SIDEBAR_BASE - windowWidth / MOBILE_SIDEBAR_DIVISOR)}%)` : `translateX(${DESKTOP_SIDEBAR_OFFSET})`)
                    : 'translate(0%, 0%)',
                transition: TRANSFORM_TRANSITION
            }}>
                <Canvas camera={{ position: getCameraPosition(), fov: CAMERA_FOV }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                    <directionalLight position={[-5, 3, -5]} intensity={0.4} />
                    <directionalLight position={[0, 2, 3]} intensity={1} />
                    <Scene
                        onModelClick={() => setShowSidebar(true)}
                        cameraRef={cameraRef}
                        currentModel={currentModel}
                        currentPath={currentPath}
                    />
                </Canvas>
            </div>

            <Sidebar
                show={showSidebar}
                isMobile={isMobile}
                windowWidth={windowWidth}
                onClose={handleClose}
                onFileClick={handleFileClick}
                currentModel={currentModel}
                currentPath={currentPath}
                currentFolderContents={currentFolderContents}
            />
        </div>
    )
}

export default App
