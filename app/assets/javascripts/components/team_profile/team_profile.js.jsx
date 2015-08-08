var React          = require('react');
var MarvelTheme    = require('../../mixins/marvel-theme.js');
var Menu           = require('../menu.js.jsx');
var TeamStats      = require('./team_stats.js.jsx');
var TeamCharacters = require('./team_characters.js.jsx');
var mui            = require('material-ui');
var Paper          = mui.Paper;
var Avatar         = mui.Avatar;

var TeamProfile;

TeamProfile = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    team: React.PropTypes.object.isRequired,
    maxStats: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        <Menu title="Team Profile" loggedIn={this.props.loggedIn} />
        <div id="main">
          <Paper id="team_profile_header">
            <Avatar
              id="leader_avatar"
              src={this.props.team.leader.image + '?type=large'}
              size={100} />
            <h4 id="team_name">{this.props.team.name}</h4>
            <h5 id="team_rank">Ranked #{this.props.team.rank}</h5>
            <div className="clear"></div>
          </Paper>
          <TeamStats
            stats={this.props.team.stats}
            maxStats={this.props.maxStats} />
          <TeamCharacters characters={this.props.team.characters} />
        </div>
      </div>
    );
  }

});

module.exports = TeamProfile;
