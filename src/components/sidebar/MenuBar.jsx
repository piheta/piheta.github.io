export default function MenuBar() {
    return (
        <div style={{
            width: 'calc(100% - 0.6rem)',
            height: '20px',
            backgroundColor: '#c0c0c0',
            margin: '0 0.3rem',
            marginTop: '0.1rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", "Roboto", sans-serif'
        }}>
            <div style={{
                padding: '2px 8px',
                cursor: 'pointer',
                color: 'black'
            }}><u>F</u>ile</div>
            <div style={{
                padding: '2px 8px',
                cursor: 'pointer',
                color: 'black'
            }}><u>E</u>dit</div>
            <div style={{
                padding: '2px 8px',
                cursor: 'pointer',
                color: 'black'
            }}><u>V</u>iew</div>
            <div style={{
                padding: '2px 8px',
                cursor: 'pointer',
                color: 'black'
            }}><u>H</u>elp</div>
        </div>
    )
}