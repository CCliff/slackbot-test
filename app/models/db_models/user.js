class UserModel {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = this.createModel();
  }

  createModel() {
    const userSchema = this.mongoose.Schema({
      slackName: {
        type: String,
        required: [true, 'slackName is required'],
      },
      slackID: {
        type: String,
        required: [true, 'slackID is required'],
        unique: true
      },
      firstName: {
        type: String,
        required: [true, 'firstName is required'],
      },
      lastName: {
        type: String,
        required: [true, 'lastName is required'],
      },
      email: {
        type: String,
        required: [true, 'email is required'],
      },
      nameCharCode: {
        type: String
      }
    });

    return this.mongoose.model('User', userSchema);
  }
}

exports.UserModel = UserModel;
