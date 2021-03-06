var React  = require('react');
var mui    = require('material-ui');
var Avatar = mui.Avatar;

var CharacterSlot;

CharacterSlot = React.createClass({

  propTypes: {
    character: React.PropTypes.any,
    onRemove:  React.PropTypes.func
  },

  removeCharacter: function() {
    if ( !!this.props.onRemove ) {
      this.props.onRemove(this.props.character);
    }
  },

  render: function() {
    var character, characterId;
    character = this.props.character;
    if ( !!character ) {
      characterId = 'team_character_' + character.id;

      return (
        <div className="team-character" id={characterId} onClick={this.removeCharacter}>
          <div className="character-avatar">
            <Avatar src={character.thumbnail_url} />
            <a href="javascript:;" className="remove-character" onClick={this.removeCharacter}>
              <Avatar icon={
                <i className="material-icons md-dark">
                  clear
                </i>
              } />
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="team-character">
          <Avatar
            icon={
              <i className="material-icons md-dark">flash_on</i>
            } />
        </div>
      );
    }
  }
});

module.exports = CharacterSlot;
