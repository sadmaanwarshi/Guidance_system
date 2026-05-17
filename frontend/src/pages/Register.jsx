import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";

import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    setError("");

    setSuccess("");

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

      setSuccess("");

      // VALIDATION

      if (!formData.name) {
        setError(
          "Full name is required"
        );

        return;
      }

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

      if (
        formData.password.length <
        6
      ) {
        setError(
          "Password must be at least 6 characters"
        );

        return;
      }

      // API CALL

      const res = await API.post(
        "/auth/register",
        formData
      );

      console.log(
        "REGISTER RESPONSE:",
        res.data
      );

      setSuccess(
        "Account created successfully"
      );

      // REDIRECT AFTER SUCCESS

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(
        "REGISTER ERROR:",
        error.response?.data ||
          error.message
      );

      // EMAIL EXISTS

      if (
        error.response?.data
          ?.message ===
        "Email already exists"
      ) {
        setError(
          "Email already registered"
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
            "Registration failed"
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
          Create your account
        </h2>

        <p className="mb-8 text-sm text-gray-400">
          Get your AI-powered
          career analysis in
          minutes
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

        {/* SUCCESS */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-300">
            <CheckCircle2
              size={18}
            />

            {success}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Full Name
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-white px-4 transition-all focus-within:border-cyan-400">
              <User className="h-5 w-5 text-gray-400" />

              <input
                type="text"
                name="name"
                placeholder="John Dae"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="w-full bg-transparent px-3 py-4 text-sm text-black outline-none"
              />
            </div>
          </div>

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

            <p className="mt-2 text-xs text-gray-500">
              Password must be at
              least 6 characters
            </p>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />

                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* FOOTER */}

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;