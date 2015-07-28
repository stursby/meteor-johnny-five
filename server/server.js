// Set up some global vars
var five = Meteor.npmRequire('johnny-five'),
  board, led;

// Run on start
Meteor.startup(function(){

  // Seed DB if no record found
  if (Arduino.find().count() === 0) {
    Arduino.insert({value: 'OFF'});
  }

  // Setup new johnny-five board
  board = new five.Board();

  // Catch Errors
  board.on('error', function (error) {
    console.error('Johnny Five Error', error);
  });

  // On board ready, set up LED on pin 13 & turn off
  board.on('ready', function() {
    led = new five.Led(13);
    led.off();
  });

});

// Publish arduino collection
Meteor.publish('arduino', function() {
  return Arduino.find({}, {limit: 1});
});

// toggleLED method and update record
Meteor.methods({
  'toggleLED': function(status) {
    if (status) {
      led.on();
      Arduino.update({}, {value: 'ON'});
    } else {
      led.off();
      Arduino.update({}, {value: 'OFF'});
    }
  }
});
