var React          = require('react');
var CharacterSlot  = require('./character_slot.js.jsx');
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
    characterSlots.push(false);
  }

  return characterSlots;
}

NewTeam = React.createClass({

  propTypes: {
    team: React.PropTypes.object.isRequired,
    allowedExperience: React.PropTypes.number.isRequired,
    maxTeamSize: React.PropTypes.number,
    onRemoveCharacter: React.PropTypes.func
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

  removeCharacter: function(character) {
    if ( !!this.props.onRemoveCharacter ) {
      this.props.onRemoveCharacter(character);
    }
  },

  render: function() {
    var totalPercentExperience;
    totalPercentExperience = Math.round(
      this.props.team.experience / this.props.allowedExperience * 100
    );

    function createItem(character, index) {
      return (
        <CharacterSlot
          character={character}
          key={index}
          onRemove={this.removeCharacter} />
      );
    };

    return (
      <Paper id="new_team" zIndex={2}>
        <div id="team_characters">
          {
            getCharacterSlots(
              this.props.team.characters,
              this.props.maxTeamSize
            ).map(createItem.bind(this))
          }
        </div>
        <LinearProgress mode="determinate" value={totalPercentExperience} />
      </Paper>
    );
  }

});

module.exports = NewTeam;
