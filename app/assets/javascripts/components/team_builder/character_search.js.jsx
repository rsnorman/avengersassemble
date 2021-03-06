var React     = require('react');
var debounce  = require('debounce');
var mui       = require('material-ui');
var Paper     = mui.Paper;
var TextField = mui.TextField;

var MIN_QUERY_LENGTH = 3;

var CharacterSearch = React.createClass({
  getInitialState: function() {
    return {
      clearSearch: false
    };
  },

  searchCharacters: function searchCharacters() {
    var characterQuery;
    characterQuery = this.refs.searchField.getValue();

    if ( characterQuery.length < MIN_QUERY_LENGTH ) {
      return;
    }

    $.ajax({
      url: '/api/v1/characters',
      type: 'GET',
      dataType: 'json',
      data: {
        query: this.refs.searchField.getValue()
      },
      success: function(matchingCharacters) {
        this.props.onSearchSuccess(matchingCharacters);
      }.bind(this)
    });
  },

  reset: function() {
    this.setState({
      clearSearch: true
    });
  },

  clearText: function() {
    if ( this.state.clearSearch ) {
      this.setState({
        clearSearch: false
      });
      this.refs.searchField.setValue('');
    }
  },

  render: function() {
      return (
        <Paper zIndex={1}>
          <TextField
            name="character-search"
            className="character-search-field"
            ref="searchField"
            hintText="Search Marvel Characters"
            fullWidth={true}
            onChange={debounce(this.searchCharacters, 500)}
            onFocus={this.clearText} />
        </Paper>
      );
  }
});

module.exports = CharacterSearch;
