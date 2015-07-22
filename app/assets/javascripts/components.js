var Notifier     = require('./components/notifier.js.jsx');
var TeamBuilder  = require('./components/team_builder/team_builder.js.jsx');
var TeamRankings = require('./components/team_rankings/team_rankings.js.jsx');


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
    React.render(React.createElement(TeamRankings), teamRankingsEl);
  }
});

$(document).on('ready page:load', function() {
  var teamBuilderEl;
  teamBuilderEl = document.getElementById('team_builder');

  if ( teamBuilderEl ) {
    React.render(React.createElement(TeamBuilder, {
      maxSize: 5,
      maxExperience: 2500
    }), teamBuilderEl);
  }
});
