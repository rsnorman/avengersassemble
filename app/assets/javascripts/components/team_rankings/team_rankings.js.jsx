var React  = require('react');
var mui    = require('material-ui');

var List           = mui.List;
var ListItem       = mui.ListItem;
var Avatar         = mui.Avatar;
var FontIcon       = mui.FontIcon;
var Paper          = mui.Paper;
var LinearProgress = mui.LinearProgress;

var Menu         = require('../menu.js.jsx');
var MarvelTheme  = require('../../mixins/marvel-theme.js');

var TeamRankings = React.createClass({

  mixins: [MarvelTheme],

  getInitialState: function() {
    return {
      isLoading: true,
      teams: [],
      menuVisible: false
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

  openMenu: function openMenu(e) {
    this.refs.leftNav.open();
  },

  render: function() {
    var topTeam, scorePercent;
    topTeam = this.state.teams[0];

    var createCharacter = function(character, index) {
      return (
        <Avatar className="team-character" src={character.thumbnail_url} size={40} key={character.id} />
      );
    };

    var createTeam = function(team, index) {
      scorePercent = Math.round(team.score / topTeam.score * 100);
      return (
        <Paper className="ranking-team" zDepth={1} key={team.id}>
          <ListItem className="ranking-list-item">
            <div className="leader-icon">
              <Avatar src={team.leader.image + '?type=large'} size={80}/>
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
        <Menu />
        <List id="ranking_teams">
          {this.state.teams.map(createTeam.bind(this))}
        </List>
      </div>
    );
  }
});

module.exports = TeamRankings;
