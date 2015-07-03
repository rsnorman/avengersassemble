(function(global, $) {

  var continuityTeamBuilder, matchedCharacters;
  matchedCharacters = {};
  continuityTeamBuilder = new Continuity([], function(characters, resolve, reject) {
    $.ajax({
      url: '/api/v1/characters/camaraderie',
      type: 'GET',
      dataType: 'json',
      data: {
        character_id: characters[0].id,
        other_character_id: characters[1].id
      },
      success: function(data) {
        resolve(data.total);
      },
      error: reject
    });
  });

  function alreadyMatched(matches, character, otherCharacter) {
    return character.id == otherCharacter.id ||
             (matches[character.id] && matches[character.id].indexOf(otherCharacter.id) != -1) ||
             (matches[otherCharacter.id] && [otherCharacter.id].indexOf(character.id) != -1)
  }

  function getCharacterCamaraderie(character, characters) {
    var _i, _len, _char;
    for ( _i = 0, _len = characters.length; _i < _len; _i++ ) {
      _char = characters[_i];

      if ( !alreadyMatched(matchedCharacters, _char, character) ) {
        matchedCharacters[_char.id] = matchedCharacters[_char.id] || [];
        matchedCharacters[_char.id].push(character.id);
        continuityTeamBuilder.queue([_char, character]);
      }
    }
  }

  function getTeamCamaraderie() {
    return continuityTeamBuilder;
  }

  function createTeam(teamAttributes) {
    return $.Deferred(function(defer) {
      var characterIds;
      characterIds = teamAttributes.characters.map(function(c) {
        return c.id
      });
      delete teamAttributes.characters;

      teamAttributes.character_ids = characterIds;

      $.ajax({
        url: '/api/v1/teams',
        type: 'POST',
        dataType: 'json',
        data: {
          team: teamAttributes
        },
        success: function(team) {
          defer.resolve(team);
        },
        error: function(data) {
          defer.reject(data);
        }
      });
    }).promise();
  }

  global.NewTeam = React.createClass({

    assembleTeam: function(e) {
      var team;

      e.preventDefault();

      team = JSON.parse(JSON.stringify(this.props.team));

      if ( this.props.onAssembleStart ) {
        this.props.onAssembleStart();
      }

      getTeamCamaraderie()
        .then(function(camaraderieValues) {
          var totalCamaraderie;
          totalCamaraderie =
            camaraderieValues.reduce(function(total, val) {
              return total + val;
            }, 0);

          team.total_camaraderie = totalCamaraderie;

          createTeam(team)
           .then(function(team) {
             if ( this.props.onAssembleTeamSuccess ) {
               this.props.onAssembleTeamSuccess(team);
             }
           }.bind(this))

           .fail(function(errorData) {
             console.warn('There was an error saving team', errorData);
           });

        }.bind(this))

        .progress(function(camaraderieValue) {
        })

        .catch(function(error) {
          console.error(error);
        });
    },

    componentDidUpdate: function(prevProps) {
      var newCharacter;
      if ( this.props.team.characters.length > prevProps.team.characters.length ) {
        newCharacter = this.props.team.characters[this.props.team.characters.length - 1];
        getCharacterCamaraderie(newCharacter, this.props.team.characters);
      }
    },

    render: function() {
      var createItem = function(character, index) {
        return (
          <div key={character.id} className="team-character">
            <img src={character.thumbnail_url} />
            <div className="panel">
              <h6>{character.name}</h6>
            </div>
          </div>
        );
      };

      return (
        <form id="new_team" onSubmit={this.assembleTeam}>
          <div id="new_team" className="row">
            <div className="large-12 columns">
              {this.props.team.characters.map(createItem)}
            </div>
          </div>
          <div className="row">
            <div className="large-9 columns">
              <h3>Assemble Your Avengers</h3>
              <h6>Total Experience: {this.props.team.experience}</h6>
              <ExperienceBar totalProgress={this.props.allowedExperience} currentProgress={this.props.team.experience}></ExperienceBar>
            </div>
            <div className="large-3 columns">
              <input type="submit" disabled={!this.props.team.isValid} className="expand button" value="Assemble Team" />
            </div>
          </div>
        </form>
      );
    }
  });
})(window, jQuery);
