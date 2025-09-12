import { useState } from 'react'

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

    return {
        currentModel,
        currentFolderContents,
        currentFileName,
        handleClose,
        handleFileClick
    }
}
