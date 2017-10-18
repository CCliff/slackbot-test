const SlackSendMessage = require('../models/slackSendMessage.js').SlackSendMessage;
const Test1Response = require('../models/test_responses/test1Response.js').Test1Response;
const Test2Response = require('../models/test_responses/test2Response.js').Test2Response;

class SlackRouter{
  constructor() {
  }

  routeMessage(message) {
    switch(message.text) {
      case "test1":
        return new Test1Response({
          channel: message.channel,
          text: 'Response to test1'
        });
      case "test2":
        return new Test2Response({
          channel: message.channel,
          text: 'Response to test2'
        });
    }
  }

}

exports.SlackRouter = SlackRouter;
