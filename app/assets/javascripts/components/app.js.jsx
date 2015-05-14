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

            <div className="large-6 columns">

              <img src="http://placehold.it/500x500&text=Image" /><br/>

            </div>


          <div className="large-6 columns">

            <h3 className="show-for-small">Header<hr/></h3>

            <div className="panel">
              <h4 className="hide-for-small">Header<hr/></h4>
              <h5 className="subheader">Fusce ullamcorper mauris in eros dignissim molestie posuere felis blandit. Aliquam erat volutpat. Mauris ultricies posuere vehicula. Sed sit amet posuere erat. Quisque in ipsum non augue euismod dapibus non et eros. Pellentesque consectetur tempus mi iaculis bibendum. Ut vel dolor sed eros tincidunt volutpat ac eget leo.</h5>
            </div>

            <div className="row">
              <div className="large-6 small-6 columns">
                <div className="panel">
                  <h5>Header</h5>
                  <h6 className="subheader">Praesent placerat dui tincidunt elit suscipit sed.</h6>
                  <a href="#" className="small button">BUTTON TIME!</a>
                </div>
              </div>

              <div className="large-6 small-6 columns">
                <div className="panel">
                  <h5>Header</h5>
                  <h6 className="subheader">Praesent placerat dui tincidunt elit suscipit sed.</h6>
                  <a href="#" className="small button">BUTTON TIME!</a>
                </div>
              </div>
            </div>

          </div>

        </div>

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
