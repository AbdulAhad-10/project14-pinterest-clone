import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: '', // You can set a default profile picture URL here
  },
  pinsCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pin'
  }],
  pinsSaved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pin'
  }],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;