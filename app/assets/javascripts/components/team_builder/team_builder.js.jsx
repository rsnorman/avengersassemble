var React            = require('react');
var CharacterSearch  = require('./character_search.js.jsx');
var CharacterResults = require('./character_results.js.jsx');
var NewTeam          = require('./new_team.js.jsx');
var TeamCreator      = require('./team_creator.js.jsx');
var MarvelTheme      = require('../../mixins/marvel-theme.js');
var Menu             = require('../menu.js.jsx');
var mui              = require('material-ui');
var ActionButton     = mui.FloatingActionButton;


var TeamBuilder, feedbackMessages;
feedbackMessages = [];
TeamBuilder = React.createClass({

  mixins: [MarvelTheme],

  getInitialState: function() {
    if ( !localStorage.team ) {
      return {
        characters: [],
        team: {
          characters: [],
          experience: 0
        }
      };
    } else {
      return {
        characters:[],
        //team: JSON.parse(localStorage.team)
        team: {
          characters: [],
          experience: 0
        },
      };
    }
  },

  showCharacters: function(characters) {
    this.setState({
      characters: characters
    });
  },

  addCharacterToTeam: function(character) {
    var team;
    team = JSON.parse(JSON.stringify(this.state.team));

    if ( this.props.maxSize > this.state.team.characters.length ) {

      if ( this.props.maxExperience > this.state.team.experience + character.experience ) {

        team.characters.push(character);
        team.experience += character.experience;

        PubSub.publish( 'notification', {
          text: 'Added ' + character.name + ' to team',
          type: 'success'
        } );

        if ( this.props.maxSize === team.characters.length ) {
          team.isValid = true
        }

        localStorage.team = JSON.stringify(team);

      } else {
        PubSub.publish( 'notification', {
          text: 'Too powerful of a team',
          type: 'error'
        } );
      }

    } else {
      PubSub.publish('notification', {
        text: 'Too many team members',
        type: 'error'
      });
    }

    this.setState({
      team: team
    });
  },

  startAssemblingTeam: function() {
    this.setState({
      creatingTeam: true
    });
  },

  teamAssembled: function(team) {
    this.setState({
      creatingTeam: false
    });
    PubSub.publish('notification', {
      text: 'Team create successfully',
      type: 'success'
    });
  },

  removeCharacterFromeTeam: function(removeCharacter) {
    var team;
    team = JSON.parse(JSON.stringify(this.state.team));
    team.characters = team.characters.filter(function(character) {
      return character.id !== removeCharacter.id;
    });

    team.experience -= removeCharacter.experience;
    team.isValid     = false

    this.setState({
      team: team
    });
  },

  goToLeaderboard: function(team) {
    window.location = '/teams?active=' + team.id;
  },

  render: function() {
    return (
      <div>
        <Menu title="Assemble Team" />
        <NewTeam
          team={this.state.team}
          allowedExperience={2500}
          maxTeamSize={5}
          onRemoveCharacter={this.removeCharacterFromTeam} />
        <CharacterSearch onSearchSuccess={this.showCharacters} />
        <CharacterResults
          onCharacterSelect={this.addCharacterToTeam}
          characters={this.state.characters} />
        <TeamCreatorFeedback
          start={this.state.creatingTeam}
          onCreate={this.goToLeaderboard}
          team={this.state.team} />
        <div id="create_team_button">
          <ActionButton
            onClick={this.startAssemblingTeam}
            disabled={!this.state.team.isValid}>
            <i className="material-icons">build</i>
          </ActionButton>
        </div>
      </div>
    );
  }
});

module.exports = TeamBuilder;
