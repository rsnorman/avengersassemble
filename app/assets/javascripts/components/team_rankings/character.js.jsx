var React  = require('react');
var mui    = require('material-ui');
var Avatar = mui.Avatar;


var Character = React.createClass({

  propTypes: {
    character: React.PropTypes.object.isRequired
  },

  render: function() {
    var character;
    character = this.props.character;

    return (
      <Avatar className="team-character" src={character.thumbnail_url} size={40} key={character.id} />
    );
  }
});

module.exports = Character;
