import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addNewFriendStart } from "../../redux/friends/friend-action";
import Button from "../custom-button/custom-button.component";
// import { addFriendtoggle } from "../../redux/ui/ui-action";

import './addFriend.style.css'

// const AddFriend = ({addFriendtoggle, uiDisplay}) =>(
const AddFriend = ({ addNewFriend }) => {
    const [state, setState] = useState({ username: '', message: '' });
    const [suggestions, setSuggestions] = useState([])
    const fetchFriend = async (value) => {
        if (value.length < 2) {
            return
        }
        try {
            const { data } = await axios.get(`/api/getfriend?userid=${value}`)
            if (data.status == 'success') {
                console.log(data.data);
                setSuggestions(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const onChangeHandler = async (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        fetchFriend(value)
    }

    const onSubmitHandler = (username) => {
        if (!username) return
        addNewFriend(username);
    }


    return (
        <div className="modal modal-lg-fullscreen fade show" id="inviteOthers" tabIndex="-1" role="dialog" aria-labelledby="inviteOthersLabel" style={{ display: "none", backgroundColor: '#07204ec2' }} aria-modal="true">
            {/* <div className="modal modal-lg-fullscreen fade show" id="inviteOthers" tabIndex="-1" role="dialog" aria-labelledby="inviteOthersLabel" style={{ display: uiDisplay ? 'block' : 'none', backgroundColor: '#07204ec2'}} aria-modal="true"> */}
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="inviteOthersLabel">Request</h5>

                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body hide-scrollbar">
                        <form autocomplete="off">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="inviteEmailAddress">Username</label>
                                        <input type="text" onChange={onChangeHandler} value={state.username} name='username' className="form-control form-control-md" id="inviteEmailAddress" placeholder="Type email, username or phone number" />
                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="inviteMessage">Request message</label>
                                        <textarea onChange={onChangeHandler} value={state.message} name='message' className="form-control form-control-md no-resize hide-scrollbar" id="inviteMessage" placeholder="Write your message here" rows="3" />
                                    </div>
                                </div> */}
                            </div>
                        </form>
                        <div>
                            <ul class="list-group" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                                {
                                    suggestions.map((item, i) => (
                                        <li class="list-group-item d-flex justify-content-between align-items-start" key={i}>
                                            <div class="ms-2 me-auto row w-100 ">
                                                <div className="col-2 text-center" style={{ maxWidth: '100px' }}>
                                                    <div className="d-inline text-center">
                                                        <img className="d-inline" src={item.image} alt="user" style={{ height: '50px', width: '50px', borderRadius: '50%', border: '1px solid ##07204ec2', marginRight: '10px' }} />
                                                    </div>
                                                </div>
                                                <div className="col-7"><div class="fw-bud d-inline">{item.name}</div><br />
                                                    <span className="list-username">
                                                        @{item.username}
                                                    </span>
                                                </div>
                                                <div className="col-3 text-center">
                                                    <Button style={{ minWidth: '100px', padding: '10px 0px' }} onClick={() => onSubmitHandler(item.username)} >ADD</Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link text-muted" data-dismiss="modal">Close</button>
                        {/* <button type="button" onClick={onSubmitHandler} className="btn btn-primary">Send</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    addFriend: state.ui.addFriend
});
const mapDispatchToProps = dispatch => ({
    addNewFriend: (user) => dispatch(addNewFriendStart(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(AddFriend));
