import { ILoginInputs, IRegisterInputs } from "../dto/user.dto";
import { IUser, User } from "../models";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class AuthService {
  async generateSignature(payload: IUser): Promise<string> {
    const JWT_SECRET = process.env.SECRET_ACCESS_KEY as string;
    const payloadData = { id: payload._id };
    return jwt.sign(payloadData, JWT_SECRET, { expiresIn: "7d" });
  }

  async generateHashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async signInUser(body: ILoginInputs): Promise<IUser | null> {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return null; // User not found
    }

    if (user.google_auth) {
      throw new Error(
        "Account was created using google. Try logging with google"
      );
    }

    const isPasswordValid = await user.comparePassword(body.password);
    if (!isPasswordValid) {
      return null; // Invalid password
    }

    return user;
  }
}

export const authService = new AuthService();
export { AuthService };
