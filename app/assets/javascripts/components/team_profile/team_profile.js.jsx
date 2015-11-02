var React          = require('react');
var MarvelTheme    = require('../../mixins/marvel-theme.js');
var Menu           = require('../menu.js.jsx');
var TeamStats      = require('./team_stats.js.jsx');
var TeamCharacters = require('./team_characters.js.jsx');
var TeamBanner     = require('./team_banner.js.jsx');
var mui            = require('material-ui');
var Paper          = mui.Paper;
var Avatar         = mui.Avatar;
var ActionButton   = mui.FloatingActionButton;
var IconButton     = mui.IconButton;
var Dialog         = mui.Dialog;
var Progress       = mui.CircularProgress;

var TeamProfile;

TeamProfile = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn:     React.PropTypes.bool.isRequired,
    leaderTeamId: React.PropTypes.number,
    team:         React.PropTypes.object.isRequired,
    maxStats:     React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      sharingTeam: false,
      shared: false
    };
  },

  editAssembledTeam: function() {
    window.location = '/teams/' + this.props.team.id + '/edit';
  },

  showShareAssembledTeamPrompt: function() {
    this.refs.modal.show();
  },

  shareAssembledTeam: function() {
    this.setState({
      sharingTeam: true
    });
  },

  shareTeamBanner: function() {
    jQuery.ajax({
      url: '/api/v1/team_banners',
      method: 'POST',
      dataType: 'json',
      data: {
        banner: {
          data: this.refs.teamBanner.getDataURL()
        }
      },
      success: function(data) {
        FB.ui({
          method:        'share',
          href:          data.banner.team.url,
          name:          data.banner.team.name,
          picture:       data.banner.url,
          description:   'Currently ranked number ' + data.banner.team.rank + '!'
        }, function(response) {
          console.log(response);
          setTimeout(function() {
            this.refs.modal.dismiss();
            this.setState({
              shared: false
            });
          }.bind(this), 2000);
        }.bind(this));
      }.bind(this),
      error: function() {
        console.log(arguments);
      }
    });
  },

  render: function() {
    function renderEditButton() {
      if ( this.props.leaderTeamId === this.props.team.id ) {
        return (
          <div id="edit_team_button" className="team-floating-action-button">
            <ActionButton
              onClick={this.shareAssembledTeam} >
              <i className="material-icons">share</i>
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
          rightButton={
            <IconButton>
              <i className="material-icons">build</i>
            </IconButton>
          }
          onRightButtonClick={this.editAssembledTeam}
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

          {this._renderShareActionButton()}

          {this._renderTeamBanner()}
          {this._renderShareDialog()}
        </div>
      </div>
    );
  },

  _renderShareDialog: function() {
    var standardActions = [
      { text: 'No Thanks' },
      { text: 'Sure!', onTouchTap: this.shareAssembledTeam, ref: 'submit' }
    ];

    if ( this.state.sharingTeam || this.state.shared) {
      standardActions = [];
    }

    return (
      <div id="team_sharing_feedback">
        <Dialog
          ref="modal"
          title="Share Your Avengers"
          actionFocus="submit"
          actions={standardActions}
          modal={true}>
          {this._renderSharingMessage()}
        </Dialog>
      </div>
    );
  },

  _renderSharingMessage: function() {
    if ( this.state.sharingTeam ) {
      return (
        <div>
          <p className="sharing-message">
            Sharing your Avengers&hellip;
          </p>
          <br />
          <Progress mode="indeterminate" size={2} />
        </div>
      );
    } else if ( this.state.shared ) {
      return (
        <div>
          <p className="success-message">
            Your Avengers Shared!
          </p>
          <br />
          <Progress mode="determinate" value={100} size={2} />
        </div>
      );
    } else {
      return (
        <div>
          <p className="facebook-share">
            Share your team on Facebook?
          </p>
        </div>
      );
    }
  },

  _renderShareActionButton: function() {
    if ( this.props.loggedIn && this.props.leaderTeamId == this.props.team.id ) {
      return (
        <div id="share_team_button" className="team-floating-action-button">
          <ActionButton onClick={this.showShareAssembledTeamPrompt}>
            <i className="material-icons">share</i>
          </ActionButton>
        </div>
      );
    } else {
      return <div />;
    }
  },

  _renderTeamBanner: function() {
    return (
      <div style={{visibility:'hidden', position: 'absolute', top: '0', left: '-1000px', width: 0, height: 0}}>
        <TeamBanner
          ref="teamBanner"
          visible={this.state.sharingTeam}
          onRenderComplete={this.shareTeamBanner}
          team={this.props.team}
          maxStats={this.props.maxStats} />
      </div>
    );
  }

});

module.exports = TeamProfile;
