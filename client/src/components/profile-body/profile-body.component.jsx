import React, { useState, useEffect } from "react";
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'
import Error from "../../components/error/error-component";
import { getLoggedInUserSuccess } from "../../redux/user/user-action";

const ProfileBody = ({ user, getLoggedInUserSuccess }) => {
    const [state, setState] = useState({
        name: "",
        dob: "",
        email: "",
        phone: "",
        website: "",
        city: "",
        ...user
    });
    const [passState, setPassState] = useState({
        currentPassword: "",
        password: "",
        passwordConfirm: "",
    });
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    // OnChange
    const onPassChange = (e) => {
        const { name, value } = e.target;
        setPassState({ ...passState, [name]: value });
    }
    const onPassReset = () => {
        setPassState({
            currentPassword: "",
            password: "",
            passwordConfirm: ""
        });
    }
    const onInfoChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const onInfoReset = (e) => {
        setState(user);
    }
    // Submit
    const onInfoSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(state);
            const { data } = await axios.post('/api/updateuser', {
                ...state
            })
            if (data.status == 'success') {
                setSuccess('Information updated.')
                getLoggedInUserSuccess(data.data)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    const onPassSubmit = async (e) => {
        try {
            e.preventDefault()
            if (passState.password !== passState.passwordConfirm || !passState.currentPassword || !passState.password || !passState.passwordConfirm) {
                return setError('Password not match.')
            }
            const { data } = await axios.post('/api/updatepassword', {
                ...passState
            })
            if (data.status == 'success') {
                setSuccess('Password updated.')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        const id = setInterval(() => {
            setError(null)
            setSuccess(null)
        }, 10000);
        return () => {
            clearInterval(id)
        }
    }, [])
    return (
        <div className="profile">
            {/* <div className="page-main-heading sticky-top py-2 px-3 mb-3">
            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none" type="button"
                data-close="">
                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </button>

            <div className="pl-2 pl-xl-0">
                <h5 className="font-weight-semibold">Settings</h5>
                <p className="text-muted mb-0">Update Personal Information &amp; Settings</p>
            </div>
        </div> */}

            <div className="container-xl px-2 px-sm-3">
                <div className="py-4 d-flex justify-content-center">
                    <div className="profile-img-c ">
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src={"/users/profile/" + user.image} alt=".." />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-1">Account</h6>
                                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                            </div>
                            <form onSubmit={onInfoSubmit}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="text" className="form-control form-control-md" id="firstName"
                                                    placeholder="Type your first name" name='name' value={state?.name} onChange={onInfoChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="mobileNumber">Mobile number</label>
                                                <input type="text" className="form-control form-control-md"
                                                    id="mobileNumber" placeholder="Type your mobile number" name='phone'
                                                    value={state?.phone} onChange={onInfoChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="birthDate">Birth date</label>
                                                <input type="text" className="form-control form-control-md" id="birthDate" name='dob'
                                                    placeholder="dd/mm/yyyy" value={moment(state?.dob).format("ll")} onChange={onInfoChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="emailAddress">Email address</label>
                                                <input type="email" className="form-control form-control-md"
                                                    id="emailAddress" placeholder="Type your email address" name='email'
                                                    value={state?.email} onChange={onInfoChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="city">City</label>
                                                <input type="text" className="form-control form-control-md" id="city" name='city'
                                                    placeholder="Type your city" value={state?.city} onChange={onInfoChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="webSite">Website</label>
                                                <input type="text" className="form-control form-control-md" id="webSite" name='website'
                                                    placeholder="Type your website" value={state?.website} onChange={onInfoChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button type="button" className="btn btn-link text-muted mx-1" onClick={onInfoReset}>Reset</button>
                                    <input type="submit" className="btn btn-primary" value={'Save Changes'} />
                                </div>
                            </form>
                        </div>

                        {/* <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-1">Social network profiles</h6>
                                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="facebookId">Facebook</label>
                                            <input type="text" className="form-control form-control-md" id="facebookId"
                                                placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="twitterId">Twitter</label>
                                            <input type="text" className="form-control form-control-md" id="twitterId"
                                                placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="instagramId">Instagram</label>
                                            <input type="text" className="form-control form-control-md" id="instagramId"
                                                placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="linkedinId">Linkedin</label>
                                            <input type="text" className="form-control form-control-md" id="linkedinId"
                                                placeholder="Username" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer d-flex justify-content-end">
                                <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                                <button type="button" className="btn btn-primary">Save Changes</button>
                            </div>
                        </div> */}

                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-1">Password</h6>
                                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                            </div>

                            <form onSubmit={onPassSubmit}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="current-password">Current Password</label>
                                                <input type="password" className="form-control form-control-md"
                                                    id="current-password" placeholder="Current password"
                                                    autocomplete="on" name="currentPassword" onChange={onPassChange} value={passState.currentPassword} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="new-password">New Password</label>
                                                <input type="password" className="form-control form-control-md"
                                                    id="new-password" placeholder="New password" autocomplete="off" name="password" onChange={onPassChange} value={passState.password} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="repeat-password">Repeat Password</label>
                                                <input type="password" className="form-control form-control-md"
                                                    id="repeat-password" placeholder="Repeat password" name="passwordConfirm"
                                                    autocomplete="off" onChange={onPassChange} value={passState.passwordConfirm} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button type="button" className="btn btn-link text-muted mx-1" onClick={onPassReset}>Reset</button>
                                    <input type="submit" name="submit" className="btn btn-primary" value='Update Password' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Picker onEmojiClick={() => { }} /> */}
            {
                error &&
                <Error>{error}</Error>
            }
            {
                success &&
                <Error type={true}>{success}</Error>
            }
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    getLoggedInUserSuccess: (data) => dispatch(getLoggedInUserSuccess(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBody);