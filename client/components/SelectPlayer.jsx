class SelectPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    store.dispatch(Actions.incrementScore(this.props.selectedId));
  }

  render() {
    if (this.props.selectedPlayerName) {
      return (
        <div className="details">
          <div className="name">{this.props.selectedPlayerName}</div>
          <button className="inc" onClick={this.handleClick}>
            Add 5 points
          </button>
        </div>
      );
    }
    else {
      return (
        <div className="message">Click a player to select</div>
      );
    }
  }
};

SelectPlayer.propTypes = {
  selectedName: React.PropTypes.string,
  selectedId: React.PropTypes.string
}

this.SelectPlayer = SelectPlayer
