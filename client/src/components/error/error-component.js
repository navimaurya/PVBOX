import React from "react"
const Error = ({ error }) => {
    return (
        <div style={{ maxWidth: '500px', position: 'fixed', bottom: '60px', right: '0px', padding: '14px 15px', zIndex: 1000, background: '#e5431f', color: '#fff', borderLeft: '10px solid #11033a', borderRadius: '7px 0px 0px 7px', }}>
            {error}
        </div>
    )
}

export default Error
