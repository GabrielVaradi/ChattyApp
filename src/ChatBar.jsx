   import React, {Component} from 'react';



class ChatBar extends Component {
  render() {

   const onSubmit = event => {
     event.preventDefault();
     const messageInput = event.target.elements.newMessage;
     this.props.sendMessage(messageInput.value);
     messageInput.value = "";
 };

    return (
      <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.currentUser}/>
      <form onSubmit={onSubmit}>
        <input type='text' name='newMessage' className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </form>

      </footer>
    );
  }
}



export default ChatBar;










