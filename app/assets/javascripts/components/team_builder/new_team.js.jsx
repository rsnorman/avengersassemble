var React          = require('react');
var ExperienceBar  = require('./experience_bar.js.jsx');
var mui            = require('material-ui');
var Avatar         = mui.Avatar;
var Paper          = mui.Paper;
var LinearProgress = mui.LinearProgress;

var NewTeam;

NewTeam = React.createClass({

  propTypes: {
    team: React.PropTypes.object.isRequired,
    allowedExperience: React.PropTypes.number.isRequired
  },

  assembleTeam: function(event) {
    event.preventDefault();
    if ( this.props.onAssembleTeam ) {
      this.props.onAssembleTeam();
    }
  },

  render: function() {
    var totalPercentExperience;
    totalPercentExperience = Math.round(
      this.props.team.experience / this.props.allowedExperience * 100
    );

    function createItem(character, index) {
      return (
        <div>
          <Avatar src={character.thumbnail_url} />
        </div>
      );
    };

    return (
      <Paper id="new_team" zIndex={2}>
        <div id="team_characters">
          {this.props.team.characters.map(createItem)}
        </div>
        <LinearProgress mode="determinate" value={totalPercentExperience} />
      </Paper>
    );
  }

});

module.exports = NewTeam;
