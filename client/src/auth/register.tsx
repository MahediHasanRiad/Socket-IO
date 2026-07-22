import React from "react";
import { useForm, Controller } from "react-hook-form";
import { RegisterFormValues } from "./schema";

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Create an account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your details below to register
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-100"
                }`}
              />
            )}
          />
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-100"
                }`}
              />
            )}
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-100"
                }`}
              />
            )}
          />
          {errors.password && (
            <span className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-2 px-4 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}