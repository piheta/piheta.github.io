import { CameraControls } from '@react-three/drei'
import { Computer, Notepad, Folder } from './models'

export default function Scene({ onModelClick, cameraRef, currentModel, currentPath }) {
    const handleModelClick = () => {
        if (cameraRef.current) {
            cameraRef.current.setLookAt(0, 0.75, 5, 0, 0, 0, true)
            setTimeout(onModelClick, 100)
        }
    }

    const renderModel = () => {
        switch (currentModel) {
            case 'computer':
                return <Computer onClick={handleModelClick} />
            case 'notepad':
                return <Notepad onClick={handleModelClick} currentPath={currentPath} />
            case 'folder':
                return <Folder onClick={handleModelClick} />
            default:
                return <Computer onClick={handleModelClick} />
        }
    }

    return (
        <>
            <CameraControls ref={cameraRef} enablePan={false} mouseButtons={{ left: 1, right: 0 }} smoothTime={0.2} />
            {renderModel()}
        </>
    )
}