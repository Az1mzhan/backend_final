import { Schema, model } from "mongoose";

const schemaOptions = { timestamps: true };

const Post = new Schema(
  {
    author: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  schemaOptions
);

Post.index({ author: 1, title: 1 }, { unique: true });

export default model("Post", Post);
