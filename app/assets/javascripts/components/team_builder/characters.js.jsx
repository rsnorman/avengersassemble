var React     = require('react');
var Character = require('./character.js.jsx');
var mui       = require('material-ui');
var List      = mui.List;

var Characters = React.createClass({

  selectCharacter: function(character) {
    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(character);
    }
  },

  render: function() {
    var createItem = function(character, index) {
      return (
        <Character key={character.id} character={character}
          onCharacterSelect={this.selectCharacter} />
      );
    };

    return (
      <List id="character_results">
        {this.props.characters.map(createItem.bind(this))}
      </List>
    );
  }

});

module.exports = Characters;
