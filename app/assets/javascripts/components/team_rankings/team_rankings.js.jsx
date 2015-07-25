var React  = require('react');
var mui    = require('material-ui');

var ThemeManager   = new mui.Styles.ThemeManager();
var AppBar         = mui.AppBar;
var List           = mui.List;
var ListItem       = mui.ListItem;
var Avatar         = mui.Avatar;
var FontIcon       = mui.FontIcon;
var Paper          = mui.Paper;
var LinearProgress = mui.LinearProgress;
var Colors         = mui.Styles.Colors;
var LeftNav        = mui.LeftNav;
var MenuItem       = mui.MenuItem;

var redDarkTheme = {
  getComponentThemes: function getComponentThemes(palette) {
    var componentThemes;
    componentThemes = ThemeManager.types.DARK.getComponentThemes(palette);
    return componentThemes;
  },
  getPalette: function getPalette() {
    var palette;
    palette = ThemeManager.types.DARK.getPalette();
    palette.primary1Color = Colors.red500;
    palette.primary3Color = Colors.red50;
    return palette;
  }
};

ThemeManager.setTheme(redDarkTheme);

var TeamRankings = React.createClass({

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

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
      console.log(team.leader.image);
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

    var menuItems = [
      {
        type: MenuItem.Types.LINK,
        payload: '/teams',
        text: 'Leaderboard'
      },
      {
        type: MenuItem.Types.LINK,
        payload: '/teams/new',
        text: 'Assemble Team'
      },
      {
        type: MenuItem.Types.LINK,
        payload: '/auth/facebook',
        text: 'Sign In'
      }
    ];

    return (
      <div>
        <AppBar title="Leaderboard" onLeftIconButtonTouchTap={this.openMenu} />
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
        <List id="ranking_teams">
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
