var React            = require('react');
var CharacterSearch  = require('./character_search.js.jsx');
var CharacterResults = require('./character_results.js.jsx');
var NewTeam          = require('./new_team.js.jsx');
var TeamCreator      = require('./team_creator.js.jsx');
var MarvelTheme      = require('../../mixins/marvel-theme.js');
var Menu             = require('../menu.js.jsx');
var mui              = require('material-ui');
var ActionButton     = mui.FloatingActionButton;
var Dialog           = mui.Dialog;


var TeamBuilder, feedbackMessages;
feedbackMessages = [];
TeamBuilder = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    maxExperience: React.PropTypes.number,
    maxTeamSize:   React.PropTypes.number,
    loggedIn:      React.PropTypes.bool.isRequired,
    leaderTeamId:  React.PropTypes.number,
    team:          React.PropTypes.object
  },

  getDefaultProps: function() {
    loggedIn: false
  },

  getInitialState: function() {
    if ( !!this.props.team ) {
      localStorage.team = JSON.stringify(this.props.team);
    }

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
        team: {
          characters: [],
          experience: 0
        },
        team: JSON.parse(localStorage.team)
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

    if ( this.props.maxTeamSize <= team.characters.length ) {
      PubSub.publish('notification', {
        text: 'Your team has too many superheroes',
        type: 'error'
      });
      return;
    }

    var alreadyAdded = !!team.characters
      .find(function(ch) { return ch.id == character.id; });

    if ( alreadyAdded ) {
      PubSub.publish('notification', {
        text: 'You already added ' + character.name,
        type: 'error'
      });
      return;
    }

    if ( this.props.maxExperience <= team.experience + character.experience ) {
      PubSub.publish( 'notification', {
        text: 'Your team is too powerful',
        type: 'error'
      });
      return;
    }

    team.characters.push(character);
    team.experience += character.experience;

    PubSub.publish( 'notification', {
      text: 'Added ' + character.name + ' to team',
      type: 'success'
    } );

    if ( this.props.maxTeamSize === team.characters.length ) {
      team.isValid = true
    }

    localStorage.team = JSON.stringify(team);

    this.setState({
      team: team
    });

    this.refs.search.reset();
  },

  startAssemblingTeam: function() {
    if ( this.props.loggedIn ) {
      this.refs.creator.create();
    } else {
      this.refs.modal.show();
    }
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

  removeCharacterFromTeam: function(removeCharacter) {
    var team;
    team = JSON.parse(JSON.stringify(this.state.team));
    team.characters = team.characters.filter(function(character) {
      return character.id !== removeCharacter.id;
    });

    team.experience  -= removeCharacter.experience;
    team.isValid      = false
    localStorage.team = JSON.stringify(team);

    this.setState({
      team: team
    });
  },

  goToProfile: function(team) {
    setTimeout(function() {
      window.location = '/teams/' + team.id;
    }, 2000);
  },

  signIn: function() {
    window.location = '/auth/facebook';
  },

  hideModal: function() {
    this.refs.modal.dismiss();
  },

  render: function() {
    var standardActions = [
      { text: 'No Thanks' },
      { text: 'Sure!', onTouchTap: this.signIn, ref: 'submit' }
    ];

    return (
      <div>
        <Menu title="Assemble Team"
          loggedIn={this.props.loggedIn}
          leaderTeamId={this.props.leaderTeamId}
        />
        <div id="main">
          <NewTeam
            team={this.state.team}
            allowedExperience={this.props.maxExperience}
            maxTeamSize={this.props.maxTeamSize}
            onRemoveCharacter={this.removeCharacterFromTeam} />
          <CharacterSearch ref="search" onSearchSuccess={this.showCharacters} />
          <CharacterResults
            onCharacterSelect={this.addCharacterToTeam}
            characters={this.state.characters} />
          <TeamCreatorFeedback
            ref="creator"
            onCreate={this.goToProfile}
            team={this.state.team} />
          <div id="create_team_button" className="team-floating-action-button">
            <ActionButton
              onClick={this.startAssemblingTeam}
              disabled={!this.state.team.isValid}>
              <i className="material-icons">build</i>
            </ActionButton>
          </div>
          <Dialog
            ref="modal"
            title="Sign In"
            actions={standardActions}
            actionFocus="submit">
            Please sign in using your Facebook account to assemble your team.
          </Dialog>
        </div>
      </div>
    );
  }
});

module.exports = TeamBuilder;
