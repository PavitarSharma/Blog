import { NextFunction, Request, Response } from "express";
import { authService, userService } from "../services";
import { ILoginInputs, IRegisterInputs } from "../dto/user.dto";
import createHttpError from "http-errors";
import { getAuth } from "firebase-admin/auth";
import { User } from "../models";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    const signupData = <IRegisterInputs>req.body;
    const { fullname, email, password } = signupData;

    if (!fullname || !email || !password)
      return next(
        createHttpError(
          400,
          "Insufficient fields provided. Please provide all required fields: (fullname, email, password)"
        )
      );

    const hashPassword = await authService.generateHashPassword(
      signupData.password
    );

    const userData = {
      ...signupData,
      password: hashPassword,
    };

    try {
      const user = await userService.createUser(userData);
      const acess_token = await authService.generateSignature(user);
      const response = await userService.formatDatatoSend(user, acess_token);
      res.status(201).json(response);
    } catch (error: any) {
      return next(createHttpError(500, error.message));
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const loginData = <ILoginInputs>req.body;
    const { email, password } = loginData;
    if (!email || !password)
      return next(
        createHttpError(
          400,
          "Insufficient fields provided. Please provide all required fields: (email, password)"
        )
      );

    const user = await authService.signInUser(loginData);

    if (!user) return next(createHttpError(400, "Invalid credentials"));

    const access_token = await authService.generateSignature(user);
    const response = await userService.formatDatatoSend(user, access_token);
    res.status(200).json(response);
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = req.body;

    getAuth()
      .verifyIdToken(accessToken)
      .then(async (decodedUser) => {
        console.log(decodedUser);

        let { email, name, picture } = decodedUser;
        picture = picture?.replace("s96-c", "s384-c");

        // let user = await User.findOne({ email })
        //   .select("fullname, email, username profile_img google_auth")
        //   .then((u) => {
        //     return u || null;
        //   })
        //   .catch((error) => {
        //     return next(createHttpError(500, error.message));
        //   });

        // if (user) {
        //   if (!user.google_auth) {
        //     return next(
        //       createHttpError(
        //         400,
        //         "This email was signed  without hoogle. Please log on with passsword to access the account"
        //       )
        //     );
        //   } else {
        //     let username;
        //     if (email) {
        //       username = await userService.generateUsername(email);
        //     }

        //     const userData = {
        //       fullname: name,
        //       username,
        //       email,
        //       google_auth: true,
        //     };

        //     user = new User(userData);

        //     await user
        //       .save()
        //       .then((u) => {
        //         user = u;
        //       })
        //       .catch((error) => {
        //         return next(createHttpError(500, error.message));
        //       });
        //   }
        // }

        // if (user) {
        //   const acess_token = await authService.generateSignature(user);
        //   const response = await userService.formatDatatoSend(
        //     user,
        //     acess_token
        //   );
        //   res.status(200).json(response);
        // }
      })
      .catch((error) => {
        return next(
          createHttpError(
            500,
            "Failed to authenticate you with google. Try with some other google account."
          )
        );
      });
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {}

  async resetPassword(req: Request, res: Response, next: NextFunction) {}

  async signOut(req: Request, res: Response, next: NextFunction) {}

  async profile(req: Request, res: Response, next: NextFunction) {
    const user = await userService.findUser(req.params.username);

    res.status(200).json(user);
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    const user = await userService.findUser("");
    res.status(200).json(user);
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {}

  async searchUsers(req: Request, res: Response, next: NextFunction) {
    const { query } = req.query;
    const users = await userService.searchUsers(query as string);

    res.status(200).json(users);
  }
}

const userController = new UserController();

export { userController };
