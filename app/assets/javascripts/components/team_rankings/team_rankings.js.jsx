var React  = require('react');
var mui    = require('material-ui');

var ThemeManager = new mui.Styles.ThemeManager();

var AppBar   = mui.AppBar;
var List     = mui.List;
var ListItem = mui.ListItem;
var Avatar   = mui.Avatar;
var FontIcon = mui.FontIcon;

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
        <Avatar src={character.thumbnail_url} size={60} key={character.id} />
      );
    };

    var createTeam = function(team, index) {
      return (
        <ListItem className="ranking-team row" key={team.id}>
          <div className="leader-icon">
            <Avatar icon={<i className="material-icons md-48">face</i>} size={80}/>
          </div>
          <div className="team-details">
            <div className="team-name">{team.name}</div>
            <div className="team-characters">
              {team.characters.map(createCharacter.bind(this))}
            </div>
          </div>
        </ListItem>
      );
    };

    return (
      <div>
        <AppBar title="Avengers Leaderboard" />
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
