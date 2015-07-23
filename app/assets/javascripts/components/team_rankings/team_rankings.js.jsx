var React  = require('react');
var mui    = require('material-ui');

var ThemeManager = new mui.Styles.ThemeManager();

var AppBar   = mui.AppBar;
var List     = mui.List;
var ListItem = mui.ListItem;

var TeamRankings = React.createClass({

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return {
      isLoading: true,
      teams: []
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: '/api/v1/teams',
      dataType: 'json',
      success: function(data) {
        this.setState({
          isLoading: false,
          teams: data.results
        });
      }.bind(this)
    });
  },

  render: function() {
    var createCharacter = function(character, index) {
      return (
        <div className="ranking-character large-2 medium-2 small-2 columns" key={character.id}>
          <img src={character.thumbnail_url} />
          <div className="panel">
            <strong>{character.name}</strong>
          </div>
        </div>
      );
    };

    var createTeam = function(team, index) {
      return (
        <ListItem className="ranking-team row" key={team.id}>
          <div className="large-12 columns">
            <h5>{team.name}</h5>
            <div className="row">
              {team.characters.map(createCharacter.bind(this))}
              <div className="large-2 medium-2 small-2"></div>
            </div>
            <div className="row">
              <div className="large-12">
                <strong>Score:</strong>
                {Math.round(team.score)}
              </div>
            </div>
          </div>
        </ListItem>
      );
    };

    return (
      <div>
        <AppBar title="Avengers Leaderboard" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <List>
          {this.state.teams.map(createTeam.bind(this))}
        </List>
      </div>
    );
  }
});

TeamRankings.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = TeamRankings
