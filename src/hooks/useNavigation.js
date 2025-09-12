import { useState, useEffect } from 'react'

export function useNavigation() {
    const [currentModel, setCurrentModel] = useState('computer')
    const [currentFolderContents, setCurrentFolderContents] = useState(null)
    const [currentFileName, setCurrentFileName] = useState('')
    const [navigationStack, setNavigationStack] = useState([{ model: 'computer', folderContents: null, fileName: '' }])

    const handleClose = (onRootClose = null) => {
        if (navigationStack.length > 1) {
            // Go back one level in the stack
            const newStack = navigationStack.slice(0, -1)
            const previousState = newStack[newStack.length - 1]

            setNavigationStack(newStack)
            setCurrentModel(previousState.model)
            setCurrentFolderContents(previousState.folderContents)
            setCurrentFileName(previousState.fileName || '')
        } else {
            // Already at root, close sidebar
            setCurrentModel('computer')
            setCurrentFolderContents(null)
            setCurrentFileName('')
            setNavigationStack([{ model: 'computer', folderContents: null, fileName: '' }])

            // Call the callback for additional cleanup (like closing sidebar, camera reset)
            if (onRootClose) {
                onRootClose()
            }
        }

    }

    const handleFileClick = (modelType, fileName = '', folderContents = null) => {
        setCurrentModel(modelType)
        setCurrentFileName(fileName)

        // Add to navigation stack
        const newState = {
            model: modelType,
            folderContents: modelType === 'folder' ? folderContents : null,
            fileName: fileName || ''
        }
        setNavigationStack(prev => [...prev, newState])

        // Store folder contents if it's a folder
        if (modelType === 'folder' && folderContents) {
            setCurrentFolderContents(folderContents)
        }
    }

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            // Use our navigation when browser back is pressed
            if (navigationStack.length > 1) {
                event.preventDefault()
                handleClose()
            }
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [navigationStack.length, handleClose])

    // Push history state when navigation changes
    useEffect(() => {
        if (navigationStack.length > 1) {
            window.history.pushState({ depth: navigationStack.length }, '', '/')
        } else {
            window.history.replaceState({ depth: 1 }, '', '/')
        }
    }, [navigationStack.length])

    return {
        currentModel,
        currentFolderContents,
        currentFileName,
        handleClose,
        handleFileClick
    }
}
