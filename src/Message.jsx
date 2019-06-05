import React, {Component} from 'react';

//Display the messages
function Message({message}) {
  const {color, content, id, type, username} = message
  //Styling for the notifications
  const notificationStyle = {
    fontStyle: 'italic',
    fontWeight: 'bold',
  };
  //Styling for the messages
  const messageStyle = {
    color: color,
  };
  //Styling for the images
  const imageStyle = {
    maxWidth: '60%',
    maxHeight: '60%',
    display: 'block',
    marginTop: '10px'
  };
  //RegEx to match an URL ending with jpb, gif or png
  const matchImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  //If the message type is postMessage
  const isMessage = type === 'postMessage' ? messageStyle : null;
  //If the message type is postNotification
  const isNotification = type === 'postNotification' ? notificationStyle : null;

    return (
      <main className="messages">

      <div className="message">
        <span style={isMessage} className="message-username">{username}</span>
        <span style={isNotification} className="message-content">{content.match(matchImage) ? <span>{content.replace(matchImage, '')}<img style={imageStyle} src={content.match(matchImage)}/></span> : content}</span>
      <div className="notification">
      </div>
      </div>
      <div className="message system">

      </div>
      </main>
    );
}
export default Message;

