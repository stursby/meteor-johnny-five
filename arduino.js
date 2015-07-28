// Create collection to hold Arduino data
Arduino = new Mongo.Collection('arduino');

// Set local ledOn to false
var ledOn = false;

// Client only
if (Meteor.isClient) {

  // Send one record to {{status}} helper
  Template.body.helpers({
    status: function () {
      return Arduino.findOne();
    }
  });

  // Handle toggle button click, call toggleLED method
  Template.body.events({
    'click button': function () {
      ledOn = !ledOn;
      Meteor.call('toggleLED', ledOn);
    }
  });
}
