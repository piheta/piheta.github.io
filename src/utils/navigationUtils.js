import { projectFiles } from '../data/projectsData'

// Utility functions for path navigation
export const getPathParts = (path) => path.split('/').filter(Boolean)

export const navigateBack = (currentPath) => {
    const pathParts = getPathParts(currentPath)
    
    if (pathParts.length > 1) {
        return '/' + pathParts.slice(0, -1).join('/')
    }
    return '/'
}

export const buildNewPath = (currentPath, fileName, modelType) => {
    const pathParts = getPathParts(currentPath)
    
    if (pathParts.length <= 1) {
        // From root or computer level, go to computer level
        return `/computer/${fileName || modelType}`
    } else {
        // In a subfolder, append to the current path
        return `${currentPath}/${fileName || modelType}`
    }
}

export const getNavigationState = (pathParts) => {
    const navigationState = {
        isAtRoot: pathParts.length === 0,
        isAtComputer: pathParts.length === 1,
        isInFolder: pathParts.length === 2,
        isViewingFile: pathParts.length === 3,
        currentLevel: pathParts.length,
        folderName: pathParts.length >= 2 ? pathParts[1] : null
    }
    
    return navigationState
}

export const getFolderContents = (folderName) => {
    switch (folderName) {
        case 'Projects':
            return projectFiles
        default:
            return null
    }
}

export const shouldShowModel = (pathParts, modelType) => {
    const navState = getNavigationState(pathParts)
    
    if (navState.isViewingFile) {
        return modelType
    }
    
    if (navState.isInFolder) {
        return 'folder'
    }
    
    return 'computer'
}