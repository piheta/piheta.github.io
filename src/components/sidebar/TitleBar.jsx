export default function TitleBar({ isTextFile, fileContent, onClose }) {
    return (
        <div style={{
            backgroundColor: '#0000a8',
            borderBottom: '1px solid #0000a8',
            marginTop: '0.4rem',
            marginLeft: '0.3rem',
            marginRight: '0.3rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 4px',
            color: 'white',
            fontSize: '11px',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", "Roboto", sans-serif',
            fontWeight: 'normal',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'unset'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <img
                    src="/icons/pcico.webp"
                    alt="icon"
                    style={{ width: '24px', height: '24px' }}
                />
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {isTextFile && fileContent ? 'Notepad' : 'My Computer (C:)'}
                </span>
            </div>
            <button onClick={onClose} style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black'
            }}>×</button>
        </div>
    )
}