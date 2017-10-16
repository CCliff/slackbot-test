class SlackRcvMessage {
  constructor(message) {
    this.channel = message.channel;
    this.user = message.user;
    this.text = message.text;
    this.timestamp = message.ts;
    this.team = message.team;
  }
}

exports.SlackRcvMessage = SlackRcvMessage;
