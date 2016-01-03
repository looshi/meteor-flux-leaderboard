// reducers allow you to 'slice' off a part of the single state object which
// lets you think about the domain in a smaller picture. You could use one
// reducer in a small app like this but in large apps this reducer could be
// several hundred lines. See store.jsx to see how these reducers get 'combined'
// into one single app state. We'll use two reducers, one for transient state
// that the UI uses (selected id,name) and one for data (coming from Mongo)

let { incrementScore, selectPlayer, playersChanged } = Actions;
Reducers = {};

let initialInterfaceState = {
  selectedId: '',
  selectedPlayerName: '',
  errorMessage: ''
}

// helper to *copy* old state and merge new data with it
function merge(oldState, newState) {
  return _.extend({}, oldState, newState);
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

Reducers.players = function(state = {}, action) {
  switch(action.type) {
    default:
      return state;
    case 'INCREMENT_SCORE':
      let player = state[action.playerId];
      let inc = Object.assign({}, player, { score: player.score + 5 });
      return {
        ...state,
        [action.playerId]: inc
      }
    case 'PLAYERS_CHANGED':
      const newPlayers = {};
      action.players.forEach(doc => {
        newPlayers[doc._id] = doc
      });
      return {
        ...state,
        ...newPlayers
      }
  }
}
