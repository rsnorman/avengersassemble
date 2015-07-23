/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Notifier     = __webpack_require__(2);
	var TeamBuilder  = __webpack_require__(3);
	var TeamRankings = __webpack_require__(11);


	$(document).on('ready page:load', function() {
	  var notificationsEl;
	  notificationsEl = document.createElement('div');
	  document.body.appendChild(notificationsEl);
	  React.render(React.createElement(Notifier), notificationsEl);
	});

	$(document).on('ready page:load', function() {
	  var teamRankingsEl;
	  teamRankingsEl = document.getElementById('team_rankings');

	  if ( teamRankingsEl ) {
	    React.render(React.createElement(TeamRankings), teamRankingsEl);
	  }
	});

	$(document).on('ready page:load', function() {
	  var teamBuilderEl;
	  teamBuilderEl = document.getElementById('team_builder');

	  if ( teamBuilderEl ) {
	    React.render(React.createElement(TeamBuilder, {
	      maxSize: 5,
	      maxExperience: 2500
	    }), teamBuilderEl);
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Notifier, removeTimer;

	Notifier = React.createClass({displayName: "Notifier",

	  getInitialState: function() {
	    return {
	      message: null,
	      type: null,
	      visible: false
	    };
	  },

	  componentDidMount: function() {

	    PubSub.subscribe( 'notification', function(eventName, message) {

	      this.setState({
	        message: message.text,
	        type: message.type,
	        visible: true,
	        remove: false
	      });

	      removeTimer = setTimeout(function() {
	        this.setState({
	          remove: true
	        });

	      }.bind(this), 5000)

	    }.bind(this) );

	  },

	  close: function(event) {
	    event.preventDefault();

	    if (removeTimer) {
	      clearTimeout(removeTimer);
	    }

	    this.setState({
	      remove: true
	    });
	  },

	  render: function() {
	    var classes, animatedClasses;

	    classes = this.state.type;

	    if ( this.state.visible && !this.state.remove ) {

	      if (removeTimer) {
	        clearTimeout(removeTimer);
	      }

	      classes += ' visible';
	      animatedClasses = 'animated flipInX';

	    } else if ( this.state.remove ) {

	      classes += ' visible';
	      animatedClasses = 'animated flipOutX';

	      setTimeout(function() {
	        this.setState({
	          visible: false,
	          remove: false
	        });
	      }.bind(this), 750);

	    }

	    return (
	      React.createElement("div", {id: "notifications", className: classes}, 
	        React.createElement("div", {id: "notifications-top-center", className: animatedClasses}, 
	          this.state.message, 
	          React.createElement("a", {id: "notifications-top-center-close", href: "#", onClick: this.close}, 
	            React.createElement("i", {className: "fi-x"})
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Notifier;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CharacterSearch     = __webpack_require__(4);
	var Characters          = __webpack_require__(5);
	var NewTeam             = __webpack_require__(7);
	var TeamCreator = __webpack_require__(9);

	var TeamBuilder, feedbackMessages;
	feedbackMessages = [];
	TeamBuilder = React.createClass({displayName: "TeamBuilder",

	  getInitialState: function() {
	    if ( !localStorage.team ) {
	      return {
	        characters: [],
	        team: {
	          characters: [],
	          experience: 0
	        }
	      };
	    } else {
	      return {
	        characters:[],
	        //team: JSON.parse(localStorage.team)
	        team: {
	          characters: [],
	          experience: 0
	        },
	      };
	    }
	  },

	  showCharacters: function(characters) {
	    this.setState({
	      characters: characters
	    });
	  },

	  addCharacterToTeam: function(character) {
	    var team;
	    team = JSON.parse(JSON.stringify(this.state.team));

	    if ( this.props.maxSize > this.state.team.characters.length ) {

	      if ( this.props.maxExperience > this.state.team.experience + character.experience ) {

	        team.characters.push(character);
	        team.experience += character.experience;

	        PubSub.publish( 'notification', {
	          text: 'Added ' + character.name + ' to team',
	          type: 'success'
	        } );

	        if ( this.props.maxSize === team.characters.length ) {
	          team.isValid = true
	        }

	        localStorage.team = JSON.stringify(team);

	      } else {
	        PubSub.publish( 'notification', {
	          text: 'Too powerful of a team',
	          type: 'error'
	        } );
	      }

	    } else {
	      PubSub.publish('notification', {
	        text: 'Too many team members',
	        type: 'error'
	      });
	    }

	    this.setState({
	      team: team
	    });
	  },

	  startAssemblingTeam: function() {
	    this.setState({
	      creatingTeam: true
	    });
	  },

	  teamAssembled: function(team) {
	    this.setState({
	      creatingTeam: false
	    });
	    PubSub.publish('notification', {
	      text: 'Team create successfully',
	      type: 'success'
	    });
	  },

	  goToLeaderboard: function(team) {
	    window.location = '/teams?active=' + team.id;
	  },

	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "large-12 columns"}, 
	            React.createElement(NewTeam, {team: this.state.team, onAssembleTeam: this.startAssemblingTeam, allowedExperience: this.props.maxExperience})
	          )
	        ), 

	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "large-12 columns"}, 
	            React.createElement("div", {className: "radius panel"}, 
	              React.createElement(CharacterSearch, {onSearchSuccess: this.showCharacters})
	            )
	          )
	        ), 

	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "row"}, 
	            React.createElement("div", {className: "large-12 columns"}, 
	              React.createElement(Characters, {onCharacterSelect: this.addCharacterToTeam, characters: this.state.characters})
	            )
	          )
	        ), 
	        React.createElement(TeamCreatorFeedback, {start: this.state.creatingTeam, onCreate: this.goToLeaderboard, team: this.state.team})
	      )
	    );
	  }
	});

	module.exports = TeamBuilder;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var CharacterSearch = React.createClass({displayName: "CharacterSearch",
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
	      return React.createElement("form", {onSubmit: this.searchCharacters}, 
	        React.createElement("div", {className: "row collapse"}, 

	          React.createElement("div", {className: "large-10 medium-9 small-12 columns"}, 
	            React.createElement("input", {type: "search", onChange: this.onChange, value: this.state.text, placeholder: "Search Marvel Characters"})
	          ), 

	          React.createElement("div", {className: "large-2 medium-3 small-12 columns"}, 
	            React.createElement("input", {type: "submit", className: "postfix button expand", value: "Search"})
	          )

	        )
	      );
	  }
	});

	module.exports = CharacterSearch;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Character = __webpack_require__(6);

	var Characters = React.createClass({displayName: "Characters",

	  mixins: [
	    MasonryMixin('masonryContainer', {
	      transitionDuration: 0
	    })
	  ],

	  selectCharacter: function(character) {
	    if (this.props.onCharacterSelect) {
	      this.props.onCharacterSelect(character);
	    }
	  },

	  render: function() {
	    var createItem = function(character, index) {
	      return (
	        React.createElement(Character, {key: character.id, character: character, onCharacterSelect: this.selectCharacter})
	      );
	    };

	    return (
	      React.createElement("div", {id: "character_results", ref: "masonryContainer"}, 
	        this.props.characters.map(createItem.bind(this))
	      )
	    );
	  }

	});

	module.exports = Characters;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Character = React.createClass({displayName: "Character",

	  selectCharacter: function(event) {
	    event.preventDefault();

	    if (this.props.onCharacterSelect) {
	      this.props.onCharacterSelect(this.props.character);
	    }
	  },

	  render: function() {
	    return (
	      React.createElement("div", {className: "character-result"}, 
	        React.createElement("a", {href: "#", onClick: this.selectCharacter}, 
	          React.createElement("i", {className: "fi-plus"})
	        ), 
	        React.createElement("img", {src: this.props.character.thumbnail_url}), 
	        React.createElement("div", {className: "panel"}, 
	          React.createElement("h4", null, this.props.character.name), 
	          React.createElement("h6", null, this.props.character.soldier_type), 
	          React.createElement("em", null, this.props.character.real_name), 
	          React.createElement("p", null, this.props.character.description)
	        )
	      )
	    );
	  }

	});

	module.exports = Character;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var ExperienceBar = __webpack_require__(8);

	var NewTeam;

	NewTeam = React.createClass({displayName: "NewTeam",

	  assembleTeam: function(event) {
	    event.preventDefault();
	    if ( this.props.onAssembleTeam ) {
	      this.props.onAssembleTeam();
	    }
	  },

	  render: function() {
	    var createItem = function(character, index) {
	      return (
	        React.createElement("div", {key: character.id, className: "team-character"}, 
	          React.createElement("img", {src: character.thumbnail_url}), 
	          React.createElement("div", {className: "panel"}, 
	            React.createElement("h6", null, character.name)
	          )
	        )
	      );
	    };

	    return (
	      React.createElement("form", {id: "new_team", onSubmit: this.assembleTeam}, 
	        React.createElement("div", {id: "new_team", className: "row"}, 
	          React.createElement("div", {className: "large-12 columns"}, 
	            this.props.team.characters.map(createItem)
	          )
	        ), 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "large-9 columns"}, 
	            React.createElement("h3", null, "Assemble Your Avengers"), 
	            React.createElement("h6", null, "Total Experience: ", this.props.team.experience), 
	            React.createElement(ExperienceBar, {totalProgress: this.props.allowedExperience, currentProgress: this.props.team.experience})
	          ), 
	          React.createElement("div", {className: "large-3 columns"}, 
	            React.createElement("input", {type: "submit", disabled: !this.props.team.isValid, className: "expand button", value: "Assemble Team"})
	          )
	        )
	      )
	    );
	  }

	});

	module.exports = NewTeam;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var ExperienceBar = React.createClass({displayName: "ExperienceBar",

	  getPercent: function() {
	    return this.props.currentProgress / this.props.totalProgress * 100;
	  },

	  render: function() {
	    return (
	      React.createElement("div", {className: "experience-progress-bar-container"}, 
	        React.createElement("div", {className: "experience-progress-bar", style: {width: this.getPercent() + '%'}}
	        )
	      )
	    );
	  }

	});

	module.exports = ExperienceBar;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Continuity = __webpack_require__(10);

	var TeamCreator, continuityTeamBuilder, matchedCharacters;

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

	TeamCreatorFeedback = React.createClass({displayName: "TeamCreatorFeedback",

	  propTypes: {
	    messages: React.PropTypes.array
	  },

	  getInitialState: function() {
	    return {
	      finishedCreating: false
	    };
	  },

	  componentWillReceiveProps: function(nextProps) {
	    if ( !this.props.start && nextProps.start ) {
	      this.assembleTeam();
	    }
	  },

	  assembleTeam: function() {
	    var team;

	    team = JSON.parse(JSON.stringify(this.props.team));

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
	           if ( this.props.onCreate ) {
	             this.props.onCreate(team);
	           }
	         }.bind(this))

	         .fail(function(errorData) {
	           console.warn('There was an error saving team', errorData);
	         });

	      }.bind(this))

	      .progress(function(camaraderieValue, characters) {
	        if ( !!this.props.onAssembleTeamProgress ) {
	          this.props.onAssembleTeamProgress(characters);
	        }
	      }.bind(this))

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
	    var className;
	    if ( this.props.start ) {
	      className = 'visible';
	    }

	    return (
	      React.createElement("div", {id: "team_creator_feedback", className: className}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "large-12 columns"}, 
	            React.createElement("div", {id: "loader"}
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TeamCreator;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*!
	 * Continuity
	 * Copyright(c) 2015 Ryan Scott Norman
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Creates an object that iterates over a collection and passing values
	 * into asynchronous functions that resolve or reject promises. Each function
	 * must wait until the previous one has finished before starting.
	 *
	 * To create a Continuity object:
	 *
	 *       new Continuity([1, 2], function(value, resolve, reject) {
	 *
	 *         setTimeout(function() {
	 *           if ( isNaN(value) ) {
	 *             reject('Cannot operate on ' + value + ' because it\'s not a number');
	 *           } else {
	 *             resolve(value + 1);
	 *           }
	 *         }, 1000);
	 *
	 *       });
	 *
	 * The `then` method will return all the values resolved by the promises:
	 *
	 *       new Continuity([1, 2], function(value, resolve) {
	 *
	 *         setTimeout(function() {
	 *           resolve(value + 1);
	 *         }, 1000);
	 *
	 *       }).then(function(values) {
	 *
	 *         assert(values == [2, 3]);
	 *
	 *       });
	 *
	 * The `progress` method will return the value resolved by the current
	 * executing promise along with the original value, all the returned
	 * values and progress:
	 *
	 *       new Continuity([1, 2], function(value, resolve) {
	 *
	 *         setTimeout(function() {
	 *           resolve(value + 1);
	 *         }, 1000);
	 *
	 *       }).progress(function(value, originalValue, values, progress) {
	 *
	 *         // First iteration
	 *         if ( progress == 1 ) {
	 *           assert(value == 2);
	 *           assert(originalValue == 1);
	 *           assert(values == [2]);
	 *           assert(progress == 1);
	 *         }
	 *
	 *         // Second iteration
	 *         else {
	 *           assert(value == 3);
	 *           assert(originalValue == 2);
	 *           assert(values == [2, 3]);
	 *           assert(progress == 2);
	 *         }
	 *
	 *       });
	 *
	 * The `catch` method behaves like a Promise in that it returns the object that
	 * that caused the promise to reject, effectively stopping the iterator.
	 *
	 *       new Continuity([1, 2], function(value, resolve, reject) {
	 *
	 *         setTimeout(function() {
	 *           reject('Dislike this value: ' + value);
	 *         }, 1000);
	 *
	 *       }).catch(function(error) {
	 *
	 *         assert(error == 'Dislike this value: 1');
	 *
	 *       });
	 *
	 * @param {Array} collection that will be used to call function
	 * @param {Function} asynchronous function that will be called for each value
	 *                   in the collection
	 * @return {Continuity} for thenable methods and progress callback
	 * @public
	 */
	var Continuity = function(originalCollection, iterationFn) {
	  var continuityPromise,
	      continuityResolve,
	      continuityReject,
	      progressCallbacks,
	      valueQueue,
	      resolvedValues,
	      isRunningPromise,
	      errorValue,
	      _continuity;

	  // Store scope
	  _continuity = this;

	  // Empty array of progress callbacks
	  progressCallbacks = [];

	  // Initialize empty array of values
	  resolvedValues = [];

	  // Clone collection to create queue of values to call iteration function
	  valueQueue = Array.prototype.slice.call(originalCollection);


	  /**
	   * Returns whether or not there are any values left in the queue
	   *
	   * @return {Bool} true if valueQueue length is greater than zero,
	   *                false otherwise
	   * @private
	   */
	  function isFinishedIterating() {
	    return valueQueue.length == 0 && !isRunningPromise;
	  }

	  /**
	   * Pushes new value into values array and fires all progress callbacks
	   *
	   * @param {Any} The value that is resolved from asynchronous function
	   * @private
	   */
	  function onSuccessIteration(resolvedValue) {
	    isRunningPromise = false;

	    resolvedValues.push(resolvedValue); // push newest value

	    // fire all progress callbacks on each iteration
	    progressCallbacks.map(function(callback) {
	      callback(
	        resolvedValue,
	        originalCollection[resolvedValues.length -1],
	        resolvedValues,
	        resolvedValues.length
	      );
	    });
	  }

	  /**
	   * Recursive function that queues up functions that resolve or reject promises
	   * with values in collection
	   *
	   * @private
	   */
	  function collectionIterator() {
	    var iterationPromise;

	    isRunningPromise = true;

	    // Create iteration promise to pass resolver and rejecter into function. The
	    // iteration function is called with the first element of the collection.
	    iterationPromise = new Promise(function(iterationResolve, iterationReject) {
	      iterationFn(valueQueue.shift(), iterationResolve, iterationReject)
	    });

	    // Resolved iteration
	    iterationPromise.then(function(resolvedValue) {
	      onSuccessIteration(resolvedValue);

	      if ( !isFinishedIterating() ) {
	        collectionIterator();
	      } else {
	        if ( !!continuityResolve ) {
	          continuityResolve(resolvedValues);
	        }
	      }

	    });

	    // Rejected iteration
	    iterationPromise.catch(function(_errorValue) {
	      errorValue = _errorValue;
	      isRunningPromise = false;

	      if ( !!continuityReject ) {
	        continuityReject(errorValue);
	      }
	    });

	  }

	  /**
	   * Create promise to resolve once all other promises are resolved.
	   * Store resolve and reject functions so we can chain with a Promise-like
	   * object.
	   */
	  function createContinuityPromise() {
	    continuityPromise = new Promise(function(resolve, reject) {
	      continuityResolve = resolve;
	      continuityReject = reject;
	    });
	  }


	  /**
	   * @method then
	   *
	   * Adds resolve and reject callbacks that behave exactly like Promise
	   * `then` method
	   *
	   * Without reject callback:
	   *
	   *       new Continuity([1, 2], function(value, resolve) {
	   *
	   *         setTimeout(function() {
	   *           resolve(value + 1);
	   *         }, 1000);
	   *
	   *       }).then(function(values) {
	   *
	   *         assert(values == [2, 3]);
	   *
	   *       });
	   *
	   * With reject callback:
	   *
	   *       new Continuity([1, 2, 'George'], function(value, resolve, reject) {
	   *
	   *         setTimeout(function() {
	   *           if ( isNaN(value) ) {
	   *             reject('Cannot operate on ' + value + ' because it\'s not a number');
	   *           } else {
	   *             resolve(value + 1);
	   *           }
	   *         }, 1000);
	   *
	   *       }).then(function(values) {
	   *
	   *         assert(values == [2, 3]);
	   *
	   *       }, function(error) {
	   *
	   *         console.warn("There was an error!", error);
	   *
	   *       });
	   *
	   * @param {Function} asynchronous function that will be called with
	   *                   resolved value
	   * @param {Function} asynchronous function that will be called with
	   *                   error value
	   * @return {Continuity} for thenable methods and progress callback
	   * @public
	   */
	  this.then = function(resolveCallback, rejectCallback) {
	    if ( !continuityPromise ) {
	      createContinuityPromise();
	    }

	    continuityPromise.then(resolveCallback, rejectCallback);

	    if ( isFinishedIterating() ) {
	      continuityResolve(resolvedValues);
	    }

	    return _continuity;
	  };

	  /**
	   * @method catch
	   *
	   * Adds reject callback that behave exactly like Promise `catch` method
	   *
	   *       new Continuity([1, 2], function(value, resolve, reject) {
	   *
	   *         setTimeout(function() {
	   *           if ( isNaN(value) ) {
	   *             reject('Cannot operate on ' + value + ' because it\'s not a number');
	   *           } else {
	   *             resolve(value + 1);
	   *           }
	   *         }, 1000);
	   *
	   *       }).catch(function(error) {
	   *
	   *         console.warn("There was an error!", error);
	   *
	   *       });
	   *
	   * @param {Function} asynchronous function that will be called with
	   *                   error value
	   * @return {Continuity} for thenable methods and progress callback
	   * @public
	   */
	  this.catch = function(callback) {
	    if ( !continuityPromise ) {
	      createContinuityPromise();
	    }
	    continuityPromise.catch(callback);

	    if ( !!errorValue ) {
	      continuityReject(errorValue);
	    }

	    return _continuity;
	  };

	  /**
	   * @method progress
	   *
	   * Adds progress callback that is called for each iteration of collection.
	   * The callback will be called with resolved value, original value, all
	   * resolved values, and the current progress.
	   *
	   *       new Continuity([1, 2], function(value, resolve) {
	   *
	   *         setTimeout(function() {
	   *           resolve(value + 1);
	   *         }, 1000);
	   *
	   *       }).progress(function(value, originalValue, values, progress) {
	   *
	   *         // First iteration
	   *         if ( progress == 1 ) {
	   *           assert(value == 2);
	   *           assert(originalValue == 1);
	   *           assert(values == [2]);
	   *           assert(progress == 1);
	   *         }
	   *
	   *         // Second iteration
	   *         else {
	   *           assert(value == 3);
	   *           assert(originalValue == 2);
	   *           assert(values == [2, 3]);
	   *           assert(progress == 2);
	   *         }
	   *
	   *       });
	   *
	   * @param {Function} asynchronous function that will be called with resolved
	   *                   value, original value, all resolved values, and the
	   *                   current progress
	   * @return {Continuity} for thenable methods and progress callback
	   * @public
	   */
	  this.progress = function(callback) {
	    resolvedValues.map(function(resolvedValue, index) {
	      callback(
	        resolvedValue,
	        originalCollection[index],
	        resolvedValues.slice(0, index + 1),
	        index + 1
	      );
	    });

	    progressCallbacks.push(callback);
	    return _continuity;
	  };

	  /**
	   * @method queue
	   *
	   * Queues value that will trigger another asynchronous function.
	   * Cannot queue another value if then or catch callback have been
	   * attached since promise can only be resolved once.
	   *
	   * @param {Any} value that will trigger another asynchronous function
	   * @public
	   */
	  this.queue = function(value) {
	    var hasResolvedAllValues;

	    if ( !!continuityPromise ) {
	      throw new Error('All values resolved, cannot push another value');
	    }

	    hasResolvedAllValues = isFinishedIterating();

	    valueQueue.push(value);
	    originalCollection.push(value);

	    if ( hasResolvedAllValues ) {
	      collectionIterator();
	    }

	    return _continuity;
	  };


	  // Start iterating through collection
	  if ( valueQueue.length > 0 ) {
	    collectionIterator();
	  }

	};

	/**
	 * Module exports
	 * @public
	 */
	module.exports = Continuity;


/***/ },
/* 11 */
/***/ function(module, exports) {

	var TeamRankings = React.createClass({displayName: "TeamRankings",
	  getInitialState: function() {
	    return {
	      isLoading: true,
	      teams: []
	    };
	  },

	  componentDidMount: function() {
	    $.ajax({
	      url: '/api/v1/teams',
	      dataType: 'json',
	      success: function(data) {
	        this.setState({
	          isLoading: false,
	          teams: data.results
	        });
	      }.bind(this)
	    });
	  },

	  render: function() {
	    var createCharacter = function(character, index) {
	      return (
	        React.createElement("div", {className: "ranking-character large-2 medium-2 small-2 columns", key: character.id}, 
	          React.createElement("img", {src: character.thumbnail_url}), 
	          React.createElement("div", {className: "panel"}, 
	            React.createElement("strong", null, character.name)
	          )
	        )
	      );
	    };

	    var createTeam = function(team, index) {
	      return (
	        React.createElement("div", {className: "ranking-team row", key: team.id}, 
	          React.createElement("div", {className: "large-12 columns"}, 
	            React.createElement("h5", null, team.name), 
	            React.createElement("div", {className: "row"}, 
	              team.characters.map(createCharacter.bind(this)), 
	              React.createElement("div", {className: "large-2 medium-2 small-2"})
	            ), 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "large-12"}, 
	                React.createElement("strong", null, "Score:"), 
	                Math.round(team.score)
	              )
	            )
	          )
	        )
	      );
	    };

	    return (
	      React.createElement("div", null, 
	        this.state.teams.map(createTeam.bind(this))
	      )
	    );
	  }
	});

	module.exports = TeamRankings


/***/ }
/******/ ]);