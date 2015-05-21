var TeamBuilder = React.createClass({
  getInitialState: function() {
    return {
      characters: [],
      team: {
        characters: [],
        description: 'This is the best team evarrrrr!!!',
        name: 'Ryan Norman\'s Avengers'
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

  render: function() {
    return <div className="row">
        <div className="large-12 columns">

          <ul className="button-group">
            <li><a href="#" className="button">Home</a></li>
            <li><a href="#" className="button">Teams</a></li>
          </ul>

          <NewTeam team={this.state.team}></NewTeam>

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
    </div>;
  }
});

window.onload = function() {
  React.render(<TeamBuilder maxSize={5} />, document.body);
};
