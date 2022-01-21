import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { isMobile } from 'react-device-detect';

import LocationOn from '@material-ui/icons/LocationOn'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import IconButton from "@material-ui/core/IconButton"
// import MicOffIcon from '@mui/icons-material/MicOff';
// import MicIcon from '@mui/icons-material/Mic';
// import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import Mic from "@material-ui/icons/Mic"
import MicOff from "@material-ui/icons/MicOff"
import Video from "@material-ui/icons/Videocam"
import VideoOff from "@material-ui/icons/VideocamOff"

import Peer from "simple-peer"
import io from "socket.io-client"
import './call-wdget.style.css'

import { clientIdSendStart, incomingCallStart, outgoingCallStart, disconnetCall, answerCall } from "../../redux/calling/calling-action"

const socket = io.connect('http://:5000')
// const socket = io.connect('http://localhost:5000')
// const socket = io.connect(process.env.PROXY_URL)

// import CallDialog from '../../components/call-dialog/call-dialog.component'

const CallWidget = ({ updateClientId, incomingCall, outgoingCall, incomingCallStart, outgoingCallStart, disconnetCall, currentUser, incall, answer }) => {
    const [localStream, setlocalStream] = useState(null)
    const [media, setMedia] = useState(true)
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [friend, setFriend] = useState({})
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    //  UI
    const [isMin, setIsMin] = useState(false);
    const minmize = () => setIsMin(!isMin)

    const camOff = () => {
        setMedia(false)
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    useEffect(() => {
        if ((outgoingCall || incall) && media) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                setlocalStream(stream)
                setStream(stream)
                if (outgoingCall || incall) {
                    myVideo.current.srcObject = stream
                }
            })
        } else {
            // if (localStream) {
            //     const track = localStream.getTracks()[1]
            //     track.stop();
            //     // localStream.getTracks()[0].stop();
            // }
        }
        setFriend(incall)
        setIdToCall(outgoingCall?.socketId);
        // return () => {
        //     camOff()
        // };
    }, [incomingCall, outgoingCall, incall, idToCall, friend])

    useEffect(() => {

        socket.on("me", (id) => {
            updateClientId(id)
            setMe(id);
        })

        socket.on("callUser", (data) => {
            console.log(data);
            setReceivingCall(true)
            setCaller(data.from)
            setFriend(data)
            setCallerSignal(data.signal)
            incomingCallStart({ socketId: data.from, ...data })
        })
        // 
        setIdToCall(outgoingCall?.socketId);
        setFriend(outgoingCall);
        callUser(idToCall)
    }, [])


    // Outgoing
    const callUser = (id) => {
        console.log(id);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: currentUser?.name,
                username: currentUser?.username,
                active: currentUser?.active,
                city: currentUser?.city,
                image: currentUser?.image,
                _id: currentUser?._id
            })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
        connectionRef.current = peer
    }

    const answerCall = () => {
        answer();
        // setFriend(incomingCall)
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        camOff()
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        disconnetCall();
    }

    return (
        <>
            {
                // incomingCall || outgoingCall ?
                incall || outgoingCall || incall ?
                    <div className={`vid-max ${isMin ? 'vid-min' : ''}`} style={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        zIndex: 10000,
                        backgroundColor: '#333',
                        display: 'block',
                        padding: '20px'
                    }}>
                        {/* <div className="container"> */}
                        <div className="video-container" >
                            <div className="info-c">
                                <h1>{friend?.name || 'Unknown'}</h1>
                                <p><AlternateEmail />{' '}{friend?.username || 'Unknown'}</p>
                                <p><LocationOn />{' '}{friend?.city || 'Unknown'}</p>
                            </div>
                            <div className="minimize-c" onClick={minmize}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                </svg>
                            </div>
                            {/* <div className="video">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                    </div> */}
                            {/* <div className="video"> */}
                            {callAccepted && !callEnded ?
                                <video className="video" playsInline ref={userVideo} autoPlay />
                                : stream && <video className="video" playsInline muted ref={myVideo} autoPlay />
                            }
                            {/* </div> */}
                            <div className="video-btn-container">
                                <span className="full-screen-btn" onClick={minmize}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                                    </svg></span>
                                <div className="video-btn-container-inner">
                                    <div className="d-flex align-items-center" >
                                        {/* <IconButton color="primary mr-2" aria-label="call" onClick={() => callUser(idToCall)}>
                                            <Mic fontSize="large" style={{ color: '#fff' }} />
                                        </IconButton> */}

                                    </div>
                                    {/* <IconButton color=" mx-2" aria-label="call" onClick={() => callUser(idToCall)}>
                                        <PhoneIcon fontSize="large" style={{ color: 'yellow' }} />
                                    </IconButton> */}
                                    {receivingCall && !callAccepted ? (
                                        <div id="b-g">
                                            <div id="container">
                                                <div class="item">
                                                    <IconButton color=" mx-2" aria-label="call" onClick={answerCall}>
                                                        <PhoneIcon fontSize="large" style={{ color: '#fff' }} />
                                                    </IconButton>
                                                </div>
                                                <div class="circle-x green-bg" ></div>
                                                <div class="circle r-c" style={{ animationDelay: "0s" }}></div>
                                                <div class="circle" style={{ animationDelay: "0.2s" }}></div>
                                                <div class="circle" style={{ animationDelay: "0.5s" }}></div>
                                                <div class="circle" style={{ animationDelay: "0.9s" }}></div>
                                            </div>
                                        </div>)

                                        :
                                        <div id="outerContainer">
                                            <div id="container">
                                                <div class="item">
                                                    <IconButton color=" mx-2" aria-label="call" onClick={leaveCall}>
                                                        <PhoneIcon fontSize="large" style={{ color: '#fff' }} />
                                                    </IconButton>
                                                </div>
                                                <div class="circle-br"></div>

                                            </div>
                                        </div>

                                    }
                                    <div className="d-flex align-items-center">
                                        {/* <IconButton color="primary ml-2" aria-label="call" onClick={camOff} >
                                            <Video fontSize="large" style={{ color: '#fff' }} />
                                        </IconButton> */}

                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* <div className="myId">
                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />
                    <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                        <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                            Copy ID
                        </Button>
                    </CopyToClipboard>

                    <TextField
                        id="filled-basic"
                        label="ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </Button>
                        ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                <PhoneIcon fontSize="large" />
                            </IconButton>
                        )}
                        {idToCall}
                    </div>
                </div> */}
                        {/* <div>
                            {receivingCall && !callAccepted ? (
                                <div className="caller">
                                    <h1 >{name} is calling...</h1>
                                    <Button variant="contained" color="primary" onClick={answerCall}>
                                        Answer
                                    </Button>
                                </div>
                            ) : null}
                        </div> */}
                        {/* </div> */}
                    </div>
                    : incomingCall ?
                        <div className='call-pop'>
                            <div className='heading'>
                                <h4>Navneet</h4>
                            </div>
                            <div className="btn-c">
                                <button className='btn btn-success' onClick={answerCall} > <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill text-white" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>{' '} </span> Answer</button>
                                <button className='btn btn-danger' onClick={leaveCall} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-x-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                                </svg> Drop</button>
                            </div>
                        </div>
                        : null
            }
        </>
    )
}

const mapStateToProps = state => ({
    incomingCall: state.call.incomingcall,
    outgoingCall: state.call.outgoingcall,
    incall: state.call.incall,
    currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
    updateClientId: (id) => dispatch(clientIdSendStart(id)),
    incomingCallStart: user => dispatch(incomingCallStart(user)),
    outgoingCallStart: user => dispatch(outgoingCallStart(user)),
    disconnetCall: () => dispatch(disconnetCall()),
    answer: () => dispatch(answerCall())
})

export default connect(mapStateToProps, mapDispatchToProps)(CallWidget);

// const NameBanner = () = {
//     return(
//          <div className = "info-c" >
//             <h1>{friend?.name || 'Unknown'}</h1>
//             <p><AlternateEmail />{' '}{friend?.username || 'Unknown'}</p>
//             <p><LocationOn />{' '}{friend?.city || 'Unknown'}</p>
//         </div >
//     )
// }
// export NameBanner