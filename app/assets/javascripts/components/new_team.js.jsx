var NewTeam = React.createClass({

  render: function() {
    var createItem = function(character, index) {
      return (
        <div key={character.id} className="team-character large-2 columns">
          <img src={character.thumbnail_url} />
          <div className="panel">
            <h6>{character.name}</h6>
          </div>
        </div>
      );
    };

    return (
      <div id="new_team">
        <div id="new_team" className="row">
          {this.props.team.characters.map(createItem)}
        </div>
        <div className="row">
          <div className="large-12 columns">
            <h3>{this.props.team.name}</h3>
            <p>{this.props.team.description}</p>
          </div>
        </div>
      </div>
    );
  }
});
