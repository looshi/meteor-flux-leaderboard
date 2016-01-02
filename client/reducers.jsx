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
  selectedPlayerName: ''
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
    default:
      return state;
  }
}

// using the ES6 default params instead of the manual check like above

Reducers.players = function players(state = [], action) {
  let docs = [];
  switch (action.type) {
    case 'INCREMENT_SCORE':
      // Optimistic UI update.
      // If the server update fails, this will be reverted.
      // The server update method intentionally fails often.
      // `state` here is the array of player objects.
      docs = state.map(player =>
        player._id === action.playerId ?
          Object.assign({}, player, { score: player.score + 5 }) :
          player
      )
      return docs.sort((a,b) => b.score - a.score);
    case 'PLAYERS_COLLECTION_CHANGED':
      docs = _.clone(action.collection);
      return docs.sort((a,b) => b.score - a.score);
    default:
      return state;
  }
}
