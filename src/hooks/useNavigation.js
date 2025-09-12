import { useState, useEffect } from 'react'
import {
    getPathParts,
    navigateBack,
    buildNewPath,
    getNavigationState,
    getFolderContents,
} from '../utils/navigationUtils'

export function useNavigation() {
    const [currentPath, setCurrentPath] = useState('/')
    const [currentModel, setCurrentModel] = useState('computer')
    const [currentFolderContents, setCurrentFolderContents] = useState(null)

    const pathParts = getPathParts(currentPath)
    const navigationState = getNavigationState(pathParts)

    const handleClose = (onRootClose = null) => {
        if (pathParts.length > 1) {
            // Go back one level
            const newPath = navigateBack(currentPath)
            setCurrentPath(newPath)
            window.history.pushState(null, '', newPath)

            if (pathParts.length === 2) {
                // Back to computer view from folder
                setCurrentModel('computer')
                setCurrentFolderContents(null)
            } else if (pathParts.length === 3) {
                // Back to folder view from file
                setCurrentModel('folder')
                // Restore folder contents based on the folder name
                const folderContents = getFolderContents(navigationState.folderName)
                setCurrentFolderContents(folderContents)
            } else {
                // Going back to a parent folder - clear folder contents to show root
                setCurrentFolderContents(null)
            }
        } else {
            // Already at root or computer level, return to root
            setCurrentModel('computer')
            setCurrentPath('/')
            setCurrentFolderContents(null)
            window.history.pushState(null, '', '/')

            // Call the callback for additional cleanup (like closing sidebar, camera reset)
            if (onRootClose) {
                onRootClose()
            }
        }
    }

    const handleFileClick = (modelType, fileName = '', folderContents = null) => {
        setCurrentModel(modelType)

        const newPath = buildNewPath(currentPath, fileName, modelType)
        setCurrentPath(newPath)
        window.history.pushState(null, '', newPath)

        // Store folder contents if it's a folder, otherwise preserve current state
        if (modelType === 'folder' && folderContents) {
            setCurrentFolderContents(folderContents)
        }
    }

    // Effect to handle direct URL changes or when sidebar opens at root
    useEffect(() => {
        if (currentPath === '/') {
            setCurrentModel('computer')
        }
    }, [currentPath])

    const ensureComputerPath = () => {
        if (currentPath === '/') {
            setCurrentPath('/computer')
            window.history.pushState(null, '', '/computer')
        }
    }

    return {
        currentPath,
        currentModel,
        currentFolderContents,
        navigationState,
        pathParts,
        setCurrentPath,
        handleClose,
        handleFileClick,
        ensureComputerPath
    }
}
