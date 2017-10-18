const RtmClient = require('@slack/client').RtmClient;
const WebClient = require('@slack/client').WebClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const SlackRouter = require('./slackRouter.js').SlackRouter;

const SlackRecvMessage = require('../models/slackRecvMessage.js').SlackRecvMessage;

class SlackBotController {
  constructor() {
    this.bot_token = process.env.SLACK_BOT_TOKEN || '';
    this.channels = [];

    this.init();
  }

  init() {
    this.rtm = new RtmClient(this.bot_token);
    this.web = new WebClient(this.bot_token);
    this.slackRouter = new SlackRouter();
    this.setupEventHandlers();

    this.rtm.start();
  }

  setupEventHandlers(){
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {this.authenticated(rtmStartData)});
    this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {this.connected()});
    this.rtm.on(RTM_EVENTS.MESSAGE, (message) => {this.receiveMessage(message)});
  }

  authenticated(rtmStartData) {
    // Find all the channels the bot is part of and add them to the list of channels
    for (const c of rtmStartData.channels) {
      if (c.is_member){
        this.channels.push(c);
      }
    }

    // Find all the private channels (groups) the bot is part of and add them to the list of channels
    // We do not need to check if the bot is a member of these groups; it only has returns the groups it is part of
    for (const c of rtmStartData.groups) {
      this.channels.push(c);
    }
  }

  connected() {
    for (const c of this.channels) {
      console.log("Attached to", c.name);
    }
  }

  receiveMessage(message) {
    // if this is a message from the bot, skip it.
    if(message.bot_id){
      return;
    }
    console.log('MESSAGE:', message);
    const rcvMessage = new SlackRecvMessage(message);
    const response = this.slackRouter.routeMessage(rcvMessage);
    this.sendMessage(response);
  }

  sendMessage(response) {
    console.log('RESPONSE:', response);
    if (response) {
      this.web.chat.postMessage(response.channel, response.text, response.data, response.callback);
    }
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      const activeUsers = this.web.users.list().then((users) => {
        return users.members.filter(member => !member.deleted);
      });
      resolve(activeUsers);
      reject("Unable to reach Slack User API");
    });

  }
}

exports.SlackBotController = SlackBotController;

