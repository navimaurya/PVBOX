import React from "react"
import { connect } from "react-redux"
import { mainToggle } from "../../redux/ui/ui-action"

const MainToggleButton = ({ toggleMain }) => {
    return (
        <button className="btn btn-secondary btn-icon btn-minimal btn-sm d-xl-none" type="button"
            data-close="" onClick={toggleMain}>
            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            {/* <!-- <img className="injectable hw-20" src=".//assets/media/heroicons/outline/arrow-left.svg" alt=""/> --> */}
        </button>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleMain: () => dispatch(mainToggle())
})
export default connect(null, mapDispatchToProps)(MainToggleButton)
