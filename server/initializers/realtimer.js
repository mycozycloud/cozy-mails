// Generated by CoffeeScript 1.6.3
module.exports = function(app) {
  var Realtimer;
  Realtimer = require('cozy-realtime-adapter');
  return Realtimer(app, ['logmessage.*', 'email.*', 'mailbox.*', 'mailfolder.*']);
};
