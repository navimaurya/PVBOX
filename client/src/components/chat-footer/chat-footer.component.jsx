import React, { useState, useEffect, useRef } from "react";
import { FileIcon, defaultStyles } from 'react-file-icon';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { chatSendStart } from "../../redux/chat/chat-action";
import { selectOpenChatFriend } from "../../redux/opend-chat/open-chat-selector";
import Picker from 'react-emojipicker'

import './chat-footer.style.css'

const ChatFooter = ({ openFriend, chatSendStart }) => {
    const ref = useRef(null)
    const [fileState, setFileState] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState('message');
    const [isEmoOpen, setIsEmoOpen] = useState(false)
    const onTextAreaChangeHandler = (e) => {
        setMessage(e.target.value);
    }
    const addEmoj = (e) => {
        ref.current.value = ref.current.value + e.unicode;
        setMessage(ref.current.value)
    }
    useEffect(() => {

    }, [message, fileState])
    const oSubmitHandler = (e) => {
        e.preventDefault();
        setIsEmoOpen(false)
        if (!message) return;
        chatSendStart({ receiver: openFriend._id, message, openFriend, messageType, file: fileState });
        ref.current.value = ""
    }
    const getFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ((event) => {
            setFileState(event.target.result);
            setMessageType('file');
        })
        const form = new FormData();
        form.append('file', file)
        setFileState(file);
        setMessageType('file');
        console.log(form, file);
        console.log(e, "File Change log");
    }
    const clearFileMessage = () => {
        setFileState(null);
        setMessageType('message');
    }
    return (
        <div className="chat-footer text-center" style={{
            display: 'flex', flexDirection: 'row', padding: "5px 5px", backgroundColor: '#d7d7d757',
            border: '1px solid #05030e1f',
            position: "relative"
        }}>
            {
                fileState ?
                    <div style={{
                        padding: '15px 10px 15px 10px',
                        width: '100%',
                        backgroundColor: '#666',
                        position: "absolute",
                        top: '-154%',
                        background: '#d7d7d7',
                        borderRadius: '10px 10px 0px 0px',
                        borderTop: '4px solid #665dfe',
                        maxHeight: '100px'

                    }}>
                        <button className="btn btn-danger position-absolute" style={{ right: '10px' }} onClick={clearFileMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                            </svg>
                        </button>
                        <div className="d-flex align-items-center">
                            <div style={{ minWidth: '50px', minHeight: '50px', height: '55px', width: '55px' }}>
                                <FileIcon extension={fileState.type.split('/')[0]} {...defaultStyles[fileState.type.split('/')[0]]} />
                            </div>
                            <div className="text-left">
                                <span className="ml-2 text-truncate">{fileState.name}</span>
                                <br />
                                <span className="ml-2 text-truncate">{Number(fileState.size / (1024 * 1024)).toFixed(1)}MB</span>
                            </div>
                        </div>
                    </div>
                    : <></>
            }
            <div className="attachment" style={{
                padding: '2px',
                position: "initial",
                width: "5%",
            }}>

                {
                    null ?
                        <div className="dropdown">
                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm mx-auto" type="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>

                                {/* <!-- <img className="injectable hw-20" src=".//assets/media/heroicons/outline/plus-circle.svg" alt=""/> --> */}
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                    <label htmlFor="gallery">
                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        {/* <!-- <img className="injectable hw-20 mr-2" src=".//assets/media/heroicons/outline/photograph.svg" alt=""/> --> */}
                                        <span>Gallery</span>
                                    </label>
                                </a>
                                <input className="d-none" onChange={getFile} type="file" id='gallery' />
                                <a className="dropdown-item" href="#">
                                    <label htmlFor="audio">
                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z">
                                            </path>
                                        </svg>
                                        {/* <!-- <img className="injectable hw-20 mr-2" src=".//assets/media/heroicons/outline/volume-up.svg" alt=""/> --> */}
                                        <span>Audio</span>
                                    </label>
                                    <input className="d-none" onChange={getFile} type="file" accept="audio/mpeg,audio/ogg,audio/wav,audio/mp3" id='audio' />
                                </a>
                                <a className="dropdown-item" href="#">
                                    <label htmlFor="docpicker">
                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                                            </path>
                                        </svg>

                                        {/* <!-- <img className="injectable hw-20 mr-2" src=".//assets/media/heroicons/outline/document.svg" alt=""/> --> */}
                                        <span>Document</span>
                                    </label>
                                </a>
                                <input className="d-none" onChange={getFile} type="file" id="docpicker"
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                                {/* <a className="dropdown-item" href="#">
                            <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                </path>
                            </svg>
                            <span>Contact</span>
                        </a> */}
                                {/* <a className="dropdown-item" href="#">
                            <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Location</span>
                        </a> */}
                                {/* <a className="dropdown-item" href="#">
                            <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            <span>Poll</span>
                        </a> */}
                            </div>
                        </div>
                        : <div style={{
                            position: 'absolute',
                            bottom: "110%"
                        }}>
                            {isEmoOpen && <Picker onEmojiSelected={addEmoj} />}
                        </div>}
                <button className="pt-2 ml-2 btn" onClick={() => setIsEmoOpen(!isEmoOpen)}>😀</button>
            </div>
            <form onSubmit={oSubmitHandler} style={{ width: "92%", position: 'relative' }} autocomplete="off">
                <div style={{
                    display: 'flex',
                    width: '100%'
                }}>
                    <div style={{ width: '-webkit-fill-available' }}>
                        <input onChange={onTextAreaChangeHandler} ref={ref} className="emojionearea-form-control message-input" id="messageInput" rows="1"
                            placeholder="Type your message here..." />
                    </div>
                    <div style={{ width: '3rem', height: '3rem' }}>
                        <button className="btn btn-primary btn-icon send-icon rounded-circle text-light mb-1" style={{ top: 0, right: 0 }}>
                            <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

const mapDispatchToProps = dispatch => ({
    chatSendStart: (data) => dispatch(chatSendStart(data))
})
const mapStateToProps = createStructuredSelector({
    openFriend: selectOpenChatFriend,
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);