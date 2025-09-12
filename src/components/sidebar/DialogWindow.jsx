export default function DialogWindow({ showDialog, isMobile, children }) {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${showDialog ? 1 : 0})`,
            width: isMobile ? '90%' : '80%',
            height: isMobile ? '90%' : '60%',
            backgroundColor: '#c0c0c0',
            borderTop: '2px solid white',
            borderLeft: '2px solid white',
            borderRight: '2px solid black',
            borderBottom: '2px solid black',
            transition: showDialog ? 'transform 0.2s cubic-bezier(0.175, 0.9, 0.32, 1.275)' : 'none'
        }}>
            {children}
        </div>
    )
}