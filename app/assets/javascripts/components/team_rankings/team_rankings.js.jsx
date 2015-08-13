var React        = require('react');
var mui          = require('material-ui');
var List         = mui.List;
var Paper        = mui.Paper;
var Menu         = require('../menu.js.jsx');
var Team         = require('./team.js.jsx');
var MarvelTheme  = require('../../mixins/marvel-theme.js');

var TeamRankings = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn:     React.PropTypes.bool.isRequired,
    leaderTeamId: React.PropTypes.number,
    teams:        React.PropTypes.array.isRequired
  },

  render: function() {
    var topTeamScore;

    function createTeam(team) {
      topTeamScore = topTeamScore || this.props.teams[0].score;
      return <Team team={team} maxScore={topTeamScore} key={team.id} />
    }

    return (
      <div>
        <Menu title="Leaderboard"
          loggedIn={this.props.loggedIn}
          leaderTeamId={this.props.leaderTeamId}
        />
        <div id="main">
          {(function() {
            if ( this.props.teams.length > 0 ) {
              return (
                <List id="ranking_teams">
                  {this.props.teams.map(createTeam.bind(this))}
                </List>
              );
            } else {
              return (
                <Paper zIndex={1}>
                  <p>
                    <em>No one has created any teams</em>
                  </p>
                </Paper>
              );
            }
          }).call(this)}
        </div>
      </div>
    );
  }
});

module.exports = TeamRankings;
