"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
let profile_imgs_name_list = [
    "Garfield",
    "Tinkerbell",
    "Annie",
    "Loki",
    "Cleo",
    "Angel",
    "Bob",
    "Mia",
    "Coco",
    "Gracie",
    "Bear",
    "Bella",
    "Abby",
    "Harley",
    "Cali",
    "Leo",
    "Luna",
    "Jack",
    "Felix",
    "Kiki",
];
let profile_imgs_collections_list = [
    "notionists-neutral",
    "adventurer-neutral",
    "fun-emoji",
];
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, "fullname must be 3 letters long"],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: String,
    username: {
        type: String,
        minlength: [3, "Username must be 3 letters long"],
        unique: true,
    },
    bio: {
        type: String,
        maxlength: [200, "Bio should not be more than 200"],
        default: "",
    },
    profile_img: {
        type: String,
        default: () => {
            return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`;
        },
    },
    social_links: {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
    },
    account_info: {
        total_posts: {
            type: Number,
            default: 0,
        },
        total_reads: {
            type: Number,
            default: 0,
        },
    },
    google_auth: {
        type: Boolean,
        default: false,
    },
    blogs: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "blogs",
        default: [],
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
    timestamps: true,
});
// Hash Password before saving
// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     this.password =  bcrypt.hash(this.password, 10);
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });
// Compare Password
userSchema.methods.comparePassword = function (eneteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(eneteredPassword, this.password);
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
//# sourceMappingURL=user.model.js.map