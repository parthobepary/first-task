import React, { useRef } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);
  const emailRef = useRef("");

  const navigate = useNavigate();

  if (user) {
    navigate("/home");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit = (data) => {
    const email = data.email;
    const pass = data.password;
    signInWithEmailAndPassword(email, pass);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Log in</h2>
          <hr />
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                {/* email */}
                <label className="label">
                  <span className="label-text-alt">User name</span>
                </label>
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="User name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                </label>
                {/* passsword */}

                <label className="label">
                  <span className="label-text-alt">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="your password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "must be 6 chareter",
                    },
                  })}
                />
              </div>
              <div className="my-2">
                <p>
                  Please login with{" "}
                  <span className="text-green-500 font-bold">
                  test@gmail.com ||
                  </span>{" "}
                  <span className="text-green-500 font-bold">12341234 </span>
                   || <span className="text-yellow-400 font-bold">
                    Or create a nwe account
                  </span>
                </p>
              </div>
              <div className="text-center mt-4">
                <input
                  className="btn btn-primary w-full"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className="my-4">
                <small>
                  new to here?{" "}
                  <Link className="text-blue-600 underline" to="/ragister">
                    create new account?
                  </Link>
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
