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
  // Create a unique transaction id.
  // The server will respond with the transactionId on error or success.
  let transactionId = Random.id();
  Meteor.call('players.update-score', playerId, transactionId, (err, res) => {
    if(res){
      var action = Actions.updateScoreSuccess(playerId, playerName, transactionId);
      store.dispatch(action);
    }else{
      var action = Actions.updateScoreFailed(playerId, playerName, transactionId);
      store.dispatch(action);
    }
  });
  return {
    type: 'UPDATE_SCORE',
    playerId: playerId,
    transactionId: transactionId
  };
};

Actions.updateScoreFailed = function updateScoreFailed(playerId, playerName, transactionId) {
  return {
    type: 'UPDATE_SCORE_FAILED',
    playerId: playerId,
    playerName: playerName,
    transactionId: transactionId
  };
}

Actions.updateScoreSuccess = function updateScoreSuccess(playerId, playerName, transactionId) {
  return {
    type: 'UPDATE_SCORE_SUCCESS',
    playerId: playerId,
    playerName: playerName,
    transactionId: transactionId
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

