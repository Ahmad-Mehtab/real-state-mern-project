import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signIn = async (data) => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers : { 'Content-Type': 'application/json'},
      body : JSON.stringify(data)
    });
    const resposeData = await res.json();
    setLoading(false)
    if (resposeData.success == false) {
      setError(true);
      return;
    }
    setError(false);
  } catch (error) {
      console.log('error: ', error);
      setLoading(false);
      setError(true);
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
          type="submit" disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "loading..." : "SIGN IN" }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>If You Dont Have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">SIGN UP</span>
        </Link>
        <h4 className="text-lg text-red-500 ml-auto">{error && "Something wrong!!" }</h4> 
      </div>
    </div>
  );
}

export default SignIn;
