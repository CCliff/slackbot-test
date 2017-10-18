class UserModel {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = this.createModel();
  }

  createModel() {
    const userSchema = this.mongoose.Schema({
      slackName: String,
      slackId: String,
      firstName: String,
      lastName: String,
      email: String
    });

    return this.mongoose.model('User', userSchema);
  }
}

exports.UserModel = UserModel;
