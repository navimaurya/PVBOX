import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectChatList } from "../../redux/chat/chat-selector";
import ChatListItem from "../chat-list-item/chat-list-item.component";

const ChatList = ({ chatList, openChat, history }) => {
    return (
        <>  {chatList.length > 0 ?

            <ul className="contacts-list" id="chatContactTab" data-chat-list="">
                {/* <!-- Chat Item Start --> */}
                {

                    chatList.map(element => (
                        <ChatListItem key={element._id} {...element} />
                    ))

                }
                {/* <li className="contacts-item friends">
            <a className="contacts-link" href="./06cd7173__chat-1.html">
                <div className="avatar avatar-online">
                    <img src="/assets/media/avatar/e6935809__2.png" alt="" />
                </div>
                <div className="contacts-content">
                    <div className="contacts-info">
                        <h6 className="chat-name text-truncate">Catherine Richardson</h6>
                        <div className="chat-time">Just now</div>
                    </div>
                    <div className="contacts-texts">
                        <p className="text-truncate">I&#226;&#128;&#153;m sorry, I
                            didn&#226;&#128;&#153;t catch that. Could you please repeat?</p>
                    </div>
                </div>
            </a>
        </li> */}

            </ul>
            : <div style={{ height: "80vh", display: 'flex' }}>
                <div style={{
                    width: "fit-content",
                    margin: 'auto'
                }}>
                    <img src="/logo.png" alt="pvbox" style={{ width: '200px', height: 'auto' }} />
                    <Link to='/friends' className="text-center" style={{ border: '1px solid #000', padding: '4px', borderRadius: '50px', margin: '10px 0px', cursor: 'pointer', display: 'block' }}>
                        <span style={{ marginRight: '10px' }}>+</span>
                        <span>Start conversation</span>
                    </Link>

                </div>
            </div>
        }
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    chatList: selectChatList,
});

export default connect(mapStateToProps)(ChatList);