import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const notifications = this.props.notifications
    const messageItems = this.props.messages.map(message => {
      if(message.type === 'postMessage'){
        return (
      <Message key = {message.id} message={message} notification=''/>
        )
      }
      else if (message.type === 'postNotification'){
        return (
      <Message key = {message.id} message='' notification={message.content}/>
        )

      }


    });
    return (
   <div>
     <div> {messageItems} </div>
   </div>
    );
  }
}
export default MessageList;
