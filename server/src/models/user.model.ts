import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

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

export interface ISocial {
  youtube: string;
  instagram: string;
  facebook: string;
  twitter: string;
  github: string;
  website: string;
}

export interface IImage {
  id: string;
  url: string;
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password?: string;
  username: string;
  bio: string;
  isVerified: boolean;
  profile_img?: string;
  social_links: ISocial;
  account_info: {
    total_posts: number;
    total_reads: number;
  };
  google_auth: boolean;
  blogs: [any];
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
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
        return `https://api.dicebear.com/6.x/${
          profile_imgs_collections_list[
            Math.floor(Math.random() * profile_imgs_collections_list.length)
          ]
        }/svg?seed=${
          profile_imgs_name_list[
            Math.floor(Math.random() * profile_imgs_name_list.length)
          ]
        }`;
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
      type: [Schema.Types.ObjectId],
      ref: "Blog",
      default: [],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

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
userSchema.methods.comparePassword = async function (
  eneteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(eneteredPassword, this.password);
};

const User = model<IUser>("User", userSchema);

export { User };
