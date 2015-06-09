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

    close: function(event) {
      event.preventDefault();

      if (removeTimer) {
        clearTimeout(removeTimer);
      }

      this.setState({
        remove: true
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
            <a id="notifications-top-center-close" href="#" onClick={this.close}>
              <i className="fi-x"></i>
            </a>
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
