const SlackSendMessage = require('../slackSendMessage.js').SlackSendMessage;

class Test2Response extends SlackSendMessage {
  constructor(options) {
    super(options);
    this.channel = options.channel;
    this.text = '';
    this.callback = function(){console.log("Test 1 Callback")};
    this.data = {
      "as_user": true,
      "attachments": JSON.stringify([{
        "text": "Someone is looking for you",
        "fallback": "Uh, oh. You can't see this for some reason.",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "callback_id": "game_selection",
        "actions": [
          {
            "name": "response_list",
            "text": "Please respond",
            "type": "select",
            "options": [
              {
                "text": "I'm on my way",
                "value": "go"
              },
              {
                "text": "Give me 5 minutes",
                "value": "wait"
              },
              {
                "text": "Sorry, I can't make it",
                "value": "busy"
              }
            ]
          }
        ]
      }])
    };
  }

}

exports.Test2Response = Test2Response;
