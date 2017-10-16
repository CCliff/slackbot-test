const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;


class SlackBot {
  constructor() {
    this.bot_token = process.env.SLACK_BOT_TOKEN || 'xoxb-257203437157-T0QpzJifeBX09vs5kDwkVmBj';
    this.channel = '';

    this.init();
  }

  init() {
    this.rtm = new RtmClient(this.bot_token);
    this.setupEventHandlers();

    this.rtm.start();
  }

  setupEventHandlers(){
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.authenticated);
    this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, this.connected);
    this.rtm.on(RTM_EVENTS.MESSAGE, this.receiveMessage);
  }

  authenticated(rtmStartData) {
    for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='general') { this.channel = c.id }
    }

    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  }

  connected() {
    this.sendMessage("Hello, world!");
  }

  receiveMessage(message) {
    console.log('Message: ', message);
  }

  sendMessage(message) {
    rtm.sendMessage(message, this.channel);
  }
}

exports.SlackBot = SlackBot;
