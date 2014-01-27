// Generated by CoffeeScript 1.6.3
var LogMessage, NotificationHelper, Notifications;

NotificationHelper = require('cozy-notifications-helper');

Notifications = new NotificationHelper('mails');

module.exports = LogMessage = {};

LogMessage.createImportInfo = function(results, mailbox, callback) {
  var mail_text, msg;
  mail_text = "mail";
  if (results.length > 1) {
    mail_text += "s";
  }
  msg = "Downloading " + results.length + " " + mail_text + " from " + mailbox.name;
  Notifications.createOrUpdatePersistent("download-" + mailbox.id, {
    text: msg,
    resource: {
      app: 'mails',
      url: 'mail/#{results[0].id}'
    }
  });
  return callback();
};

LogMessage.createNewMailInfo = function(mailbox, nbNewMails, callback) {
  var mail_text, msg;
  if (nbNewMails === 0) {
    Notifications.destroy('newmail-#{mailbox.id}');
    return callback();
  }
  mail_text = "mail";
  if (nbNewMails > 1) {
    mail_text += "s";
  }
  msg = "" + nbNewMails + " new " + mail_text + " in " + mailbox.name;
  Notifications.createOrUpdatePersistent('newmail-#{mailbox.id}', {
    text: msg
  });
  return callback();
};

LogMessage.createImportStartedInfo = function(mailbox, callback) {
  Notifications.createOrUpdatePersistent("importprogress-" + mailbox.id, {
    text: "Import of " + mailbox.name + " started.",
    resource: {
      app: 'mails',
      url: 'config-mailboxes'
    }
  });
  return callback();
};

LogMessage.createImportProgressInfo = function(mailbox, progress, callback) {
  Notifications.createOrUpdatePersistent("importprogress-" + mailbox.id, {
    text: "Import of " + mailbox.name + " : " + progress + "% complete",
    resource: {
      app: 'mails',
      url: 'config-mailboxes'
    }
  });
  return typeof callback === "function" ? callback() : void 0;
};

LogMessage.createImportSuccess = function(mailbox, callback) {
  Notifications.createOrUpdatePersistent("importprogress-" + mailbox.id, {
    text: "Import of " + mailbox.name + " is complete !",
    resource: {
      app: 'mails',
      url: ''
    }
  });
  return callback();
};

LogMessage.createImportFailed = function(mailbox, callback) {
  Notifications.createOrUpdatePersistent("importprogress-" + mailbox.id, {
    text: "Import of " + mailbox.name + " has failed !",
    resource: {
      app: 'mails',
      url: ''
    }
  });
  return callback();
};

LogMessage.destroy = function(mailbox, callback) {
  Notifications.destroy("newmail-" + mailbox.id);
  Notifications.destroy("download-" + mailbox.id);
  Notifications.destroy("importprogress-" + mailbox.id);
  return callback();
};