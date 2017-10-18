const SlackSendMessage = require('../slackSendMessage.js').SlackSendMessage;

class Test1Response extends SlackSendMessage {
  constructor(options) {
    super(options);
    this.channel = options.channel;
    this.text = '';
    this.callback = function(){console.log("Test 1 Callback")};
    this.data = {
      "as_user": true,
      "attachments": JSON.stringify([{
        "text": "Someone is looking for you",
        "callback_id": "reception",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "response",
            "text": "I'm on my way",
            "type": "button",
            "value": "go"
          },
          {
            "name": "response",
            "text": "Give me 5 minutes",
            "type": "button",
            "value": "minutes"
          },
          {
            "name": "response",
            "text": "Sorry, I can't make it",
            "style": "danger",
            "type": "button",
            "value": "busy",
            "confirm": {
              "title": "Are you sure?",
              "text": "Should we tell the visitor you are unavailable",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }])
    };

  }

}

exports.Test1Response = Test1Response;
