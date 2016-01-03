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

Actions.updateScore = function updateScore(playerId, playerName) {
  Meteor.call('players.update-score', playerId, function(err, res) {
    if(res){
      // Actions.playersChanged expects an array of players.
      // This success result is one Player object, add it as a single
      // item in an array, then dispatch the playersChanged action.
      let newPlayers = [res];
      store.dispatch(Actions.playersChanged(newPlayers));
    }else{
      store.dispatch(Actions.updateScoreFailed(playerId, playerName));
    }
  });
  return {
    type: 'UPDATE_SCORE',
    playerId: playerId
  };
};

Actions.updateScoreFailed = function updateScoreFailed(playerId, playerName) {
  return {
    type: 'UPDATE_SCORE_FAILED',
    playerId: playerId,
    playerName: playerName
  };
}

Actions.updateScoreSuccess = function updateScoreSuccess(playerId, playerName) {
  return {
    type: 'UPDATE_SCORE_SUCCESS',
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

