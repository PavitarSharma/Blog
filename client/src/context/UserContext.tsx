import React, { createContext, useEffect, useState } from "react";
import { lookInSession } from "../common/session";

export interface IUser {
  access_token: string | null;
  _id?: string;
  fullname?: string;
  username?: string;
  email?: string;
  profile_img?: string;
}

interface IUserContext {
  userAuth: IUser | null;
  setUserAuth: (user: IUser | null) => void;
}

export const UserContext = createContext<IUserContext>({
  userAuth: null,
  setUserAuth: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userAuth, setUserAuth] = useState<IUser | null>(null);

  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
