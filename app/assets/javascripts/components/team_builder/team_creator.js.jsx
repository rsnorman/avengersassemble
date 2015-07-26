var React      = require('react');
var Continuity = require('promise-continuity');

var TeamCreator, continuityTeamBuilder, matchedCharacters;

matchedCharacters = {};

continuityTeamBuilder = new Continuity([], function(characters, resolve, reject) {
  $.ajax({
    url: '/api/v1/characters/camaraderie',
    type: 'GET',
    dataType: 'json',
    data: {
      character_id: characters[0].id,
      other_character_id: characters[1].id
    },
    success: function(data) {
      resolve(data.total);
    },
    error: reject
  });
});

function alreadyMatched(matches, character, otherCharacter) {
  return character.id == otherCharacter.id ||
           (matches[character.id] && matches[character.id].indexOf(otherCharacter.id) != -1) ||
           (matches[otherCharacter.id] && [otherCharacter.id].indexOf(character.id) != -1)
}

function getCharacterCamaraderie(character, characters) {
  var _i, _len, _char;
  for ( _i = 0, _len = characters.length; _i < _len; _i++ ) {
    _char = characters[_i];

    if ( !alreadyMatched(matchedCharacters, _char, character) ) {
      matchedCharacters[_char.id] = matchedCharacters[_char.id] || [];
      matchedCharacters[_char.id].push(character.id);
      continuityTeamBuilder.queue([_char, character]);
    }
  }
}

function getTeamCamaraderie() {
  return continuityTeamBuilder;
}

function createTeam(teamAttributes) {
  return $.Deferred(function(defer) {
    var characterIds;
    characterIds = teamAttributes.characters.map(function(c) {
      return c.id
    });
    delete teamAttributes.characters;

    teamAttributes.character_ids = characterIds;

    $.ajax({
      url: '/api/v1/teams',
      type: 'POST',
      dataType: 'json',
      data: {
        team: teamAttributes
      },
      success: function(team) {
        defer.resolve(team);
      },
      error: function(data) {
        defer.reject(data);
      }
    });
  }).promise();
}

TeamCreatorFeedback = React.createClass({

  propTypes: {
    messages: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      finishedCreating: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if ( !this.props.start && nextProps.start ) {
      this.assembleTeam();
    }
  },

  assembleTeam: function() {
    var team;

    team = JSON.parse(JSON.stringify(this.props.team));

    getTeamCamaraderie()
      .then(function(camaraderieValues) {
        var totalCamaraderie;
        totalCamaraderie =
          camaraderieValues.reduce(function(total, val) {
            return total + val;
          }, 0);

        team.total_camaraderie = totalCamaraderie;

        createTeam(team)
         .then(function(team) {
           if ( this.props.onCreate ) {
             this.props.onCreate(team);
           }
         }.bind(this))

         .fail(function(errorData) {
           console.warn('There was an error saving team', errorData);
         });

      }.bind(this))

      .progress(function(camaraderieValue, characters) {
        if ( !!this.props.onAssembleTeamProgress ) {
          this.props.onAssembleTeamProgress(characters);
        }
      }.bind(this))

      .catch(function(error) {
        console.error(error);
      });
  },

  componentDidUpdate: function(prevProps) {
    var newCharacter;
    if ( this.props.team.characters.length > prevProps.team.characters.length ) {
      newCharacter = this.props.team.characters[this.props.team.characters.length - 1];
      getCharacterCamaraderie(newCharacter, this.props.team.characters);
    }
  },

  render: function() {
    var className;
    if ( this.props.start ) {
      className = 'visible';
    }

    return (
      <div id="team_creator_feedback" className={className}>
        <div className="row">
          <div className="large-12 columns">
            <div id="loader">
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TeamCreator;
