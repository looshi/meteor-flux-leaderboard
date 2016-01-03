// reducers allow you to 'slice' off a part of the single state object which
// lets you think about the domain in a smaller picture. You could use one
// reducer in a small app like this but in large apps this reducer could be
// several hundred lines. See store.jsx to see how these reducers get 'combined'
// into one single app state. We'll use two reducers, one for transient state
// that the UI uses (selected id,name) and one for data (coming from Methods)

let { incrementScore, selectPlayer, playersChanged } = Actions;
Reducers = {};

let initialInterfaceState = {
  selectedId: '',
  selectedPlayerName: '',
  errorMessage: ''
}

/*
  merge
  Helper to *copy* old state and merge new data with it, currently this
  implementation uses underscore's _.extend function.
  http://underscorejs.org/#extend

  Alternatives :
  Object.assign({}, objectA, objectB); ES6
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

  Destructuring Assignment using the Spread ... operator
  {...objectA, ...objectB}; ES7
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
function merge(objectA, objectB) {
  return _.extend({}, objectA, objectB);
}

// these reducers *must* be pure to use time-travel dev-tools
// never directly mutate the `state` param, use merge instead

Reducers.userInterface = function userInterface(state, action) {
  state = state || initialInterfaceState;

  switch (action.type) {
    case 'SELECT_PLAYER':
      // we happen to be replacing all the reducers state but with merge you
      // could just return the selectedId and it would retain selectedPlayerName
      return merge(state, {
        selectedId: action.playerId,
        selectedPlayerName: action.playerName
      });
    case 'PLAYER_UPDATE_FAILED':
      return merge(state, {
        errorMessage: 'Error saving score for ' + action.playerName
      });
    default:
      return state;
  }
}

/*
Reducers.players
Manages changes to the state.players collection.
The state.players collection is stored as an object with _id keys, you can
view the players collection structure in the Redux Dev Tools sidebar.

Optimistic UI
The 'UPDATE_SCORE' action will optimistically update the local state.
If the db update fails, state will be updated later via the UPDATE_SCORE_FAILED.
If the db update succeeds, but the score didn't actually get incremented by 5,
the state will be updated to display the real db score via PLAYERS_CHANGED.
*/
Reducers.players = function(state = {}, action) {
  switch(action.type) {
    default:
      return state;
    case 'UPDATE_SCORE':
      var player = state[action.playerId];
      return {
        ...state,
        [action.playerId]: merge(player, { score: player.score + 5 })
      }
    case 'UPDATE_SCORE_FAILED':
      // The server method failed.  Revert the UI.
      var player = state[action.playerId];
      return {
        ...state,
        [action.playerId]: merge(player, { score: player.score - 5 })
      }
    case 'PLAYERS_CHANGED':
      // The remote data has changed.
      const newPlayers = {};
      action.players.forEach(doc => {
        newPlayers[doc._id] = doc
      });
      return merge(state, newPlayers);
  }
}
