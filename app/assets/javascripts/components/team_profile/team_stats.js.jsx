var React          = require('react');
var mui            = require('material-ui');
var List           = mui.List;
var Paper          = mui.Paper;
var ListItem       = mui.ListItem;
var LinearProgress = mui.LinearProgress;

var TeamStats;

TeamStats = React.createClass({

  propTypes: {
    stats:    React.PropTypes.object.isRequired,
    maxStats: React.PropTypes.object.isRequired
  },

  render: function() {
    var createStat, createStats, maxStats;
    maxStats = this.props.maxStats;

    createStats = function createStats(stats) {
      var statEls;
      statEls = [];
      for ( statName in stats ) {
        statEls.push(createStat(statName, stats[statName]));
      }

      return statEls;
    };

    createStat = function createStat(statName, statValue) {
      var statPercent;
      statPercent = Math.round(statValue / maxStats[statName] * 100);

      console.log(statPercent, statValue, statName, maxStats[statName]);

      return (
        <ListItem
          id={statName + '_stat'}
          key={statName}
          primaryText={statName}
          secondaryText={
            <LinearProgress
              className="stat-bar"
              mode="determinate"
              value={statPercent} />
          } />
      );
    };

    return (
      <Paper id="team_stats">
        <List>
          {createStats(this.props.stats)}
        </List>
      </Paper>
    );
  }

});

module.exports = TeamStats;
