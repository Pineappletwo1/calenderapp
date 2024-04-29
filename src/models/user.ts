import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  tags: {
    type: Array,
    default: [],
  },
  starred: {
    type: Array,
    default: []
  }
});

const TyeeCalendarUser = models.User || model("User", UserSchema);

export default TyeeCalendarUser;
