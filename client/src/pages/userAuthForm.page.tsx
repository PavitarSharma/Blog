/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { http } from "../http";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";
import { AxiosError } from "axios";
import { storeInSession } from "../common/session";
import useUserContext from "../hooks/useUserContext";
import { authWithGoogle } from "../common/firebase";

type Inputs = {
  fullname?: string;
  email: string;
  password: string;
};

const UserAuthForm = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useUserContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userAuth.access_token) {
      navigate("/");
    }
  }, [userAuth, navigate]);

  const {
    handleSubmit,
    control,
    // formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    reset();
    setError("");
  }, [type, reset]);

  const handleLogin: SubmitHandler<Inputs> = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const { data } = await http.post("/users/signin", { email, password });
      setUserAuth(data);
      storeInSession("user", JSON.stringify(data));

      toast.success("User logged in successfully");
      setError("");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp: SubmitHandler<Inputs> = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await http.post("/users/signup", values);
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
      setError("");
      toast.success("User signned up successfully");
      navigate("/");
    } catch (error: any) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user: any = await authWithGoogle();
      console.log("user", user);

      const access_token = user.accessToken;

      const { data } = await http.post(
        "/users/google-auth",
        { access_token },
        {
          headers: {
            "Cross-Origin-Embedder-Policy": "unsafe-none",
          },
        }
      );
      console.log(data);

      // storeInSession("user", JSON.stringify(data));
      // setUserAuth(data);
      // setError("");
      // toast.success("User signned up successfully");
      // navigate("/");
    } catch (error) {
      toast.error("Trouble login through google");
      return console.log(error);
    }
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={
            type === "sign-in"
              ? handleSubmit(handleLogin)
              : handleSubmit(handleSignUp)
          }
          className="w-[80%] max-w-[400px] mx-auto"
        >
          <h1
            className={`text-4xl font-gelasio capitalize text-center ${
              error ? "mb-4" : "mb-24"
            }`}
          >
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
          {error && (
            <div
              className="w-full flex items-center justify-center rounded mb-4 text-center py-4"
              style={{ backgroundColor: "#f0000020" }}
            >
              {error}
            </div>
          )}

          {type === "sign-up" && (
            <Controller
              defaultValue=""
              name="fullname"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="Full Name"
                  value={value}
                  onChange={(text: string) => onChange(text)}
                  icon="fi-rr-user"
                />
              )}
            />
          )}

          <Controller
            defaultValue=""
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={value}
                onChange={(text: string) => onChange(text)}
                icon="fi-sr-at"
              />
            )}
          />

          <Controller
            defaultValue=""
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={value}
                onChange={(text: string) => onChange(text)}
                icon="fi-sr-key"
              />
            )}
          />

          {type === "sign-in" && (
            <Link
              to="/forgot-password"
              className="cursor-pointer text-right block underline -mt-3 font-gelasio italic"
            >
              Forgot Password?
            </Link>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-dark center mt-14"
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center my-10 opacity-10 uppercase text-black font-bold gap-2">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            onClick={handleGoogleAuth}
            type="button"
            className="btn-dark flex items-center justify-center gap-4 w-[90%] mx-auto"
          >
            <img src="/imgs/google.png" alt="google-icon" className="w-5" />
            continue with google
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link
                to="/signup"
                className="underline cursor-pointer text-black tetx-xl ml-1"
              >
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link
                to="/signin"
                className="underline cursor-pointer text-black tetx-xl ml-1"
              >
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
