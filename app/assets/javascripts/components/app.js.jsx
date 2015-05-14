var App = React.createClass({
  getInitialState: function() {
    return {
      characters: []
    };
  },

  showCharacters: function(characters) {
    this.setState({
      characters: characters
    });
  },

  render: function() {
    return <div className="row">
        <div className="large-12 columns">

          <ul className="button-group">
            <li><a href="#" className="button">Home</a></li>
            <li><a href="#" className="button">Teams</a></li>
          </ul>

        <div className="row">

          <div className="large-12 columns">
            <div className="radius panel">

              <CharacterSearch onSearchSuccess={this.showCharacters} />

            </div>
          </div>

        </div>

        <div className="row">
          <div className="row">
            <div className="large-12 columns">
              <Characters characters={this.state.characters} />
            </div>
          </div>

        </div>

        <footer className="row">
          <div className="large-12 columns"><hr/>
            <div className="row">

              <div className="large-6 columns">
                  <p>© Copyright no one at all. Go to town.</p>
              </div>

              <div className="large-6 columns">
                <ul className="inline-list right">
                  <li><a href="#">Link 1</a></li>
                  <li><a href="#">Link 2</a></li>
                  <li><a href="#">Link 3</a></li>
                  <li><a href="#">Link 4</a></li>
                </ul>
              </div>

            </div>
          </div>
        </footer>

      </div>
    </div>;
  }
});

window.onload = function() {
  React.render(<App />, document.body);
};
