import React, {useState} from "react";
import './Style.css'
import {Button, Container} from "react-bootstrap";
import api from "./Api";
import Message from "./components/Message";

let countId = 0;

const Chat = () => {
    const [text, setText] = useState('')
    const [fetching, setFetching] = useState(false);
    const [chat] = useState([]);

    function data (id, role, message) {
        let time = new Date()
        return {
            id: id,
            role: role,
            message: message,
            data: time.getHours() + ":" + time.getMinutes()
        }

    }

    function sendMessage () {
        chat.push(data(++countId, "user", text))
        setFetching(true)
        api.post('', {
            text: text
        })
            .then(r => (chat.push(data(++countId, "bot", r.data['response']))))
            .finally(() => setFetching(false))
        setText("")
    }

    function handleKeyPress (event) {
        if (event.key === "Enter") {
          sendMessage()
        }
    }

    return (
        <Container className='App'>
            <Container className='Container'>
                <Container className='Header'>
                </Container>
                <Container className='Chat'>

                    {chat.map(
                        (message) =>
                        <Message
                            id={message['id']}
                            role={message['role']}
                            message={message['message']}
                            date={message['data']}
                        />)
                    }

                    {fetching &&
                       <Message
                            id={"carregando"}
                            role={"bot"}
                            message={"Carregando ..."}
                        />
                    }

                </Container>
                <Container className='Input' >
                    <input value={text} onChange={event => {setText(event.target.value)}} onKeyDown={event => handleKeyPress(event)} type={"text"}/>
                    <Button onClick={() => sendMessage()}> SEND </Button>
                </Container>
            </Container>
        </Container>
    )
}

export default Chat;
