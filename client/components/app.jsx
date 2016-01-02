class App extends React.Component {

  render() {
    return (
      <div className="outer">
        <div className="logo"></div>
        <h1 className="title">Leaderboard</h1>
        <div className="subtitle">Select a scientist to give them points</div>
        <div className="error">{ this.props.errorMessage }</div>
        <div>
          <PlayerList { ...this.props } />
        </div>

        <SelectPlayer { ...this.props } />
      </div>
    );
  }
}

App.propTypes = {
  players: React.PropTypes.array,
  selectedId: React.PropTypes.string,
  selectedName: React.PropTypes.string,
  errorMessage: React.PropTypes.string
}

this.App = App;
