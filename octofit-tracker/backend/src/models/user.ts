import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: String,
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default model('User', userSchema)