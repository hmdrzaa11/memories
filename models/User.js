let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let { default: validator } = require("validator");
let bcrypt = require("bcryptjs");

let userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    minlength: [4, "username can not be less than 4 characters long"],
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message(prop) {
        return `"${prop.value}"  is not a valid Email address`;
      },
    },
  },

  password: {
    type: String,
    minlength: [8, "password must be at least 8 characters long"],
    required: [true, "password is required"],
    trim: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "password confirmation is required"],
    validate: {
      validator(value) {
        return value === this.password;
      },
      message: "'password' and 'password confirmation' do not match",
    },
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: ['role can only be "user" or "admin"'],
    },
    default: "user",
    select: false,
  },
  passwordResetToken: String,
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  let hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.isPasswordMatch = async function (rawPass) {
  return await bcrypt.compare(rawPass, this.password);
};

userSchema.methods.isPasswordChangedRecently = function (jwtInitialDate) {
  if (!this.passwordChangedAt) {
    return false;
  }
  return this.passwordChangedAt.getTime() / 1000 > jwtInitialDate;
};

let User = mongoose.model("User", userSchema);

module.exports = User;
