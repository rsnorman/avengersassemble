var React        = require('react');
var mui          = require('material-ui');
var Paper        = mui.Paper;
var Menu         = require('../menu.js.jsx');
var MarvelTheme  = require('../../mixins/marvel-theme.js');

var AboutPage = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn:     React.PropTypes.bool.isRequired,
    leaderTeamId: React.PropTypes.number,
  },

  render: function() {
    return (
      <div>
        <Menu title="Leaderboard"
          loggedIn={this.props.loggedIn}
          leaderTeamId={this.props.leaderTeamId}
        />
        <div id="main">
          <Paper zIndex={1}>
            <div id="about">
              <h1>About</h1>
              <img id="about_logo" src="/images/avengers-assemble-logo-medium.png" />
              <p>
                Created by Ryan Norman. Please direct all suggestions,
                issues and insults to&nbsp;
                <a href="mailto:rsnorman15+assembleavengers@gmail.com">
                  rsnorman15@gmail.com
                </a>.
              </p>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
});

module.exports = AboutPage;
