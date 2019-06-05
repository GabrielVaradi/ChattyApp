   import React, {Component} from 'react';



class ChatBar extends Component {
  render() {

   const onSubmitMessage = event => {
     event.preventDefault();
     const messageInput = event.target.elements.newMessage;
     this.props.sendMessage(messageInput.value);
     messageInput.value = "";
 };

    const onSubmitName = event => {
     event.preventDefault();
     const usernameInput = event.target.elements.newUsername;
     this.props.changeUsername(usernameInput.value);
 };



    return (
      <footer className="chatbar">
      <form onSubmit={onSubmitName}>
      <input className="chatbar-username" name="newUsername" placeholder='Anonymous'/>
      </form>
      <form onSubmit={onSubmitMessage}>
        <input type='text' name='newMessage' className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </form>
      </footer>
    );
  }
}



export default ChatBar;










