var React  = require('react');
var mui    = require('material-ui');

var AppBar         = mui.AppBar;
var LeftNav        = mui.LeftNav;
var MenuItem       = mui.MenuItem;


var Menu = React.createClass({

  openMenu: function openMenu(e) {
    this.refs.leftNav.open();
  },

  render: function() {
    var menuItems = [
      {
        type: MenuItem.Types.LINK,
        payload: '/teams',
        text: 'Leaderboard'
      },
      {
        type: MenuItem.Types.LINK,
        payload: '/teams/new',
        text: 'Assemble Team'
      },
      {
        type: MenuItem.Types.LINK,
        payload: '/auth/facebook',
        text: 'Sign In'
      }
    ];

    return (
      <div>
        <AppBar title="Leaderboard" onLeftIconButtonTouchTap={this.openMenu} />
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
      </div>
    );
  }
});

module.exports = Menu;
