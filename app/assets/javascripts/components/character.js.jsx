var Character = React.createClass({

  selectCharacter: function() {
    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(this.props.character);
    }
  },

  render: function() {
    return (
      <div className="character-result">
        <a onClick={this.selectCharacter}>
          <i className="fi-plus"></i>
        </a>
        <img src={this.props.character.thumbnail_url} />
        <div className="panel">
          <h4>{this.props.character.name}</h4>
          <strong>{this.props.character.real_name}</strong>
          <table>
            <tbody>
              <tr>
                <td className='rating'>Strength</td>
                <td>{this.props.character.strength_rating}</td>
              </tr>
              <tr>
                <td className='rating'>Speed</td>
                <td>{this.props.character.speed_rating}</td>
              </tr>
              <tr>
                <td className='rating'>Intelligence</td>
                <td>{this.props.character.intelligence_rating}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

});
