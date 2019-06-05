   import React, {Component} from 'react';

class Message extends Component {
  render() {

    const notificationStyle = {
      fontStyle: 'italic',
      fontWeight: 'bold',
    };
    const messageStyle = {
      color: this.props.message.color,
    }

    return (
      <main className="messages">

      <div className="message">
        <span style={this.props.message.type === 'postMessage' ? messageStyle: null} className="message-username">{this.props.message.username}</span>
        <span style={this.props.message.type === 'postNotification' ? notificationStyle: null} className="message-content">{this.props.message.content.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g) ? <img style={{maxWidth: '60%', maxHeight: '60%'}} src={this.props.message.content} /> : this.props.message.content}</span>
      <div className="notification">
      </div>
      </div>
      <div className="message system">

      </div>
      </main>
    );
  }
}
export default Message;

