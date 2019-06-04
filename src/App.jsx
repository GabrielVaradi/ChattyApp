
import React, {
  Component
} from 'react';
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous',
        id: null,
        color: '#000'
      },
        messages: [],
      usersOnline: '',
    }
    this.webSocket = new WebSocket("ws://localhost:3001")
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.showNotification = this.showNotification.bind(this);


  }

  changeUsername(username) {

    const oldUsername = this.state.currentUser.name;
    const newUsername = username
    this.setState({
      currentUser: {
        name: newUsername
      }
    });
    const notification = {
      oldUsername: oldUsername,
      newUsername: newUsername,
      type: 'postNotification',
    }

    this.webSocket.send(JSON.stringify(notification))
  }


  sendMessage(message) {
    const msg = {
      username: this.state.currentUser,
      text: message,
      type: 'postMessage'
    };

    this.webSocket.send(JSON.stringify(msg));

  }

  addMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [
      ...oldMessages, {
        type: 'postMessage',
        username: message.username.name,
        content: message.text,
        id: message.id,
      }
    ];
    this.setState({
        messages: newMessages,


    });

  }

  showNotification(message) {
    const notificationText = `${message.oldUsername} has changed their name to ${message.newUsername} `
    const oldNotifications = this.state.messages
    const newNotifications = [
      ...oldNotifications, {
        type: 'postNotification',
        content: notificationText,
        id: message.id
      }
    ];
    this.setState({

        messages: newNotifications,


    });
  }
  addUser(data) {
    this.setState({
      usersOnline: data.number
    });
  }


  componentDidMount() {
    this.webSocket.addEventListener('open', function(event) {});
    this.webSocket.addEventListener('error', function(event) {
      console.log(event)
    })
    this.setState({
      webSocket: this.webSocket
    })
    console.log("componentDidMount <App />");
    this.webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch (data.type) {
        case "incomingMessage":
          this.addMessage(data);
          break;
        case "incomingNotification":
          this.showNotification(data);
          break;
        case "clientsConnected":
          this.addUser(data);
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }

    }
  }
render() {
    return (
    <div>
      <NavBar usersOnline = {this.state.usersOnline}/>
        <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} changeUsername={this.changeUsername}/>
      </div>
    );
  }
}

export default App;
