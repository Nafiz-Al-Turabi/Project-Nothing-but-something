"use client";

import { useLoginMutation, useRegisterMutation } from "@/app/store/apis/authApis/authApis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

type AuthFormValues = {
  username?: string;
  email: string;
  password: string;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const isRegister = mode === "register";

  const [userRegister, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [userLogin, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const content = isRegister
    ? {
        title: "Create Account",
        buttonLabel: "Register",
        prompt: "Already have an account?",
        href: "/auth/login",
        linkLabel: "Login",
      }
    : {
        title: "Admin Login",
        buttonLabel: "Login",
        prompt: "Need an account?",
        href: "/auth/register",
        linkLabel: "Register",
      };

  const onSubmit = async (data: AuthFormValues) => {
    setSubmitMessage("");
    setSubmitError("");

    const payload = isRegister
      ? {
          username: data.username?.trim() ?? "",
          email: data.email.trim(),
          password: data.password,
        }
      : {
          email: data.email.trim(),
          password: data.password,
        };

    const mutation = isRegister ? userRegister : userLogin;

    try {
      const response = await mutation(payload).unwrap();
      const token = response?.token ?? response?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      setSubmitMessage(`${content.buttonLabel} successful.`);
      router.push("/dashboard");
    } catch (error: unknown) {
      const apiError = error as { data?: { message?: string }; message?: string };
      const message = apiError?.data?.message ?? apiError?.message ?? `Unable to ${mode}.`;
      setSubmitError(message);
    }
  };

  const isMutating = isRegisterLoading || isLoginLoading;

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 rounded-md border border-gray-200 p-6 shadow-md dark:border-[#222]"
      >
        <h1 className="custom-font text-center text-2xl font-bold">
          {content.title}
        </h1>

        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="rounded-md border border-gray-200 px-4 py-2 focus:outline-none dark:border-[#222]"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          className="rounded-md border border-gray-200 px-4 py-2 focus:outline-none dark:border-[#222]"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            ...(isRegister
              ? {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }
              : {}),
          })}
          className="rounded-md border border-gray-200 px-4 py-2 focus:outline-none dark:border-[#222]"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isMutating}
          className="rounded-md bg-[#0f172b] px-4 py-2 font-bold text-white transition duration-300 hover:brightness-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#f1f5f9] dark:text-black"
        >
          {isSubmitting || isMutating ? "Please wait..." : content.buttonLabel}
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
          {content.prompt}{" "}
          <Link href={content.href} className="font-semibold underline underline-offset-4">
            {content.linkLabel}
          </Link>
        </p>

        {submitMessage && (
          <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
            {submitMessage}
          </p>
        )}

        {submitError && (
          <p className="text-center text-sm text-red-500">{submitError}</p>
        )}
      </form>
    </div>
  );
}
