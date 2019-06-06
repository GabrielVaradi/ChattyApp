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
        name: 'Anonymous',
        color: '#000',
        id: '0'
      },
      messages: [],
      usersOnline: '',
    };
    this.webSocket = new WebSocket("ws://localhost:3001");
  };

  //Changes the username in the state
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
    //Send a notification to server
    const notification = {
      oldUsername: oldUsername,
      newUsername: newUsername,
      type: 'postNotification',
    };
    this.webSocket.send(JSON.stringify(notification));
  };

  //Sends a message to the server
  sendMessage = (message) => {
    const msg = {
      username: this.state.currentUser.name,
      text: message,
      type: 'postMessage',
      color: this.state.currentUser.color,
    };
    this.webSocket.send(JSON.stringify(msg));
  };

  //Update the message array in the state depending on if the content is a message or a notification
  updateContent = (content) => {
    const oldContent = this.state.messages;
    const newContent = [
      ...oldContent, content
    ];
    this.setState({
      messages: newContent
    })
  }

  //Adds a new message to the message array in the state
  addMessage = (message) => {
    const newMessages = {
      type: 'postMessage',
      username: message.username,
      content: message.text,
      id: message.id,
      color: message.color,
    };
    this.updateContent(newMessages)
  };

  //Adds a new notification to the message array in the state
  showNotification = (message) => {
    const notificationText = `${message.oldUsername} has changed their name to ${message.newUsername} `
    const newNotifications = {
      type: 'postNotification',
      content: notificationText,
      id: message.id
    };
    this.updateContent(newNotifications)

  };

  //Sets the current user info in the state
  userConnect = (data) => {
    this.setState({
      currentUser: {
        name: data.username,
        id: data.id,
        color: data.color,
      },
      usersOnline: data.number
    });
  };

  componentDidMount() {
    //Listens for an open server
    this.webSocket.addEventListener('open', function(event) {
      console.log('Client connected');
    });
    this.webSocket.addEventListener('error', function(error) {
      console.log('Error : ', error);
    });
    console.log("componentDidMount <App />");
    //When a message is coming from the server, call a function with the appropriate type
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
        default:
          throw new Error("Unknown event type " + data.type);
      };

    };
  };

  //Renders the page
  render() {
    return (
    <div>
      <NavBar usersOnline={this.state.usersOnline} currentUser={this.state.currentUser}/>
        <MessageList messages={this.state.messages}/>
      <ChatBar sendMessage={this.sendMessage} changeUsername={this.changeUsername} currentUser={this.state.currentUser.name}/>
      </div>
    );
  };
};

export default App;
