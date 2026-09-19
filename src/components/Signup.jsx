import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const createData = await authService.createAccount(data);

      if (createData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/60">
        <div className="mb-2 flex justify-center">
          <Logo />
        </div>
        <h2 className="font-display text-center text-2xl font-semibold leading-tight text-slate-900">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-slate-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" bgColor="bg-slate-900" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
