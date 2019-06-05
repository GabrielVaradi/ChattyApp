import React, {Component} from 'react';

//Display the messages
function Message(props) {
  const message = props.message;
  //Styling for the notifications
  const notificationStyle = {
    fontStyle: 'italic',
    fontWeight: 'bold',
  };
  //Styling for the messages
  const messageStyle = {
    color: message.color,
  };
  //Styling for the images
  const imageStyle = {
    maxWidth: '60%',
    maxHeight: '60%'
  };
  //RegEx to match an URL ending with jpb, gif or png
  const matchImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  //If the message type is postMessage
  const isMessage = message.type === 'postMessage' ? messageStyle : null;
  //If the message type is postNotification
  const isNotification = message.type === 'postNotification' ? notificationStyle : null;

    return (
      <main className="messages">

      <div className="message">
        <span style={isMessage} className="message-username">{message.username}</span>
        <span style={isNotification} className="message-content">{message.content.match(matchImage) ? <img style={imageStyle} src={message.content.match(matchImage)}/> : message.content}</span>
      <div className="notification">
      </div>
      </div>
      <div className="message system">

      </div>
      </main>
    );
}
export default Message;

