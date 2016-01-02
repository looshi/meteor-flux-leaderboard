// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

Actions = {};

// used when a mongo players collection changes
Actions.playersChanged = function playersChanged(newDocs) {
  return {
    type: 'PLAYERS_COLLECTION_CHANGED',
    collection: newDocs
  };
};

Actions.incrementScore = function incrementScore(playerId, playerName) {
  Meteor.call('players.increment-score', playerId, function(err, res) {
    if(res){
      // Fetch the player who changed.
      store.dispatch(Actions.fetchPlayers(playerId));
    }else{
      store.dispatch(Actions.playerUpdateFailed(playerId, playerName));
      // How to revert the client store if this error occurred?
      // This seems terribly inefficient to go back to the server and get
      // the correct database value on an update error.
      store.dispatch(Actions.fetchPlayers(playerId));
    }
  });
  return {
    type: 'INCREMENT_SCORE',
    playerId: playerId
  };
};

Actions.playerUpdateFailed = function playerUpdateFailed(playerId, playerName) {
  return {
    type: 'PLAYER_UPDATE_FAILED',
    playerId: playerId,
    playerName: playerName
  };
}

Actions.fetchPlayers = function(playerId = {}) {
  Meteor.call('players.fetch', playerId, function(err, res) {
    if(res){
      store.dispatch(Actions.playersChanged(res));
    }
  });
  return { type: 'FETCH_PLAYERS' };
};

Actions.selectPlayer = function selectPlayer(playerId, playerName) {
  return {
    type: 'SELECT_PLAYER',
    playerId: playerId,
    playerName: playerName
  };
};

