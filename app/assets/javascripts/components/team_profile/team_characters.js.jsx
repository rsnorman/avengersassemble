var React    = require('react');
var mui      = require('material-ui');
var List     = mui.List;
var Paper    = mui.Paper;
var ListItem = mui.ListItem;
var Avatar   = mui.Avatar;

var TeamCharacters;

TeamCharacters = React.createClass({

  propTypes: {
    characters: React.PropTypes.array.isRequired,
  },

  render: function() {
    var renderCharacter;

    renderCharacter = function renderCharacter(character) {
      return (
        <ListItem
          className="team-profile-character"
          key={character.id}
          leftAvatar={
            <Avatar
              className="character-avatar"
              src={character.thumbnail_url} />
          }
          primaryText={
            <span className="character-name">
              {character.name}
            </span>
          }
          secondaryText={
            <p>
              <span className="character-real-name">
                {character.real_name}
              </span>
              <br />
              <span className="character-description">
                {character.description}
              </span>
            </p>
          }
          secondaryTextLines={2} />
      );
    };

    return (
      <Paper id="team_profile_characters">
        <List>
          {this.props.characters.map(renderCharacter)}
        </List>
      </Paper>
    );
  }

});

module.exports = TeamCharacters;
