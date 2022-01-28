import React, { useState } from "react";
import { connect } from 'react-redux'


const MainLayout = ({ aside, children, visible }) => {
    // const [view, setView] = useState(false)
    return (
        <>
            {aside}
            <main className={`main ${visible ? 'main-visible' : ""}`}>
                {children}
            </main>
        </>
    )
}

const mapStateToProps = state => ({
    visible: state.ui.main
})

export default connect(mapStateToProps)(MainLayout);