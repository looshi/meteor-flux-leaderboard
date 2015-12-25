Meteor.methods({

  'players.fetch': function(){
    // Simulates a slows response by sleeping for 2 seconds.
    Meteor._sleepForMs(1000);
    return Players.find().fetch();
  },

  'players.increment-score': function(playerId){
    // Simulates a slows response by sleeping for 2 seconds.
    Meteor._sleepForMs(1000);
    // Fail one third of the time.
    if(Math.random()<.33){
      throw new Error('Increment Score Error');
    }
    return Players.update({_id: playerId}, {$inc: {score: 5}});
  }

})