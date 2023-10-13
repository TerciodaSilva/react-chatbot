import React from "react";
import {Container, Image} from "react-bootstrap";

export default function Message({id, role, message, date}) {

    let typeMessage = role==="bot"? "Bot" : "User"
    const imgUser = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    const imgBot = "https://cdn-icons-png.flaticon.com/512/4712/4712009.png"

    let img = role==="bot"? imgBot : imgUser;

    return (
        <Container key={id} className={"Message " + typeMessage }>
            <Container className='Profile'>
                <Image src={img}/>
            </Container>
            <Container className='Data'>
                <Container className='Info'>
                    <p>{message}</p>
                </Container>
                <Container className='Time'>
                    <p>{date}</p>
                </Container>
            </Container>
        </Container>
    )
}