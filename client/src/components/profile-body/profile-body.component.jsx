import React from "react";

const ProfileBody = () => (
    <div className="profile">
        <div className="page-main-heading sticky-top py-2 px-3 mb-3">

            {/* <!-- Chat Back Button (Visible only in Small Devices) --> */}
            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none" type="button"
                data-close="">
                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                {/* <!-- <img className="injectable hw-20" src=".//assets/media/heroicons/outline/arrow-left.svg" alt=""/> --> */}
            </button>

            <div className="pl-2 pl-xl-0">
                <h5 className="font-weight-semibold">Settings</h5>
                <p className="text-muted mb-0">Update Personal Information &amp; Settings</p>
            </div>
        </div>

        <div className="container-xl px-2 px-sm-3">
            <div className="row">
                <div className="col">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h6 className="mb-1">Account</h6>
                            <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control form-control-md" id="firstName"
                                            placeholder="Type your first name" value="Catherine" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control form-control-md" id="lastName"
                                            placeholder="Type your last name" value="Richardson" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="mobileNumber">Mobile number</label>
                                        <input type="text" className="form-control form-control-md"
                                            id="mobileNumber" placeholder="Type your mobile number"
                                            value="+01-222-364522" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="birthDate">Birth date</label>
                                        <input type="text" className="form-control form-control-md" id="birthDate"
                                            placeholder="dd/mm/yyyy" value="20/11/1992" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">Email address</label>
                                        <input type="email" className="form-control form-control-md"
                                            id="emailAddress" placeholder="Type your email address"
                                            value="catherine.richardson@gmail.com" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="webSite">Website</label>
                                        <input type="text" className="form-control form-control-md" id="webSite"
                                            placeholder="Type your website" value="www.catherichardson.com" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="Address">Address</label>
                                        <input type="text" className="form-control form-control-md" id="Address"
                                            placeholder="Type your address"
                                            value="1134 Ridder Park Road, San Fransisco, CA 94851" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer d-flex justify-content-end">
                            <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                            <button type="button" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>

                    <div className="card mb-3">
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
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">
                            <h6 className="mb-1">Password</h6>
                            <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                        </div>

                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="current-password">Current Password</label>
                                            <input type="password" className="form-control form-control-md"
                                                id="current-password" placeholder="Current password"
                                                autocomplete="on" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="new-password">New Password</label>
                                            <input type="password" className="form-control form-control-md"
                                                id="new-password" placeholder="New password" autocomplete="off" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="repeat-password">Repeat Password</label>
                                            <input type="password" className="form-control form-control-md"
                                                id="repeat-password" placeholder="Repeat password"
                                                autocomplete="off" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer d-flex justify-content-end">
                            <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                            <button type="button" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">
                            <h6 className="mb-1">Privacy</h6>
                            <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                        </div>

                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush list-group-sm-column">

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Profile Picture</p>
                                            <p className="small text-muted mb-0">Select who can see my profile
                                                picture</p>
                                        </div>
                                        <div className="dropdown mr-2">
                                            <button className="btn btn-outline-default dropdown-toggle"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Public
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Public</a>
                                                <a className="dropdown-item" href="#">Friends</a>
                                                <a className="dropdown-item" href="#">Selected Friends</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Last Seen</p>
                                            <p className="small text-muted mb-0">Select who can see my last seen</p>
                                        </div>
                                        <div className="dropdown mr-2">
                                            <button className="btn btn-outline-default dropdown-toggle"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Public
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Public</a>
                                                <a className="dropdown-item" href="#">Friends</a>
                                                <a className="dropdown-item" href="#">Selected Friends</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Groups</p>
                                            <p className="small text-muted mb-0">Select who can add you in groups
                                            </p>
                                        </div>
                                        <div className="dropdown mr-2">
                                            <button className="btn btn-outline-default dropdown-toggle"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Public
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Public</a>
                                                <a className="dropdown-item" href="#">Friends</a>
                                                <a className="dropdown-item" href="#">Selected Friends</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Status</p>
                                            <p className="small text-muted mb-0">Select who can see my status
                                                updates</p>
                                        </div>
                                        <div className="dropdown mr-2">
                                            <button className="btn btn-outline-default dropdown-toggle"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Public
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Public</a>
                                                <a className="dropdown-item" href="#">Friends</a>
                                                <a className="dropdown-item" href="#">Selected Friends</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Read receipts</p>
                                            <p className="small text-muted mb-0">If turn off this option you won't
                                                be able to see read recipts</p>
                                        </div>
                                        <div className="custom-control custom-switch mr-2">
                                            <input type="checkbox" className="custom-control-input"
                                                id="readReceiptsSwitch" checked />
                                            <label className="custom-control-label"
                                                htmlFor="readReceiptsSwitch">&#160; </label>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>

                        <div className="card-footer d-flex justify-content-end">
                            <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                            <button type="button" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">
                            <h6 className="mb-1">Security</h6>
                            <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                        </div>

                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush list-group-sm-column">
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Use two-factor authentication</p>
                                            <p className="small text-muted mb-0">Ask for a code if attempted login
                                                from an unrecognised device or browser.</p>
                                        </div>
                                        <div className="custom-control custom-switch mr-2">
                                            <input type="checkbox" className="custom-control-input"
                                                id="twoFactorSwitch" checked />
                                            <label className="custom-control-label"
                                                htmlFor="twoFactorSwitch">&#160; </label>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Get alerts about unrecognised logins</p>
                                            <p className="small text-muted mb-0">You will be notified if anyone logs
                                                in from a device or browser you don't usually use</p>
                                        </div>
                                        <div className="custom-control custom-switch mr-2">
                                            <input type="checkbox" className="custom-control-input"
                                                id="unrecognisedSwitch" checked />
                                            <label className="custom-control-label"
                                                htmlFor="unrecognisedSwitch">&#160; </label>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>

                        <div className="card-footer d-flex justify-content-end">
                            <button className="btn btn-link text-muted mx-1">Reset</button>
                            <button className="btn btn-primary" type="button">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ProfileBody;