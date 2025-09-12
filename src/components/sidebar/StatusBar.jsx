import { rootFiles, socialLinks } from '../../data/projectsData'

export default function StatusBar({ isTextFile, currentFolderContents }) {
    return (
        <div style={{
            position: 'absolute',
            bottom: '0.3rem',
            left: '0.3rem',
            right: '0.3rem',
            height: '20px',
            backgroundColor: '#c0c0c0',
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderRight: '1px solid white',
            borderBottom: '1px solid white',
            boxShadow: 'inset 1px 1px 0 black',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '8px',
            fontSize: '11px',
            color: 'black',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", "Roboto", sans-serif'
        }}>
            {!isTextFile && (
                currentFolderContents ?
                    `${currentFolderContents.length} object(s)` :
                    `${rootFiles.length + socialLinks.length + 1} object(s)` // +1 for Projects folder
            )}
        </div>
    )
}