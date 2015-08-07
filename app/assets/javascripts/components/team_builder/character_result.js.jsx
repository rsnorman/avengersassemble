var React      = require('react');
var mui        = require('material-ui');
var ListItem   = mui.ListItem;
var Paper      = mui.Paper;
var Avatar     = mui.Avatar;
var IconButton = mui.IconButton;


var Character = React.createClass({

  selectCharacter: function(event) {
    event.preventDefault();

    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(this.props.character);
    }
  },

  render: function() {
    var characterId;
    characterId = 'character_result_' + this.props.character.id;

    return (
      <Paper zDepth={1} className="character-result" id={characterId}>
        <ListItem
          leftAvatar={
            <Avatar src={this.props.character.thumbnail_url} />
          }
          rightIconButton={
            <IconButton>
              <i className="material-icons md-light">add_box</i>
            </IconButton>
          }
          primaryText={
            <span className="character-name">
              {this.props.character.name}
            </span>
          }
          secondaryText={
            <p>
              <span className="real-name">
                {this.props.character.real_name}
              </span>
              <br/>
              <span className="description">
                {this.props.character.description}
              </span>
            </p>
          }
          secondaryTextLines={2}
          onClick={this.selectCharacter} />
      </Paper>
    );
  }

});

module.exports = Character;
