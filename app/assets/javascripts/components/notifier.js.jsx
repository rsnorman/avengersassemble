var Notifier = React.createClass({
  close: function() {
    $(this).parent().fadeOut(200, function() {
      this.setState({
        message: null,
        type: null,
        visible: false
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      message: 'Oops! Something went wrong!',
      type: null,
      visible: false
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({
        message: 'Oops! Something went wrong!',
        visible: true
      });
    }.bind(this), 1000);
  },

  render: function() {
    var classes, animatedClasses;
    if ( this.state.visible ) {
      classes = 'visible'
      animatedClasses = 'animated flipInX'
    };


    return (
      <div id="notifications" className={classes}>
        <div id="notifications-top-center" className={animatedClasses}>
          <span className="iconb" data-icon="&#xe20e;"></span>
          {this.state.message}
          <div id="notifications-top-center-close" onclick={this.close()}>
            <span className="iconb" data-icon="&#xe20e;"></span>
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
