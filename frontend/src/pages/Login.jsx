import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      // VALIDATION

      if (!formData.email) {
        setError(
          "Email is required"
        );

        return;
      }

      if (!formData.password) {
        setError(
          "Password is required"
        );

        return;
      }

      const res = await API.post(
        "/auth/login",
        formData
      );

      const token =
        res.data?.token;

      const student =
        res.data?.student;

      // SAFETY CHECK

      if (!student || !token) {
        setError(
          "Invalid login response"
        );

        return;
      }

      // STORE DATA

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "studentId",
        student.id
      );

      localStorage.setItem(
        "studentName",
        student.name
      );

      localStorage.setItem(
        "studentEmail",
        student.email
      );

      // AUTH CONTEXT

      login(token, student);

      // REDIRECT

      navigate("/upload");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data ||
          error.message
      );

      // BACKEND ERRORS

      if (
        error.response?.data
          ?.message ===
        "Invalid credentials"
      ) {
        setError(
          "Incorrect email or password"
        );
      } else if (
        error.response?.status ===
        404
      ) {
        setError(
          "User not found"
        );
      } else if (
        error.response?.status ===
        500
      ) {
        setError(
          "Server error. Try again later."
        );
      } else {
        setError(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* LOGO */}

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Path
            <span className="text-cyan-400">
              .AI
            </span>
          </h1>
        </div>

        {/* HEADING */}

        <h2 className="mb-2 text-3xl font-bold text-white">
          Welcome back
        </h2>

        <p className="mb-8 text-sm text-gray-400">
          Sign in to continue your
          AI career journey
        </p>

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-300">
            <AlertCircle
              size={18}
            />

            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-white px-4 transition-all focus-within:border-cyan-400">
              <Mail className="h-5 w-5 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="w-full bg-transparent px-3 py-4 text-sm text-black outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-white px-4 transition-all focus-within:border-cyan-400">
              <Lock className="h-5 w-5 text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className="w-full bg-transparent px-3 py-4 text-sm text-black outline-none"
              />
            </div>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 text-base font-semibold text-white transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />

                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* FOOTER */}

        <p className="mt-8 text-center text-sm text-gray-400">
          New here?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;