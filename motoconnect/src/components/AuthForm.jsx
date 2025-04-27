import React from "react";
import { useForm } from "react-hook-form";
function AuthForm({ buttonText, handleSubmitAction }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleSubmitAction(data.email, data.password);
  };

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
          className="input input-bordered"
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
      <div className="form-control mt-2 flex flex-col ">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered "
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
