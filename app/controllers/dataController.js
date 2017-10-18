const SlackBotController = require('./slackBotController.js').SlackBotController;
const DBHelper = require('../helpers/dBHelper.js').DBHelper;

const slackBot = new SlackBotController();
const dbHelper = new DBHelper();



class DataController {
  constructor() {
  }

  getUsers(options) {
    return new Promise((resolve, reject) => {
      dbHelper.getUsers(options).then((response) => {
        resolve(response);
        reject("Could not get users");
      });
    });
  }

  loadDBSlack() {
    return new Promise((resolve, reject) => {
      slackBot.getUsers().then((users) => {
        users.forEach((user, i) => {
          console.log(user);
          try {
            dbHelper.createUser({
              slackName: user.name,
              slackID: user.id,
              firstName: user.profile.first_name,
              lastName: user.profile.last_name,
              email: user.profile.email
            });
          } catch(e) {
            reject(console.log(user));
          }
        });
        resolve("Slack users have been added to the DB");
      }).catch((err) => {
        reject(console.log(err));
      });
    });
  }

  clearData() {
    return new Promise((resolve, reject) => {
      dbHelper.clearData().then((response) => {
        resolve(response);
      });
    });
  }

}


exports.DataController = DataController;
