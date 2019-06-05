import React, {Component} from 'react';
//Import child JSX file
import Message from './Message.jsx';

//Loops through the message array and sends the information to the child component Message
function MessageList({messages}) {
  const messageItems = messages.map(message => {
        return (
      <Message key={message.id} message={message} />
        )

    });
    return (
   <div>
     <div> {messageItems} </div>
   </div>
    );
};
export default MessageList;
