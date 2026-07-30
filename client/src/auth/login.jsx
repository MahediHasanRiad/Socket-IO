import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {useNavigate} from 'react-router'
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/auth.slice";


export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onSubmit = async (d) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, d);
    const loginData = response.data;

    console.log('Login successful:', loginData);

    await dispatch(loginUser(loginData));
    navigate('/');

  } catch (error) {
    console.error('Login failed:', error);
  }
};

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-black transition-colors"
            >
              Forgot password?
            </a>
          </div>
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
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}