
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import logo from "../../assets/vayro.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }


    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "Unable to create your account."
        );
        return;
      }

      if (!data?.user) {
        toast.error("Account creation could not be confirmed.");
        return;
      }

      toast.success("Account created successfully!");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-[430px] flex-1 flex-col px-5 pt-12 sm:px-0 sm:pt-[65px]">

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="VAYRO"
            width={210}
            height={75}
            priority
            className="h-[75px] w-[210px] object-contain bg-[#3C3C3C]"
          />
        </div>

        {/* Heading */}
        <div className="mt-2 text-center sm:mt-[5px]">
          <h1 className="text-[28px] font-bold tracking-[0.02em] sm:text-[30px]">
            Create your account
          </h1>

          <p className="mt-2 text-[16px] tracking-[0.01em] text-[var(--color-charcoal)] sm:mt-[5px] sm:text-[18px]">
            Join VAYRO and discover your style
          </p>
        </div>

        {/* Signup Form */}
        <form
          className="mt-8 sm:mt-5"
          onSubmit={onSubmit}
        >
          {/* Full Name */}
          <label
            htmlFor="name"
            className="block text-[15px] font-semibold"
          >
            FULL NAME:*
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            required
            maxLength={100}
            className="mt-4 h-12 w-full rounded-none border border-[#000000] px-4 text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />

          {/* Email */}
          <label
            htmlFor="email"
            className="mt-5 block text-[15px] font-semibold"
          >
            EMAIL:*
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            className="mt-4 h-12 w-full rounded-none border border-[#000000] px-4 text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="mt-5 block text-[15px] font-semibold"
          >
            PASSWORD:*
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
              required
              className="mt-4 h-12 w-full rounded-none border border-[#000000] px-4 pr-12 text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />

            <button
              type="button"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showPassword}
              className="absolute right-4 top-7 cursor-pointer text-[#3C3C3C]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>

       

          

          {/* Create Account Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="mt-5 flex w-full items-center justify-center rounded-none bg-[#3C3C3C] text-white"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-[14px] text-[var(--color-charcoal)]">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Guest Shopping */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-[14px] text-[var(--color-charcoal)] underline underline-offset-4"
          >
            Continue shopping without an account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[var(--color-primary)] text-[var(--color-white)]">
        <div className="mx-auto flex min-h-[58px] max-w-[1040px] items-center px-5 text-[13px] tracking-[0.02em]">
          © 2026 VAYRO
        </div>
      </footer>
    </div>
  );
};

export default Page;
