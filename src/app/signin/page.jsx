
'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/vayro.png";

// React Icons
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaApple,
  FaRegEye,
  FaRegEyeSlash
} from "react-icons/fa";

import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Page = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Login successful");
    }

    if (error) {
      toast.error(error.message);
    }

    console.log(data, error);
  };

  const [showpassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-[#FFFFFF] text-[#000000]">

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
            Hi friend!
          </h1>

          <p className="mt-2 text-[16px] tracking-[0.01em] text-[#3C3C3C] sm:mt-[5px] sm:text-[18px]">
            Enter your email to sign in or join
          </p>
        </div>

        {/* Email and Password Form */}
        <form className="mt-8 sm:mt-5" onSubmit={onSubmit}>

          <label
            htmlFor="email"
            className="block text-[15px] font-semibold"
          >
            EMAIL:*
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email"
            required
            className="mt-4 h-12 w-full rounded-none border border-[#E5E5E5] bg-[#FFFFFF] px-4 text-10 text-[#000000] outline-none transition-colors placeholder:text-[#737373] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]"
          />

          <label
            htmlFor="password"
            className="block pt-3 text-[15px] font-semibold"
          >
            PASSWORD:*
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showpassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="password"
              required
              className="mt-4 h-12 w-full rounded-none border border-[#E5E5E5] bg-[#FFFFFF] px-4 pr-12 text-10 text-[#000000] outline-none transition-colors placeholder:text-[#737373] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]"
            />

            <button
              className="absolute right-4 top-7 cursor-pointer text-[#3C3C3C]"
              type="button"
              aria-label={showpassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showpassword)}
            >
              {showpassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="mt-5 flex w-full items-center justify-center rounded-none bg-[#000000] text-[#FFFFFF] hover:bg-[#3C3C3C]"
          >
            Login
          </Button>

          {/* Signup Link */}
          <p className="mt-4 text-center text-[14px] text-[#737373]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#000000] underline underline-offset-4 transition-colors hover:text-[#3C3C3C]"
            >
              Sign up
            </Link>
          </p>

        </form>

        {/* Divider */}
        <div className="mt-5 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#E5E5E5]" />

          <span className="whitespace-nowrap text-[16px] text-[#737373]">
            or continue with
          </span>

          <div className="h-px flex-1 bg-[#E5E5E5]" />
        </div>

        {/* Social Login */}
        <div className="mt-6 flex items-center justify-center gap-6 sm:gap-[34px]">

          {/* Google */}
          <button
            type="button"
            aria-label="Continue with Google"
            className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center border-2 border-[#E5E5E5] bg-[#FFFFFF] transition-colors hover:border-[#3C3C3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FcGoogle size={28} />
          </button>

          {/* Facebook */}
          <button
            type="button"
            aria-label="Continue with Facebook"
            className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center border-2 border-[#E5E5E5] bg-[#FFFFFF] transition-colors hover:border-[#3C3C3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FaFacebook size={28} color="#1877F2" />
          </button>

          {/* Apple */}
          <button
            type="button"
            aria-label="Continue with Apple"
            className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center border-2 border-[#E5E5E5] bg-[#FFFFFF] transition-colors hover:border-[#3C3C3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FaApple size={30} className="text-[#000000]" />
          </button>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[#000000] text-[#FFFFFF]">
        <div className="mx-auto flex min-h-[58px] max-w-[1040px] items-center px-5 text-[13px] tracking-[0.02em]">
          © 2026 VAYRO
        </div>
      </footer>

    </div>
  );
};

export default Page;
