export default function FileIcon({ type, text, onClick }) {
    return (
        <div onClick={() => onClick(type, text)} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px',
            minWidth: '80px',
            cursor: 'pointer'
        }}>
            <img src={`/icons/${type}.webp`} alt={type} style={{ width: '48px', height: '48px' }} />
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
