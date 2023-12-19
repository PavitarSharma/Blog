import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IActivity extends Document {
  total_likes: number;
  total_comments: number;
  total_reads: number;
  total_parent_comments: number;
}
export interface IBlog extends Document {
  blog_id: string;
  title: string;
  banner: string;
  des: string;
  content: { type: any[] };
  activity: IActivity;
  tags: [string];
  author: Types.ObjectId | IUser;
  comments: [any];
  draft: boolean;
}

const blogSchema = new Schema<IBlog>(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      // required: true,
    },
    des: {
      type: String,
      maxlength: 200,
      // required: true
    },
    content: {
      type: [],
      // required: true
    },
    tags: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    activity: {
      total_likes: {
        type: Number,
        default: 0,
      },
      total_comments: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
      total_parent_comments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export const Blog = model<IBlog>("Blog", blogSchema);
