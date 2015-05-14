var Characters = React.createClass({

  mixins: [
    MasonryMixin('masonryContainer', {
      transitionDuration: 0
    })
  ],

  render: function() {
    var createItem = function(character, index) {
      return <div key={character.id} className="character-result">
        <img src={character.thumbnail_url} />
        <div className="panel">
          <h4>{character.name}</h4>
          <strong>{character.real_name}</strong>
          <table>
            <tbody>
              <tr>
                <td className='rating'>Strength</td>
                <td>{character.strength_rating}</td>
              </tr>
              <tr>
                <td className='rating'>Speed</td>
                <td>{character.speed_rating}</td>
              </tr>
              <tr>
                <td className='rating'>Intelligence</td>
                <td>{character.intelligence_rating}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>;
    };

    return <div id="character_results" ref="masonryContainer">
      {this.props.characters.map(createItem)}
    </div>;
  }

});
