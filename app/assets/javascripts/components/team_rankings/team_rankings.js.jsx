var React        = require('react');
var mui          = require('material-ui');
var List         = mui.List;
var Menu         = require('../menu.js.jsx');
var Team         = require('./team.js.jsx');
var MarvelTheme  = require('../../mixins/marvel-theme.js');

var TeamRankings = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired
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
    var topTeamScore;

    function createTeam(team) {
      topTeamScore = topTeamScore || this.state.teams[0].score;
      return <Team team={team} maxScore={topTeamScore} key={team.id} />
    }

    return (
      <div>
        <Menu title="Leaderboard" loggedIn={this.props.loggedIn} />
        <div id="main">
          <List id="ranking_teams">
            {this.state.teams.map(createTeam.bind(this))}
          </List>
        </div>
      </div>
    );
  }
});

module.exports = TeamRankings;
