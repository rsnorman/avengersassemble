var TeamBuilder = React.createClass({
  getInitialState: function() {
    return {
      characters: [],
      team: {
        characters: []
      }
    };
  },

  showCharacters: function(characters) {
    this.setState({
      characters: characters
    });
  },

  addCharacterToTeam: function(character) {
    if ( this.props.maxSize > this.state.team.characters.length ) {
      this.state.team.characters.push(character);

      if ( this.props.maxSize === this.state.team.characters.length ) {
        this.state.team.isValid = true
      }
    }

    this.setState(this.state);
  },

  teamAssembled: function(team) {
    console.log('Team Created Successfully', team);
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="large-12 columns">
            <NewTeam team={this.state.team} onAssembleTeamSuccess={this.teamAssembled}></NewTeam>
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
      </div>
    );
  }
});

$(document).on('ready page:load', function() {
  var teamBuilderEl;
  teamBuilderEl = document.getElementById('team_builder');

  if ( teamBuilderEl ) {
    React.render(<TeamBuilder maxSize={5} />, teamBuilderEl);
  }
});
