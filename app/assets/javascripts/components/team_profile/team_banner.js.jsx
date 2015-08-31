var React       = require('react');
var Dicer       = require('arc-dicer');
var ReactCanvas = require('react-canvas');
var mui         = require('material-ui');
var Surface     = ReactCanvas.Surface;
var Image       = ReactCanvas.Image;
var Text        = ReactCanvas.Text;
var Layer       = ReactCanvas.Layer;
var Group       = ReactCanvas.Group;

var TeamBanner;
var OPTIMAL_BANNER_WIDTH  = 1200;
var OPTIMAL_BANNER_HEIGHT = 630;
var CHARACTER_MARGIN      = 10;

TeamBanner = React.createClass({

  propTypes: {
    team:             React.PropTypes.object.isRequired,
    maxStats:         React.PropTypes.object.isRequired,
    visible:          React.PropTypes.bool.isRequired,
    onRenderComplete: React.PropTypes.func
  },

  getDataURL: function() {
    return this.refs.bannerImage.getDOMNode().toDataURL();
  },

  render: function() {
    return (
      <div id="team_banner">
        {this._renderBannerCanvas()}
      </div>
    );
  },

  _renderBannerCanvas: function() {
    var surfaceWidth  = OPTIMAL_BANNER_WIDTH;
    var surfaceHeight = OPTIMAL_BANNER_HEIGHT;
    var characterSrc  = this.props.team.characters[0].thumbnail_url;

    var slices = new Dicer({
      radius:        OPTIMAL_BANNER_HEIGHT,
      sectionHeight: OPTIMAL_BANNER_HEIGHT - 50
    }).slice(this.props.team.characters.length);

    var topPosition  = slices[0].centerPosition.y + 25;
    var leftPosition = 0;

    for ( var _i = 0, _len = slices.length; _i < _len; _i++ ) {
      if ( leftPosition < slices[_i].centerPosition.x ) {
        leftPosition = slices[_i].centerPosition.x;
      }
    }

    leftPosition += 25;

    function renderCharacter(character, index) {
      var characterSrc = character.thumbnail_url;
      var slice = slices[index];
      var imageStyle   = this._getImageStyle({
        top:  topPosition - slice.centerPosition.y,
        left: leftPosition - slice.centerPosition.x
      });

      var imageSrc = '/characters/' + character.id + '/image';
      return <Image src={imageSrc} style={imageStyle} key={index} />;
    }

    function renderCharacterName(character, index) {
      var width  = OPTIMAL_BANNER_WIDTH / 2 - 200;
      var height = 50;
      var slice  = slices[index];

      var groupTextStyle = {
        top:    topPosition  - slice.endPosition.y - 15,
        left:   leftPosition - slice.centerPosition.x + 125,
        width:  width,
        height: height
      };

      var textStyle = {
        top:      topPosition  - slice.endPosition.y - 15,
        left:     leftPosition - slice.centerPosition.x + 125,
        height:   height,
        width:    width,
        fontSize: 18,
        color:    '#ededed'
      };

      var underlineStyle = {
        top:             topPosition  - slice.endPosition.y + 15,
        left:            leftPosition - slice.centerPosition.x + 125,
        height:          1,
        width:           width,
        backgroundColor: '#F7412D'
      };

      return (
        <Group style={groupTextStyle} useBackingStore={true} key={character.id}>
          <Text style={textStyle}>
            {character.name}
          </Text>
          <Layer style={underlineStyle} />
        </Group>
      );
    }

    var statSlices = new Dicer({
      radius:        OPTIMAL_BANNER_HEIGHT,
      sectionHeight: OPTIMAL_BANNER_HEIGHT - 50
    }).slice(Object.keys(this.props.team.stats).length);

    var statTopPosition = statSlices[0].centerPosition.y + 25;
    var statLeftPosition = 0;

    for ( var _i = 0, _len = statSlices.length; _i < _len; _i++ ) {
      if ( statLeftPosition < statSlices[_i].centerPosition.x ) {
        statLeftPosition = statSlices[_i].centerPosition.x;
      }
    }

    statLeftPosition += OPTIMAL_BANNER_WIDTH / 2;

    function renderStats(stats) {
      var statsComponents = [];
      var count = 0;
      for ( stat in stats ) {
        statsComponents.push(renderStat(stat, stats[stat], this.props.maxStats[stat], count));
        count += 1;
      }

      return statsComponents;
    }

    function renderStat(statName, statValue, maxValue, index) {
      var width  = OPTIMAL_BANNER_WIDTH / 3;
      var height = 30;
      var slice  = statSlices[index];

      var groupTextStyle = {
        top:    statTopPosition  - slice.endPosition.y - 15,
        left:   statLeftPosition - slice.centerPosition.x + 25,
        width:  width,
        height: height
      };

      var textStyle = {
        top:      statTopPosition  - slice.endPosition.y - 15,
        left:     statLeftPosition - slice.centerPosition.x + 25,
        height:   height,
        width:    width,
        fontSize: 16,
        color:    '#aeaeae'
      };

      var underlineStyle = {
        top:             statTopPosition  - slice.endPosition.y + 15,
        left:            statLeftPosition - slice.centerPosition.x + 25,
        height:          10,
        width:           width,
        backgroundColor: '#F7412D',
        alpha:           0.2,
        borderRadius:    5
      };

      var statStyle = JSON.parse(JSON.stringify(underlineStyle));
      var SMALLEST_STAT_WIDTH = 10;

      statStyle.width = statValue * width / maxValue;
      if ( statStyle.width < 1 ) {
        statStyle.alpha = 0;
      } else {
        statStyle.alpha = 1;
      }

      if ( statStyle.width < SMALLEST_STAT_WIDTH ) {
        statStyle.width = SMALLEST_STAT_WIDTH;
      }

      return (
        <Group style={groupTextStyle} key={statName}>
          <Text style={textStyle} key={statName}>
            {statName}
          </Text>
          <Layer style={underlineStyle} />
          <Layer style={statStyle} />
        </Group>
      );
    }

    function warmCharacterImageCache(character) {
      return (
        <img src={'/characters/' + character.id + '/image'} key={character.id} />
      );
    }

    var team = this.props.team;

    if (this.props.visible) {

      setTimeout(function() {
        if ( this.props.onRenderComplete ) {
          this.props.onRenderComplete();
        }
      }.bind(this), 1000);

      return (
        <Surface
          ref="bannerImage"
          height={surfaceHeight}
          width={surfaceWidth}
          left={0}
          top={0}>
          <Layer style={this._getBackgroundStyle()} />
          {team.characters.map(renderCharacter.bind(this))}
          {team.characters.map(renderCharacterName.bind(this))}
          {renderStats.call(this, team.stats)}
        </Surface>
      );
    } else {
      return (
        <div>
          {this.props.team.characters.map(warmCharacterImageCache)}
        </div>
      );
    }
  },

  _getBackgroundStyle: function() {
    return {
      backgroundColor: '#1e1e1e',
      width:           OPTIMAL_BANNER_WIDTH,
      height:          OPTIMAL_BANNER_HEIGHT,
      left:            0,
      top:             0
    };
  },

  _getImageStyle: function(dimensions) {
    var width = 110;
    var height = 110;

    return {
      top:          dimensions.top + 2,
      left:         dimensions.left,
      width:        width,
      height:       height,
      borderRadius: width / 2,
      borderColor:  '#BDBDBD'
    };
  }
});

module.exports = TeamBanner;
