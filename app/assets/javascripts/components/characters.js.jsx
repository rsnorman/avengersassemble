var Characters = React.createClass({

  render: function() {
    var createItem = function(character, index) {
      return <div key={character.id} className="character-result large-3 small-6 columns">
        <img src={character.thumbnail.path + '.' + character.thumbnail.extension} />
        <h6 className="panel">{character.name}</h6>
      </div>;
    };

    return <ul>{this.props.characters.map(createItem)}</ul>;
  }

});
