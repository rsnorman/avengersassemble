var NewTeam = React.createClass({

  assembleTeam: function(e) {
    e.preventDefault();

    $.ajax({
      url: 'api/v1/teams',
      type: 'POST',
      dataType: 'json',
      data: {
        team: {
          character_ids: this.props.team.characters.map(function(c) { return c.id })
        }
      },
      success: function(team) {
        console.log(team);
        // this.props.onAssembleTeamSuccess(team);
      }.bind(this)
    });
  },

  render: function() {
    var createItem = function(character, index) {
      return (
        <div key={character.id} className="team-character">
          <img src={character.thumbnail_url} />
          <div className="panel">
            <h6>{character.name}</h6>
          </div>
        </div>
      );
    };

    return (
      <form id="new_team" onSubmit={this.assembleTeam}>
        <div id="new_team" className="row">
          {this.props.team.characters.map(createItem)}
        </div>
        <div className="row">
          <div className="large-9 columns">
            <h3>{this.props.team.name}</h3>
            <p>{this.props.team.description}</p>
          </div>
          <div className="large-3 columns">
            <input type="submit" disabled={!this.props.team.isValid} className="expand button" value="Assemble Team" />
          </div>
        </div>
      </form>
    );
  }
});
