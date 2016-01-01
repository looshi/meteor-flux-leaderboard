Meteor.startup(function() {
  window.addEventListener('DOMContentLoaded', () => {
    let app = document.createElement('div');
    document.body.appendChild(app);
    ReactDOM.render(
      <div>
        <Provider store={store}>
          <AppContainer />
        </Provider>
        {/*<DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>*/}
      </div>,
      app
    );
  });
});
