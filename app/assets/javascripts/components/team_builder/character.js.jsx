var React = require('react');
var mui   = require('material-ui');
var ListItem = mui.ListItem;
var Paper    = mui.Paper;
var Avatar   = mui.Avatar;
var Button = mui.Button;


var Character = React.createClass({

  selectCharacter: function(event) {
    event.preventDefault();

    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(this.props.character);
    }
  },

  render: function() {
    return (
      <Paper zDepth={1} className="character-result">
        <ListItem onClick={this.selectCharacter}>
          <div className="character">
            <Avatar src={this.props.character.thumbnail_url} size={60} />
            <div className="character-details">
              <h4>{this.props.character.name}</h4>
              <em>{this.props.character.real_name}</em>
            </div>
          </div>
        </ListItem>
      </Paper>
    );
  }

});

module.exports = Character;
