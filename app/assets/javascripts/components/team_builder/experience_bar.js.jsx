var React         = require('react');
var ExperienceBar = React.createClass({

  getPercent: function() {
    return this.props.currentProgress / this.props.totalProgress * 100;
  },

  render: function() {
    return (
      <div className="experience-progress-bar-container">
        <div className="experience-progress-bar" style={{width: this.getPercent() + '%'}}>
        </div>
      </div>
    );
  }

});

module.exports = ExperienceBar;
