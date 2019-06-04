import React, {Component} from 'react';

class Notifications extends Component {
  render() {
    const notifications = this.props.notifications
    return (
      <div className="notification">
      <span className="notification-content">{notifications}</span>
      </div>
    );
  }
}
export default Notifications;






