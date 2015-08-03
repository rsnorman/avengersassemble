var React           = require('react');
var CharacterResult = require('./character_result.js.jsx');
var mui             = require('material-ui');
var List            = mui.List;

var CharacterResults = React.createClass({

  selectCharacter: function(character) {
    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(character);
    }
  },

  render: function() {
    var createItem = function(character, index) {
      return (
        <CharacterResult
          key={character.id}
          character={character}
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

module.exports = CharacterResults;
