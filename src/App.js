import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

    constructor() {
        super()
        this.state ={
            messages: []
        }

    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({

            instanceLocator,
            userId: "Khosein",
            tokenProvider: new Chatkit.TokenProvider({
                    url: tokenUrl
            })

        })

        chatManager.connect()
        .then(currentUser => {
            currentUser.subscribeToRoom({
                roomId: 10484500,
                hooks: {
                    onNewMessage: message => {
                        console.log('message.text: ', message.text)
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        })
    }

    render() {
        console.log(this.state.messages)
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default App