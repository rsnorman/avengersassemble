var React  = require('react');
var mui    = require('material-ui');

var List           = mui.List;
var ListItem       = mui.ListItem;
var FontIcon       = mui.FontIcon;
var Paper          = mui.Paper;
var LinearProgress = mui.LinearProgress;
var Avatar         = mui.Avatar;
var Character      = require('./character.js.jsx');


var Team = React.createClass({

  propTypes: {
    team:     React.PropTypes.object.isRequired,
    maxScore: React.PropTypes.number.isRequired
  },

  render: function() {
    var scorePercent, team;
    team = this.props.team;
    scorePercent = Math.round(team.score / this.props.maxScore * 100);

    function createCharacter(character, index) {
      return <Character character={character} key={index} />
    }

    return (
      <Paper zDepth={1} className="ranking-team-container">
        <ListItem>
          <div className="ranking-team">
            <div className="leader-icon">
              <Avatar src={team.leader.image + '?type=large'} size={60}/>
            </div>
            <div className="team-details">
              <div className="team-name">{team.name}</div>
              <LinearProgress mode="determinate" value={scorePercent} />
              <div className="team-characters">
                {team.characters.map(createCharacter.bind(this))}
              </div>
            </div>
          </div>
        </ListItem>
      </Paper>
    );
  }
});

module.exports = Team;
