const RtmClient = require('@slack/client').RtmClient;
const WebClient = require('@slack/client').WebClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;


const SlackRcvMessage = require('../models/slackRcvMessage.js').SlackRcvMessage;

class SlackBotController {
  constructor() {
    this.bot_token = process.env.SLACK_BOT_TOKEN || '';
    this.channels = [];

    this.init();
  }

  init() {
    this.rtm = new RtmClient(this.bot_token);
    this.web = new WebClient(this.bot_token);
    this.setupEventHandlers();

    this.rtm.start();
  }

  setupEventHandlers(){
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {this.authenticated(rtmStartData)});
    this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {this.connected()});
    this.rtm.on(RTM_EVENTS.MESSAGE, (message) => {this.receiveMessage(message)});
  }

  authenticated(rtmStartData) {
    for (const c of rtmStartData.channels) {
      if (c.is_member){
        this.channels.push(c);
      }
    }
  }

  connected() {

    const attachments = JSON.stringify([
      {
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
      }
    ]);

    const data ={
        "as_user": true,
        "attachments": attachments
    };

    for (const c of this.channels) {
      this.web.chat.postMessage(c.id, '', data, () => {
        console.log("callback");
      });
    }

  }

  receiveMessage(message) {
    const rcvMessage = new SlackRcvMessage(message);
    // this.sendShoutEcho(rcvMessage);
  }

  sendMessage(message, channel) {
    this.rtm.sendMessage(message, channel);
  }

  sendShoutEcho(rcvMessage) {
    this.sendMessage(rcvMessage.text.toUpperCase(), rcvMessage.channel);
  }
}

exports.SlackBotController = SlackBotController;
