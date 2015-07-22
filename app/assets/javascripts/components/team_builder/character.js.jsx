var Character = React.createClass({

  selectCharacter: function(event) {
    event.preventDefault();

    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(this.props.character);
    }
  },

  render: function() {
    return (
      <div className="character-result">
        <a href="#" onClick={this.selectCharacter}>
          <i className="fi-plus"></i>
        </a>
        <img src={this.props.character.thumbnail_url} />
        <div className="panel">
          <h4>{this.props.character.name}</h4>
          <h6>{this.props.character.soldier_type}</h6>
          <em>{this.props.character.real_name}</em>
          <p>{this.props.character.description}</p>
        </div>
      </div>
    );
  }

});

module.exports = Character;
