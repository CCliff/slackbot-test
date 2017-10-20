const mongoose  = require('mongoose');


const UserModel      = require('../models/db_models/user.js').UserModel;
const User = new UserModel(mongoose).model;

class DBHelper {
  constructor() {
    mongoose.connect(process.env.MONGODB_URI);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('MONGODB CONNECTION ACCEPTED');
    });
  }

  createUser(options) {
    const user = new User(options);
    return new Promise((resolve, reject) => {
      user.save((err, user) => {
        if(err){
          resolve(err);
        }
        resolve('User has been saved');
        reject('Could not write to DB');
      });
    });
  }

  getUsers(options) {
    const lowerOptions = {};
    for (const k in options) {
      lowerOptions[k] = new RegExp(options[k], "i");
    }
    return new Promise((resolve, reject) => {
      User.find(lowerOptions, (err, users) => {
        if(err) resolve(console.error(err));
        if(users.length <= 1) {
          users = users[0];
        }
        resolve(users);
      });
    });
  }

  getUsersFuzzy(nameCharCode) {
    return new Promise((resolve, reject) => {
      const users = User.find((err, users) => {
        if (err) reject(console.error(err));
        const closeUsers = users.filter((user) => {
          const difference = Math.abs(user.nameCharCode - nameCharCode);
          if (difference <= 100) {
            user.difference = difference;
            return user;
          }
        });
        closeUsers.sort((a, b) => {
          return a.difference - b.difference;
        });
        resolve(closeUsers);
      });
    });
  }

  getUserByID(id) {
    return new Promise((resolve, reject) => {
      return User.findOne({
        slackID: id
      }, (err, user) => {
        if(err){reject(err)};
        resolve(user);
      });
    });
  }

  clearData() {
    return new Promise((resolve, reject) => {
      User.remove({}, (err, data) => {
        if (err) resolve(console.error(err));
        resolve('All data deleted');
        reject('Could not delete from DB')
      });
    });
  }

}

exports.DBHelper = DBHelper;
