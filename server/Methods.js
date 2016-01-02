Meteor.methods({

  'players.fetch': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fetch a single player when playerId is given, else fetch all players.
    var options = playerId || {};
    return Players.find(options).fetch();
  },

  'players.increment-score': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fail one third of the time.
    if(Math.random()<.33){
      throw new Error('Increment Score Error');
    }
    return Players.update({_id: playerId}, {$inc: {score: 5}});
  }

})