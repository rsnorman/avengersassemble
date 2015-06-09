var Notifier;
(function() {
  var removeTimer;

  Notifier = React.createClass({

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
          visible: true,
          remove: false
        });

        removeTimer = setTimeout(function() {
          this.setState({
            remove: true
          });

        }.bind(this), 5000)

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

      if ( this.state.visible && !this.state.remove ) {

        if (removeTimer) {
          clearTimeout(removeTimer);
        }

        classes += ' visible';
        animatedClasses = 'animated flipInX';

      } else if ( this.state.remove ) {

        classes += ' visible';
        animatedClasses = 'animated flipOutX';

        setTimeout(function() {
          this.setState({
            visible: false,
            remove: false
          });
        }.bind(this), 750);

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
})()

$(document).on('ready page:load', function() {
  var notificationsEl;
  notificationsEl = document.createElement('div');
  document.body.appendChild(notificationsEl);
  React.render(<Notifier />, notificationsEl);
});
