import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeOffIcon, EyeIcon } from "lucide-react";
function AuthForm({ buttonText, handleSubmitAction }) {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleSubmitAction(data.email, data.password);
  };
  const togglePass = () => setShowPass((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Email Input */}
      <div className="form-control flex flex-col ">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mt-2"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
        )}
      </div>
      {/* password */}
      <div className="form-control mt-2 flex flex-col relative">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type={showPass ? "text" : "password"}
          placeholder="Enter your password"
          className="input input-bordered w-full mt-2 pr-5"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          // required
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be of minimum 6 characters",
            },
          })}
        />
        {/* toggleButton */}
        <button
          type="button"
          onClick={togglePass}
          className="absolute right-3 top-11"
        >
          {showPass ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
        {errors.password && (
          <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
        )}
      </div>
      {/* Login Btn */}
      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
