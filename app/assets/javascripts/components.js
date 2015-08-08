var React        = require('react');
var Notifier     = require('./components/notifier.js.jsx');
var TeamBuilder  = require('./components/team_builder/team_builder.js.jsx');
var TeamRankings = require('./components/team_rankings/team_rankings.js.jsx');
var TeamProfile  = require('./components/team_profile/team_profile.js.jsx');

var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function getProps(el) {
  var props;
  props = JSON.parse(el.attributes['data-react-prop'].value);
  props.loggedIn = window.teamLeaderLoggedIn;
  return props;
}


$(document).on('ready page:load', function() {
  var notificationsEl;
  notificationsEl = document.createElement('div');
  document.body.appendChild(notificationsEl);
  React.render(React.createElement(Notifier), notificationsEl);
});

$(document).on('ready page:load', function() {
  var teamRankingsEl;
  teamRankingsEl = document.getElementById('team_rankings');

  if ( teamRankingsEl ) {
    React.render(React.createElement(TeamRankings, {
      loggedIn: window.teamLeaderLoggedIn
    }), teamRankingsEl);
  }
});

$(document).on('ready page:load', function() {
  var teamBuilderEl;
  teamBuilderEl = document.getElementById('team_builder');

  if ( teamBuilderEl ) {
    React.render(React.createElement(TeamBuilder, {
      maxSize: 5,
      maxExperience: 2500,
      loggedIn: window.teamLeaderLoggedIn
    }), teamBuilderEl);
  }
});

$(document).on('ready page:load', function() {
  var teamProfileEl;
  teamProfileEl = document.getElementById('team_profile');

  if ( teamProfileEl ) {
    React.render(
      React.createElement(TeamProfile, getProps(teamProfileEl)), teamProfileEl
    );
  }
});
