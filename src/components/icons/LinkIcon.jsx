export default function LinkIcon({ icon, text, href }) {
    const handleClick = () => {
        window.open(href, '_blank', 'noopener,noreferrer')
    }

    return (
        <div onClick={handleClick} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px',
            minWidth: '80px',
            cursor: 'pointer'
        }}>
            <img src={icon} alt={text} style={{ width: '48px', height: '48px' }} />
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
