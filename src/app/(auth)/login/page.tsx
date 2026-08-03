"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import api from "@/client-services/api";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const role = response.data.data.user.role;

      if (role === "branch_head") {
        router.push("/branch-head/dashboard");
      } else {
        router.push("/associate/dashboard");
      }
    } catch (err: unknown) {
      type ApiError = {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      const message =
        (err as ApiError)?.response?.data?.message ??
        "Unable to login.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">

      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

        <section className="hidden bg-linear-to-br from-blue-700 via-blue-600 to-sky-500 p-14 text-white lg:flex lg:flex-col lg:justify-between">

          <div>

            <h1 className="text-5xl font-bold leading-tight">
              Raha Field Tracker
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Track field operations,
              monitor meetings,
              calculate travel distance
              and manage reimbursements.
            </p>

          </div>

          <div className="space-y-3 text-blue-100">

            <p>✓ Live Activity Timeline</p>

            <p>✓ Smart Distance Tracking</p>

            <p>✓ Branch Analytics</p>

            <p>✓ Monthly Reports</p>

          </div>

        </section>

        <section className="flex items-center justify-center p-10">

          <form
            onSubmit={handleLogin}
            className="w-full max-w-md space-y-6"
          >

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue.
              </p>

            </div>

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <div className="relative">

              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600"
                placeholder="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-3.5"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >

              {loading
                ? "Signing In..."
                : "Continue"}

              <ArrowRight size={18} />

            </button>

          </form>

        </section>

      </div>

    </main>
  );
}