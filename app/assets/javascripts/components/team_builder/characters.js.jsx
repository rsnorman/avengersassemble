var Character = require('./character.js.jsx');

var Characters = React.createClass({

  mixins: [
    MasonryMixin('masonryContainer', {
      transitionDuration: 0
    })
  ],

  selectCharacter: function(character) {
    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(character);
    }
  },

  render: function() {
    var createItem = function(character, index) {
      return (
        <Character key={character.id} character={character} onCharacterSelect={this.selectCharacter}></Character>
      );
    };

    return (
      <div id="character_results" ref="masonryContainer">
        {this.props.characters.map(createItem.bind(this))}
      </div>
    );
  }

});

module.exports = Characters;
