import mongoose from 'mongoose';
import crypto from 'crypto';


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    passwordResetToken: { type: String, },
    passwordResetExpires: { type: Date, },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken
}
const User = mongoose.model('User', userSchema);
export default User;
