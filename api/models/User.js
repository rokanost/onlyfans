const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String,
  posts: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  followersList: {
    type: Array,
    default: []
  },
  followingList: {
    type: Array,
    default: []
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  profileImageUrl: {
    type: String,
    default: ''
  }
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
