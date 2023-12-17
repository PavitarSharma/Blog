"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "comments",
    },
    draft: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: "publishedAt",
    },
});
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
//# sourceMappingURL=blog.model.js.map