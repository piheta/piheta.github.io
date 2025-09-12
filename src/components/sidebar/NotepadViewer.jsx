export default function NotepadViewer({ fileContent }) {
    return (
        <div
            style={{
                fontFamily: 'Courier, monospace',
                fontSize: '12px',
                margin: 0,
                padding: '4px',
                width: '100%',
                height: '100%',
                color: 'black'
            }}
            dangerouslySetInnerHTML={{ __html: fileContent }}
        />
    )
}