import { IRegisterInputs } from "../dto/user.dto";
import { IUser, User } from "../models";
import createError from "http-errors";
import { v4 as uuidv4 } from "uuid";

class UserService {
  async isUserExist(email: string): Promise<boolean> {
    const existingUser = await User.findOne({ email });
    return !!existingUser;
  }

  async generateUsername(email: string) {
    let username = email.split("@")[0];

    const isUsernameNotUnique = await User.findOne({ username: username });

    isUsernameNotUnique ? (username += uuidv4().substring(0, 5)) : "";

    return username;
  }

  async formatDatatoSend(user: IUser, access_token: string) {
    return {
      access_token,
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profile_img: user.profile_img,
    };
  }

  async createUser(body: IRegisterInputs) {
    const userExists = await this.isUserExist(body.email);

    if (userExists) {
      const error = createError(400, "User already exists");
      throw error;
    }

    const username = await this.generateUsername(body.email);

    const newData = {
      ...body,
      username,
    };

    return await User.create(newData);
  }

  async findUser(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async addUserPost(id: any, blogId: string, total_posts: number) {
    return await User.findOneAndUpdate(
      { _id: id },
      {
        $inc: { "account_info.total_posts": total_posts },
        $push: { blogs: blogId },
      }
    );
  }
}

export const userService = new UserService();
