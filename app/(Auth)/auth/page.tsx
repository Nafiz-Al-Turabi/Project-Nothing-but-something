"use client";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-md flex flex-col gap-4 p-6 border border-gray-200 dark:border-[#222] rounded-md shadow-md"
      >
        <h1 className="text-center text-2xl font-bold custom-font">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
          className="border border-gray-200 dark:border-[#222] rounded-md py-2 px-4 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
          className="border border-gray-200 dark:border-[#222] rounded-md py-2 px-4 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message as string}
          </p>
        )}

        <button
          type="submit"
          className="bg-[#0f172b] dark:bg-[#f1f5f9] text-white dark:text-black font-bold py-2 px-4 rounded-md focus:outline-none hover:brightness-90 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
