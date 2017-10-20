class UserModel {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = this.createModel();
  }

  createModel() {
    const userSchema = this.mongoose.Schema({
      slackName: String,
      slackID: String,
      firstName: String,
      lastName: String,
      email: String,
      nameCharCode: String
    });

    return this.mongoose.model('User', userSchema);
  }
}

exports.UserModel = UserModel;
