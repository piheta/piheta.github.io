export default function FolderIcon({ text, onClick, children }) {
    return (
        <div onClick={() => onClick('folder', text, children)} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px',
            minWidth: '80px',
            cursor: 'pointer'
        }}>
            <img src="/icons/folder.webp" alt="folder" style={{ width: '48px', height: '48px' }} />
            <span style={{
                fontSize: '11px',
                marginTop: '6px',
                textAlign: 'center',
                wordWrap: 'break-word',
                color: 'black'
            }}>{text}</span>
        </div>
    )
}
