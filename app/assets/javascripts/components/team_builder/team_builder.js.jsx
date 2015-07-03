var TeamBuilder = React.createClass({

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
        }
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

  teamAssembling: function() {
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

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="large-12 columns">
            <NewTeam team={this.state.team} onAssembleStart={this.teamAssembling} onAssembleTeamSuccess={this.teamAssembled} allowedExperience={this.props.maxExperience}></NewTeam>
          </div>
        </div>

        <div className="row">
          <div className="large-12 columns">
            <div className="radius panel">
              <CharacterSearch onSearchSuccess={this.showCharacters} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="row">
            <div className="large-12 columns">
              <Characters onCharacterSelect={this.addCharacterToTeam} characters={this.state.characters} />
            </div>
          </div>
        </div>
        <TeamCreatorFeedback visible={this.state.creatingTeam} />
      </div>
    );
  }
});
