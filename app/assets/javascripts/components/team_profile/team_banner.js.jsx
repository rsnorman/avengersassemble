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
var pixelRatio = window.devicePixelRatio || 1;
var OPTIMAL_BANNER_WIDTH   = Math.ceil(1200 / pixelRatio * 10) / 10;
var OPTIMAL_BANNER_HEIGHT  = Math.ceil(630  / pixelRatio * 10) / 10;
var CHARACTER_MARGIN       = Math.ceil(10   / pixelRatio * 10) / 10;
var TOP_MARGIN             = Math.ceil(25   / pixelRatio * 10) / 10;
var CHARACTER_HEIGHT       = Math.ceil(50   / pixelRatio * 10) / 10;
var STAT_HEIGHT            = Math.ceil(20   / pixelRatio * 10) / 10;
var IMAGE_SIZE             = Math.ceil(110  / pixelRatio * 10) / 10;
var CHARACTER_FONT_SIZE    = Math.ceil(18   / pixelRatio * 10) / 10;
var STAT_FONT_SIZE         = Math.ceil(16   / pixelRatio * 10) / 10;
var CHARACTER_MARGIN_LEFT  = Math.ceil(50   / pixelRatio * 10) / 10;
var CHARACTER_NAME_WIDTH   = Math.ceil(200  / pixelRatio * 10) / 10;
var CHARACTER_IMAGE_MARGIN = Math.ceil(15   / pixelRatio * 10) / 10;
var CHARACTER_OFFSET       = Math.ceil(15   / pixelRatio * 10) / 10;
var STAT_MARGIN            = Math.ceil(25   / pixelRatio * 10) / 10;
var STAT_BAR_HEIGHT        = Math.ceil(10   / pixelRatio * 10) / 10;

TeamBanner = React.createClass({

  propTypes: {
    team:             React.PropTypes.object.isRequired,
    maxStats:         React.PropTypes.object.isRequired,
    visible:          React.PropTypes.bool.isRequired,
    onRenderComplete: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      rendered: false
    };
  },

  getDataURL: function() {
    return this.refs.bannerImage.getDOMNode().toDataURL();
  },

  componentDidUpdate: function(prevProps) {
    if ( this.props.visible && !prevProps.visible && this.state.rendered ) {
      if ( this.props.onRenderComplete ) {
        this.props.onRenderComplete();
      }
    }
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
      sectionHeight: OPTIMAL_BANNER_HEIGHT - (TOP_MARGIN * 2)
    }).slice(this.props.team.characters.length);

    var topPosition  = slices[0].centerPosition.y + TOP_MARGIN;
    var leftPosition = 0;

    for ( var _i = 0, _len = slices.length; _i < _len; _i++ ) {
      if ( leftPosition < slices[_i].centerPosition.x ) {
        leftPosition = slices[_i].centerPosition.x;
      }
    }

    leftPosition += CHARACTER_MARGIN_LEFT;

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
      var width  = OPTIMAL_BANNER_WIDTH / 2 - CHARACTER_NAME_WIDTH;
      var height = CHARACTER_HEIGHT;
      var slice  = slices[index];
      var left   = leftPosition - slice.centerPosition.x + IMAGE_SIZE + CHARACTER_IMAGE_MARGIN;

      var groupTextStyle = {
        top:    topPosition  - slice.endPosition.y - CHARACTER_OFFSET,
        left:   left,
        width:  width,
        height: height
      };

      var textStyle = {
        top:      topPosition  - slice.endPosition.y - CHARACTER_OFFSET,
        left:     left,
        height:   height,
        width:    width,
        fontSize: CHARACTER_FONT_SIZE,
        color:    '#ededed'
      };

      var underlineStyle = {
        top:             topPosition  - slice.endPosition.y + CHARACTER_OFFSET,
        left:            left,
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
      sectionHeight: OPTIMAL_BANNER_HEIGHT - (TOP_MARGIN * 2)
    }).slice(Object.keys(this.props.team.stats).length);

    var statTopPosition = statSlices[0].centerPosition.y + TOP_MARGIN;
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
      var height = STAT_HEIGHT;
      var slice  = statSlices[index];

      var groupTextStyle = {
        top:    statTopPosition  - slice.endPosition.y - CHARACTER_OFFSET,
        left:   statLeftPosition - slice.centerPosition.x + STAT_MARGIN,
        width:  width,
        height: height
      };

      var textStyle = {
        top:      statTopPosition  - slice.endPosition.y - CHARACTER_OFFSET,
        left:     statLeftPosition - slice.centerPosition.x + STAT_MARGIN,
        height:   height,
        width:    width,
        fontSize: STAT_FONT_SIZE,
        color:    '#aeaeae'
      };

      var underlineStyle = {
        top:             statTopPosition  - slice.endPosition.y + CHARACTER_OFFSET,
        left:            statLeftPosition - slice.centerPosition.x + STAT_MARGIN,
        height:          STAT_BAR_HEIGHT,
        width:           width,
        backgroundColor: '#F7412D',
        alpha:           0.2,
        borderRadius:    STAT_BAR_HEIGHT / 2
      };

      var statStyle = JSON.parse(JSON.stringify(underlineStyle));
      statStyle.width = statValue * width / maxValue;

      if ( statStyle.width < 1 ) {
        statStyle.alpha = 0;
      } else {
        statStyle.alpha = 1;
      }

      if ( statStyle.width < STAT_BAR_HEIGHT ) {
        statStyle.width = STAT_BAR_HEIGHT;
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
      if ( !this.state.rendered ) {
        setTimeout(function() {
          this.setState({
            rendered: true
          });
          if ( this.props.onRenderComplete ) {
            this.props.onRenderComplete();
          }
        }.bind(this), 1000);
      }

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
    return {
      top:          dimensions.top + 2,
      left:         dimensions.left,
      width:        IMAGE_SIZE,
      height:       IMAGE_SIZE,
      borderRadius: IMAGE_SIZE / 2,
      borderColor:  '#BDBDBD'
    };
  }
});

module.exports = TeamBanner;
