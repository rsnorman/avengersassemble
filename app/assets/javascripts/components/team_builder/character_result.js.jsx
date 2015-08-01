var React      = require('react');
var mui        = require('material-ui');
var ListItem   = mui.ListItem;
var Paper      = mui.Paper;
var Avatar     = mui.Avatar;
var IconButton = mui.IconButton;


var Character = React.createClass({

  selectCharacter: function(event) {
    event.preventDefault();

    if (this.props.onCharacterSelect) {
      this.props.onCharacterSelect(this.props.character);
    }
  },

  render: function() {
    return (
      <Paper zDepth={1} className="character-result">
        <ListItem
          leftAvatar={
            <Avatar src={this.props.character.thumbnail_url} />
          }
          rightIconButton={
            <IconButton>
              <i className="material-icons md-light">add_box</i>
            </IconButton>
          }
          primaryText={this.props.character.name}
          secondaryText={
            <p>
              <span>
                {this.props.character.real_name}
              </span>
              <br/>
              {this.props.character.description}
            </p>
          }
          secondaryTextLines={2}
          onClick={this.selectCharacter} />
      </Paper>
    );
  }

});

module.exports = Character;
