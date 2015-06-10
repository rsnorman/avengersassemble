var TeamCreatorFeedback = React.createClass({

  getInitialState: function() {
    return {
      message: ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if ( !nextProps.visible ) {
      this.setState({
        message: 'Team Created Successfully!'
      });
    } else {
      this.setState({
        message: 'Creating Team...'
      });
    }
  },

  render: function() {
    var className;
    if ( this.props.visible ) {
      className = 'visible';
    }

    return (
      <div id="team_creator_feedback" className={className}>
        <div className="row">
          <div className="large-12 columns">
            {this.state.message}
          </div>
        </div>
      </div>
    );
  }

});
