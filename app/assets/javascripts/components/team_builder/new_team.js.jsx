var ExperienceBar = require('./experience_bar.js.jsx');

var NewTeam;

NewTeam = React.createClass({

  assembleTeam: function(event) {
    event.preventDefault();
    if ( this.props.onAssembleTeam ) {
      this.props.onAssembleTeam();
    }
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
          <div className="large-12 columns">
            {this.props.team.characters.map(createItem)}
          </div>
        </div>
        <div className="row">
          <div className="large-9 columns">
            <h3>Assemble Your Avengers</h3>
            <h6>Total Experience: {this.props.team.experience}</h6>
            <ExperienceBar totalProgress={this.props.allowedExperience} currentProgress={this.props.team.experience}></ExperienceBar>
          </div>
          <div className="large-3 columns">
            <input type="submit" disabled={!this.props.team.isValid} className="expand button" value="Assemble Team" />
          </div>
        </div>
      </form>
    );
  }

});

module.exports = NewTeam;
