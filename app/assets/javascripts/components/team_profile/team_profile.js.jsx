var React          = require('react');
var MarvelTheme    = require('../../mixins/marvel-theme.js');
var Menu           = require('../menu.js.jsx');
var TeamStats      = require('./team_stats.js.jsx');
var TeamCharacters = require('./team_characters.js.jsx');
var mui            = require('material-ui');
var Paper          = mui.Paper;
var Avatar         = mui.Avatar;
var ActionButton   = mui.FloatingActionButton;

var TeamProfile;

TeamProfile = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn:     React.PropTypes.bool.isRequired,
    leaderTeamId: React.PropTypes.number,
    team:         React.PropTypes.object.isRequired,
    maxStats:     React.PropTypes.object.isRequired
  },

  editAssembledTeam: function() {
    window.location = '/teams/' + this.props.team.id + '/edit';
  },

  render: function() {
    function renderEditButton() {
      if ( this.props.leaderTeamId === this.props.team.id ) {
        return (
          <div id="edit_team_button" className="team-floating-action-button">
            <ActionButton
              onClick={this.editAssembledTeam} >
              <i className="material-icons">build</i>
            </ActionButton>
          </div>
        );
      }
    }

    return (
      <div>
        <Menu title="Team Profile"
          loggedIn={this.props.loggedIn}
          leaderTeamId={this.props.leaderTeamId}
        />
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
          {renderEditButton.call(this)}
        </div>
      </div>
    );
  }

});

module.exports = TeamProfile;
