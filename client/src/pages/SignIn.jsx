import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {signInStart, signInSuccess, signInFailure } from "../redux/authSlice"


function SignIn() {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  // const {loading, userData} = useSelector((state) => state.auth)
  const signIn = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        toast.error("User Not Found");
        setLoading(false);
        return;
      }
      const resposeData = await res.json();
      if (resposeData) toast.success("Login successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("User Not Found");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto w-full">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(signIn)}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          {...register("password", { required: true })}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "SIGN IN"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>If You Dont Have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">SIGN UP</span>
        </Link>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}

export default SignIn;
