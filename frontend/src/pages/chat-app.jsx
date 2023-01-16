import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_IS_TYPING, SOCKET_EVENT_STOP_TYPING } from '../services/socket.service'

export function ChatApp({ toyId, toyName }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(toyName)
    const [isBotMode, setIsBotMode] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    let botTimeout

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_IS_TYPING, setIsTyping)
        socketService.on(SOCKET_EVENT_STOP_TYPING, setIsTyping)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_IS_TYPING, setIsTyping)
            botTimeout && clearTimeout(botTimeout)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        newMsg.from = newMsg.from === loggedInUser?.fullname ? 'Me' : newMsg.from
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeout && clearTimeout(botTimeout)
        botTimeout = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function onIsTyping() {
        console.log('is typing...')
        socketService.emit(SOCKET_EVENT_IS_TYPING, { from: loggedInUser?.fullname, txt: 'is typing...' })
    }

    function onStopTyping() {
        console.log('stopped typing...')
        setTimeout( () => {

            
            socketService.emit(SOCKET_EVENT_STOP_TYPING, { from: loggedInUser?.fullname, txt: '' })}, 1000)
    }

    return (
        <section className="chat-app">
            <h2> {topic} chat</h2>

            {/* <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({target})=>setIsBotMode(target.checked)} />
                Bot Mode
            </label>

            <div>
                <label>
                    <input type="radio" name="topic" value="Love"
                        checked={topic === 'Love'} onChange={({target})=>setTopic(target.value)} />
                    Love
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Politics"
                        checked={topic === 'Politics'} onChange={({target})=>setTopic(target.value)} />
                    Politics
                </label> */}

            {/* </div> */}

            <form onSubmit={sendMsg}>
                <input className="chat-input"
                    type="text" placeholder="Write something" value={msg.txt} onChange={handleFormChange} onKeyDown={onIsTyping} onKeyUp={onStopTyping}
                    name="txt" autoComplete="off" />

                <button>Send</button>
                {isTyping?.txt && <span>{isTyping.from} : {isTyping.txt}</span>}
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}> <span className="chat-from">{msg.from}</span>: {msg.txt} <hr/></li>))}

            </ul>
        </section>
    )
}