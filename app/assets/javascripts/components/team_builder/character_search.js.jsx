var CharacterSearch = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  onChange: function(e) {
    this.setState({
      text: e.target.value
    });
  },

  searchCharacters: function(e) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/characters',
      type: 'GET',
      dataType: 'json',
      data: {
        query: this.state.text
      },
      success: function(matchingCharacters) {
        this.props.onSearchSuccess(matchingCharacters);
      }.bind(this)
    });
  },

  render: function() {
      return <form onSubmit={this.searchCharacters}>
        <div className="row collapse">

          <div className="large-10 medium-9 small-12 columns">
            <input type="search" onChange={this.onChange} value={this.state.text} placeholder="Search Marvel Characters"/>
          </div>

          <div className="large-2 medium-3 small-12 columns">
            <input type="submit" className="postfix button expand" value="Search" />
          </div>

        </div>
      </form>;
  }
});

module.exports = CharacterSearch;
