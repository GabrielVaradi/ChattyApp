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
        name: 'Anonymous'
      },
      messages: [],
      notifications: [],
      usersOnline: '',
    }
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.webSocket = new WebSocket("ws://localhost:3001")
    this.changeUsername = this.changeUsername.bind(this);
    this.showNotification = this.showNotification.bind(this);


  }

  changeUsername(username) {

    const oldUsername = this.state.currentUser.name;
    const newUsername = {
      name: username
    }
    this.setState({
      currentUser: newUsername
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
    const newMessage = JSON.parse(message)
    const oldMessages = this.state.messages;
    const newMessages = [
      ...oldMessages, {
        username: newMessage.username.name,
        content: newMessage.text,
        id: newMessage.id
      }
    ];
    this.setState({
      messages: newMessages
    });

  }

  showNotification(message) {
    const data = JSON.parse(message)
    const notification = `${data.oldUsername} has changed their name to ${data.newUsername.name} `
    const oldNotifications = this.state.notifications
    const newNotifications = notification
        this.setState({
      notifications: [...oldNotifications, newNotifications]
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
          this.addMessage(event.data);
          break;
        case "incomingNotification":
          this.showNotification(event.data);
          break;
        case "clientsConnected":
        console.log(data);
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
        <MessageList messages={this.state.messages} notifications={this.state.notifications}/>
      <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} changeUsername={this.changeUsername}/>
      </div>
    );
  }
}

export default App;
