var mui    = require('material-ui');
var React  = require('react');

var ThemeManager = new mui.Styles.ThemeManager();
var Colors       = mui.Styles.Colors;

var redDarkTheme = {
  getComponentThemes: function getComponentThemes(palette) {
    var componentThemes;
    componentThemes = ThemeManager.types.DARK.getComponentThemes(palette);
    return componentThemes;
  },
  getPalette: function getPalette() {
    var palette;
    palette = ThemeManager.types.DARK.getPalette();
    palette.primary1Color = Colors.red500;
    palette.primary3Color = Colors.red50;
    return palette;
  }
};

ThemeManager.setTheme(redDarkTheme);

var MarvelTheme = {
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  }
};

module.exports = MarvelTheme;
