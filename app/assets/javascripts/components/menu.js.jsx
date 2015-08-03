var React    = require('react');
var mui      = require('material-ui');
var AppBar   = mui.AppBar;
var LeftNav  = mui.LeftNav;
var MenuItem = mui.MenuItem;


var Menu = React.createClass({

  propTypes: {
    title:    React.PropTypes.string.isRequired,
    loggedIn: React.PropTypes.bool.isRequired
  },

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
      }
    ];

    if ( !this.props.loggedIn ) {
      menuItems.push({
        type: MenuItem.Types.LINK,
        payload: '/auth/facebook',
        text: 'Sign In'
      });
    } else {
      menuItems.push({
        type: MenuItem.Types.LINK,
        payload: '/signout',
        text: 'Sign Out'
      });
    }

    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.openMenu} />
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems} />
      </div>
    );
  }
});

module.exports = Menu;
