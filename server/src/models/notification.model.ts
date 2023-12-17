import { Schema, model, Document, Types } from "mongoose";
interface INotification extends Document {
  type: "like" | "comment" | "reply";
  blog: Types.ObjectId;
  notification_for: Types.ObjectId;
  user: Types.ObjectId;
  comment?: Types.ObjectId;
  reply?: Types.ObjectId;
  replied_on_comment?: Types.ObjectId;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema: Schema<INotification> = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ["like", "comment", "reply"],
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    notification_for: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
    replied_on_comment: {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
