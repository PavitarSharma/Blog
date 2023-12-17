"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["like", "comment", "reply"],
        required: true,
    },
    blog: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "blogs",
    },
    notification_for: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    comment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "comments",
    },
    reply: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "comments",
    },
    replied_on_comment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "comments",
    },
    seen: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.NotificationModel = (0, mongoose_1.model)("Notification", notificationSchema);
//# sourceMappingURL=notification.model.js.map