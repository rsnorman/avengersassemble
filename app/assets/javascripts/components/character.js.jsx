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
          <h6>{this.props.character.soldier_type}</h6>
          <em>{this.props.character.real_name}</em>
          <table>
            <tbody>
              <tr>
                <td className='rating'>Strength</td>
                <td>{this.props.character.ratings.strength}</td>
              </tr>
              <tr>
                <td className='rating'>Speed</td>
                <td>{this.props.character.ratings.speed}</td>
              </tr>
              <tr>
                <td className='rating'>Intelligence</td>
                <td>{this.props.character.ratings.intelligence}</td>
              </tr>
              <tr>
                <td className='rating'>Fighting</td>
                <td>{this.props.character.ratings.fighting}</td>
              </tr>
              <tr>
                <td className='rating'>Durability</td>
                <td>{this.props.character.ratings.durability}</td>
              </tr>
              <tr>
                <td className='rating'>Energy</td>
                <td>{this.props.character.ratings.energy}</td>
              </tr>
              <tr>
                <td className='rating'>Experience</td>
                <td>{this.props.character.experience}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

});
