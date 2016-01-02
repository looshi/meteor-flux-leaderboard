Meteor.startup(function() {
  window.addEventListener('DOMContentLoaded', () => {
    // For some reason I couldn't simply put a <div> inside the main html <body>
    // Perhaps because I removed the blaze-html-templates package ?
    // `app` = root application node.
    let app = document.createElement('div');
    document.body.appendChild(app);

    ReactDOM.render(
      <Provider store={store}>
        <div>
          <AppContainer />
          <DevTools/>
        </div>
      </Provider>
      ,
      app
    );
  });
});
