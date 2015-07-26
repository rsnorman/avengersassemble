var React     = require('react');
var debounce  = require('debounce');
var mui       = require('material-ui');
var Paper     = mui.Paper;
var TextField = mui.TextField;

var MIN_QUERY_LENGTH = 3;

var CharacterSearch = React.createClass({
  getInitialState: function() {
    return {
      text: ''
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

  render: function() {
      return (
        <Paper zDepth={2}>
          <TextField className="character-search-field" ref="searchField"
            hintText="Search Marvel Characters" fullWidth={true}
            onChange={debounce(this.searchCharacters, 500)} />
        </Paper>
      );
  }
});

module.exports = CharacterSearch;
