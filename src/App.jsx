import React, {
  Component
} from 'react';
//Import child JSX files
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

//Create the parent class
class App extends Component {
  constructor(props) {
    //Set the state and creates a new webSocket
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous'
      },
      messages: [],
      usersOnline: '',
      webSocket: '',
    };
    this.webSocket = new WebSocket("ws://localhost:3001");
  };
  changeUsername = (username) => {
    const oldUsername = this.state.currentUser.name;
    const newUsername = username;
    //Change the username
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        name: newUsername
      }
    });
    //Send a notification to every user
    const notification = {
      oldUsername: oldUsername,
      newUsername: newUsername,
      type: 'postNotification',
    };
    this.webSocket.send(JSON.stringify(notification));
  }
  //Sends a message to the server
  sendMessage = (message) => {
    const msg = {
      username: this.state.currentUser,
      text: message,
      type: 'postMessage',
      color: this.state.currentUser.color,
    };
    this.webSocket.send(JSON.stringify(msg));
  };
  //Adds a new message to the message array in the state
  addMessage = (message) => {
    const oldMessages = this.state.messages;
    const newMessages = [
      ...oldMessages, {
        type: 'postMessage',
        username: message.username.name,
        content: message.text,
        id: message.id,
        color: message.color,
      }
    ];
    this.setState({
      messages: newMessages,
    });
  };
  //Adds a new notification to the message array in the state
  showNotification = (message) => {
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
  };
  //Updates the users count in the state
  numberOfUser = (data) => {
    this.setState({
      usersOnline: data.number
    });
  };
  //Sets the current user info in the state
  userConnect = (data) => {
    this.setState({
      currentUser: {
        name: data.username,
        id: data.id,
        color: data.color,
      }
    });
  };

  componentDidMount() {
    //Listens for an open server
    this.webSocket.addEventListener('open', function(event) {});
    this.webSocket.addEventListener('error', function(event) {
      console.log(event);
    });
    //Sets the current webSocket in the state
    this.setState({
      webSocket: this.webSocket
    });
    console.log("componentDidMount <App />");
    //When a message is coming from the server
    this.webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "incomingMessage":
          this.addMessage(data);
          break;
        case "incomingNotification":
          this.showNotification(data);
          break;
        case "incomingClientInfo":
          this.userConnect(data);
          break;
        case "clientsConnected":
          this.numberOfUser(data);
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      };

    };
  };

  render() {
    return (
    <div>
      <NavBar usersOnline = {this.state.usersOnline}/>
        <MessageList messages={this.state.messages}/>
      <ChatBar sendMessage={this.sendMessage} changeUsername={this.changeUsername}/>
      </div>
    );
  };
};

export default App;
