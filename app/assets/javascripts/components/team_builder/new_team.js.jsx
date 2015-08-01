var React          = require('react');
var ExperienceBar  = require('./experience_bar.js.jsx');
var mui            = require('material-ui');
var Avatar         = mui.Avatar;
var Paper          = mui.Paper;
var LinearProgress = mui.LinearProgress;

var NewTeam;

function getCharacterSlots(characters, maxTeamSize) {
  var characterSlots, _i, _len
  characterSlots = [];
  for (_i = 0, _len = characters.length; _i < _len; _i++) {
    characterSlots.push(characters[_i]);
  }

  while ( characterSlots.length < maxTeamSize ) {
    characterSlots.push({empty: true});
  }

  return characterSlots;
}

NewTeam = React.createClass({

  propTypes: {
    team: React.PropTypes.object.isRequired,
    allowedExperience: React.PropTypes.number.isRequired,
    maxTeamSize: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      maxTeamSize: 5
    };
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

    function createEmptyIcon() {
      return <i className="material-icons md-dark">flash_on</i>;
    }

    function createItem(character, index) {
      if ( !character.empty ) {
        return (
          <div key={index}>
            <Avatar src={character.thumbnail_url} />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <Avatar icon={createEmptyIcon()} />
          </div>
        );
      }
    };

    return (
      <Paper id="new_team" zIndex={2}>
        <div id="team_characters">
          {
            getCharacterSlots(
              this.props.team.characters,
              this.props.maxTeamSize
            ).map(createItem)
          }
        </div>
        <LinearProgress mode="determinate" value={totalPercentExperience} />
      </Paper>
    );
  }

});

module.exports = NewTeam;
