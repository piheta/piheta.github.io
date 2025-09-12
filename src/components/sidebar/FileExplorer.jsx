import FolderIcon from '../icons/FolderIcon'
import FileIcon from '../icons/FileIcon'
import LinkIcon from '../icons/LinkIcon'
import NotepadViewer from './NotepadViewer'
import { rootFiles, projectFiles, socialLinks } from '../../data/projectsData'

export default function FileExplorer({ 
    isTextFile, 
    fileContent, 
    currentFolderContents, 
    onFileClick 
}) {
    return (
        <div style={{
            width: 'calc(100% - 1.8rem)',
            height: 'calc(95% - 5.0rem)',
            background: 'white',
            margin: '0.3rem',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderRight: '2px solid white',
            borderBottom: '2px solid white',
            boxShadow: 'inset 2px 2px 0 black, inset -2px -2px 0 #c0c0c0',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            padding: '8px',
            overflow: 'auto'
        }}>
            {isTextFile && fileContent ? (
                <NotepadViewer fileContent={fileContent} />
            ) : currentFolderContents ? (
                // Show contents of the current folder
                currentFolderContents.map((item, index) =>
                    item.type === 'folder' ? (
                        <FolderIcon
                            key={index}
                            text={item.name}
                            onClick={onFileClick}
                            children={item.children}
                        />
                    ) : (
                        <FileIcon
                            key={index}
                            type={item.type}
                            text={item.name}
                            onClick={onFileClick}
                        />
                    )
                )
            ) : (
                // Show root directory contents
                <>
                    <FolderIcon
                        text="Projects"
                        onClick={onFileClick}
                        children={projectFiles}
                    />
                    {rootFiles.map((file, index) => (
                        <FileIcon 
                            key={index}
                            type={file.type} 
                            text={file.name} 
                            onClick={onFileClick} 
                        />
                    ))}
                    {socialLinks.map((link, index) => (
                        <LinkIcon 
                            key={index}
                            icon={link.icon} 
                            text={link.text} 
                            href={link.href} 
                        />
                    ))}
                </>
            )}
        </div>
    )
}