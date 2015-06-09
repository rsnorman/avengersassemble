var Notifier = React.createClass({

  getInitialState: function() {
    return {
      message: null,
      type: null,
      visible: false
    };
  },

  componentDidMount: function() {

    PubSub.subscribe( 'notification', function(eventName, message) {

      this.setState({
        message: message.text,
        type: message.type,
        visible: true
      });

    }.bind(this) );
  },

  close: function() {
    this.setState({
      message: null,
      type: null,
      visible: false
    });
  },

  render: function() {
    var classes, animatedClasses;

    classes = this.state.type;

    if ( this.state.visible ) {
      classes += ' visible';
      animatedClasses = 'animated flipInX';
    }


    return (
      <div id="notifications" className={classes}>
        <div id="notifications-top-center" className={animatedClasses}>
          {this.state.message}
          <div id="notifications-top-center-close" onClick={this.close}>
            <span className="fi-x"></span>
          </div>
        </div>
      </div>
    );
  }
});

$(document).on('ready page:load', function() {
  var notificationsEl;
  notificationsEl = document.createElement('div');
  document.body.appendChild(notificationsEl);
  React.render(<Notifier />, notificationsEl);
});
