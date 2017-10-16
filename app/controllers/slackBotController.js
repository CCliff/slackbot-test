const RtmClient = require('@slack/client').RtmClient;
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
    this.channels.forEach((channel) => {
      this.sendMessage("I've been (re)started!", channel.id);
    });
  }

  receiveMessage(message) {
    const rcvMessage = new SlackRcvMessage(message);
    this.sendShoutEcho(rcvMessage);
  }

  sendMessage(message, channel) {
    this.rtm.sendMessage(message, channel);
  }

  sendShoutEcho(rcvMessage) {
    this.sendMessage(rcvMessage.text.toUpperCase(), rcvMessage.channel);
  }
}

exports.SlackBotController = SlackBotController;
