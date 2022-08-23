import React, { useState } from "react";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../src/firebase.init";

const Ragister = () => {
  const [imgUrl, setImgUrl] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, uperror] = useUpdateProfile(auth);

  const navigate = useNavigate();

  //custom hook
  //custom hook
  if (user) {
    navigate("/home");
  }

  let errorMessage;

  const onSubmit = async (data) => {
    const email = data.email;
    const pass = data.password;
    const user = data.username;
    const info = {
      username: user,
      password: pass,
    };
    await createUserWithEmailAndPassword(email, pass);
    console.log(info);
    fetch("https://otif-server-dot-otif-mx.uc.r.appspot.com/access/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => {
        res.json();
        console.log(res.status);
      })
      .then((data) => console.log(data));
  };

  if (error || uperror) {
    errorMessage = (
      <p className="text-red-500">{error?.message || uperror?.message}</p>
    );
  }

  return (
    <div>
      <div className="flex h-screen justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign in</h2>
            <hr />
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                  {/* name */}
                  <label className="label">
                    <span className="label-text-alt">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="your name"
                    className="input input-bordered w-full max-w-xs"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "name is required",
                      },
                    })}
                  />
                  <label className="label">
                    <span className="label-text-alt">User name</span>
                  </label>
                  <input
                    className="input input-bordered w-full max-w-xs mt-6"
                    type="text"
                    id=""
                    placeholder="UserName"
                    {...register("username", {})}
                  />
                  <label className="label">
                    {errors.name?.type === "required" && (
                      <span className="label-text-alt text-red-700">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                  {/* email */}
                  <label className="label">
                    <span className="label-text-alt">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your username"
                    className="input input-bordered w-full max-w-xs"
                    {...register("email", {})}
                  />
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
                  <label className="label">
                    {errors.password?.type === "required" && (
                      <span className="label-text-alt text-red-700">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="label-text-alt text-red-700">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>
                {errorMessage}
                <div className="text-center mt-4">
                  <input
                    className="btn btn-primary w-full"
                    type="submit"
                    value="Sign up"
                  />
                </div>
                <p className="my-4">
                  <small>
                    allrady have an account?{" "}
                    <Link className="text-blue-600 underline" to="/login">
                      login here
                    </Link>
                  </small>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ragister;
