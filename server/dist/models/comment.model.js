"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    blog_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "blogs",
    },
    blog_author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "blogs",
    },
    comment: {
        type: String,
        required: true,
    },
    children: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "comments",
    },
    commented_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "users",
    },
    isReply: {
        type: Boolean,
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "comments",
    },
}, {
    timestamps: {
        createdAt: "commentedAt",
    },
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
//# sourceMappingURL=comment.model.js.map