// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

Actions = {};

// used when a mongo players collection changes
Actions.playersChanged = function playersChanged(newPlayers) {
  return {
    type: 'PLAYERS_CHANGED',
    players: newPlayers
  };
};

Actions.incrementScore = function incrementScore(playerId, playerName) {
  Meteor.call('players.increment-score', playerId, function(err, res) {
    if(res){
      // Fetch the player who changed.
      store.dispatch(Actions.fetchPlayers(playerId));
    }else{
      store.dispatch(Actions.playerUpdateFailed(playerId, playerName));
      // TODO : handle this client side versus having to fetch again :
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

