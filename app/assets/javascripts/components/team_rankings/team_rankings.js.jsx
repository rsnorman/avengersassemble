var React  = require('react');
var mui    = require('material-ui');

var ThemeManager   = new mui.Styles.ThemeManager();
var AppBar         = mui.AppBar;
var List           = mui.List;
var ListItem       = mui.ListItem;
var Avatar         = mui.Avatar;
var FontIcon       = mui.FontIcon;
var Paper          = mui.Paper;
var LinearProgress = mui.LinearProgress

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
    var topTeam, scorePercent;
    topTeam = this.state.teams[0];

    var createCharacter = function(character, index) {
      return (
        <Avatar src={character.thumbnail_url} size={40} key={character.id} />
      );
    };

    var createTeam = function(team, index) {
      scorePercent = Math.round(team.score / topTeam.score * 100);
      return (
        <Paper className="ranking-team" zDepth={1}>
          <ListItem className="ranking-list-item" key={team.id}>
            <div className="leader-icon">
              <Avatar icon={<i className="material-icons md-48">face</i>} size={80}/>
            </div>
            <div className="team-details">
              <div className="team-name">{team.name}</div>
              <LinearProgress mode="determinate" value={scorePercent} />
              <div className="team-characters">
                {team.characters.map(createCharacter.bind(this))}
              </div>
            </div>
          </ListItem>
        </Paper>
      );
    };

    return (
      <div>
        <AppBar title="Leaderboard" />
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
