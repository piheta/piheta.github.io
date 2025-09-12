import { useState, useEffect } from 'react'
import DialogWindow from './DialogWindow'
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'
import FileExplorer from './FileExplorer'
import StatusBar from './StatusBar'
import { 
    MOBILE_SIDEBAR_HEIGHT_MIN, 
    MOBILE_SIDEBAR_HEIGHT_BASE, 
    MOBILE_SIDEBAR_HEIGHT_DIVISOR 
} from '../../constants'

export default function Sidebar({ show, isMobile, windowWidth, onClose, onFileClick, currentModel, currentPath, currentFolderContents }) {
    const [showDialog, setShowDialog] = useState(false)
    const [fileContent, setFileContent] = useState('')

    useEffect(() => {
        if (show) {
            setTimeout(() => setShowDialog(true), 500)
        } else {
            setShowDialog(false)
        }
    }, [show])

    useEffect(() => {
        const pathParts = currentPath.split('/').filter(Boolean)
        const fileName = pathParts[pathParts.length - 1]

        if (currentModel === 'notepad' && fileName && fileName.endsWith('.txt')) {
            fetch(`/html/${fileName}`)
                .then(response => response.text())
                .then(text => setFileContent(text))
                .catch(err => setFileContent(
                    fileName === 'about-me.txt' 
                        ? 'Error loading file' 
                        : `<h1>${fileName}</h1><p>File not found</p>`
                ))
        } else {
            setFileContent('')
        }
    }, [currentModel, currentPath])

    const isTextFile = currentModel === 'notepad'

    return (
        <div style={{
            marginBottom: '1rem',
            position: 'absolute',
            background: 'transparent',
            ...(isMobile
                ? {
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: `${Math.max(MOBILE_SIDEBAR_HEIGHT_MIN, MOBILE_SIDEBAR_HEIGHT_BASE - windowWidth / MOBILE_SIDEBAR_HEIGHT_DIVISOR)}%`,
                    transform: show ? 'translateY(0%)' : 'translateY(100%)',
                }
                : {
                    right: 0,
                    top: 0,
                    width: '40%',
                    height: '100%',
                    transform: show ? 'translateX(0%)' : 'translateX(100%)',
                }
            ),
            transition: 'transform 0.6s ease-in-out'
        }}>
            <DialogWindow showDialog={showDialog} isMobile={isMobile}>
                <TitleBar 
                    isTextFile={isTextFile} 
                    fileContent={fileContent} 
                    onClose={onClose} 
                />
                <MenuBar />
                <FileExplorer 
                    isTextFile={isTextFile}
                    fileContent={fileContent}
                    currentFolderContents={currentFolderContents}
                    onFileClick={onFileClick}
                />
                <StatusBar 
                    isTextFile={isTextFile}
                    currentFolderContents={currentFolderContents}
                />
            </DialogWindow>
        </div>
    )
}
