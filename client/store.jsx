const { createStore, combineReducers, applyMiddleware, compose } = Redux;

// Redux has a single store. to reduce complexity it allows you to combine
// several 'reducer' functions that share this single state object.
// They are combined into one root reducer which is passed to the store
//
// the shape of root reducer will then look like:
//    {
//      userInterface: {
//        selectedId: 'ds34sjsa34',
//        selectedPlayerName: 'Bob Smith'
//      },
//      players: [
//        { mongo doc },
//        { mongo doc },
//        { mongo doc }
//      ]
//    }

const rootReducer = combineReducers({
  userInterface: Reducers.userInterface,
  players: Reducers.players,
});

// Create and configure the Redux Dev tool component.
// https://github.com/gaearon/redux-devtools
DevTools = ReduxDevTools.createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'>
    <LogMonitor theme='solarized'/>
  </DockMonitor>
);

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger),
  // Required! Enable Redux DevTools with the monitors you chose:
  DevTools.instrument()
)(createStore);


store = finalCreateStore(rootReducer);
