const SlackBotController = require('./slackBotController.js').SlackBotController;
const DBHelper = require('../helpers/dBHelper.js').DBHelper;
const rogerRoot = require('talisman/phonetics/roger-root');

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

  getUsersFuzzy(name) {
    return new Promise((resolve, reject) => {
      dbHelper.getUsersFuzzy(rogerRoot(name)).then((users) => {
        resolve(users);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  updateUser(data) {
    return new Promise((resolve, reject) => {
      dbHelper.getUserByID(data.slackID).then((user) => {
        console.log(user);
        if(user.length === 0) {
          reject("User not found");
        } else if(user.length > 1) {
          reject("Did not return a unique user")
        } else {
          Object.assign(user, data);
          user.save((err, updatedUser) => {
            if(err){reject("Could not save updated user:", err)}
            resolve(updatedUser);
          });
        }
      });
    });
  }

  loadDBSlack() {
    return new Promise((resolve, reject) => {
      slackBot.getUsers().then((users) => {
        users.forEach((user, i) => {
          try {
            dbHelper.createUser({
              slackName: user.name,
              slackID: user.id,
              firstName: user.profile.first_name,
              lastName: user.profile.last_name,
              email: user.profile.email,
              nameCharCode: rogerRoot(user.profile.first_name)
            });
          } catch(err) {
            reject(console.error('ERROR:', err));
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
