class SlackSendMessage {
  constructor(options) {
    this.channel = options.channel;
    this.text = options.text;
    this.callback = options.callback;
    this.data = this.buildData(options.data, options.attachments);
  }

  buildData(data, attachments) {
    if(data){
      data.attachments = JSON.stringify(attachments);
      return data;
    }
  }

}

exports.SlackSendMessage = SlackSendMessage;
