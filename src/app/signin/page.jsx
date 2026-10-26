'use client'
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/vayro.png";

// React Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/react";

const Page = () => {
  const [showpassword , setShowPassword] = useState(false)
  return (
    <div
      className='flex min-h-dvh flex-col '
    >
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

          <p className="mt-2 text-[16px] tracking-[0.01em] text-[var(--color-charcoal)] sm:mt-[5px] sm:text-[18px]">
            Enter your email to sign in or join
          </p>
        </div>

        {/* Email Input */}
        <div className="mt-8 sm:mt-5">
          <label
            htmlFor="email"
            className="block text-[15px] font-semibold"
          >
            EMAIL:*
          </label>

          <input
            id="email"
            name="email"
            type="text"
            autoComplete="off"
            placeholder="email"
            className="mt-4 h-12 w-full rounded-none border border-[#000000] px-4 text-10 text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />

           <label
            htmlFor="email"
            className="block text-[15px] font-semibold"
          >
            PASSWORD:*
          </label>
          <div className="relative">
             <input
            id="password"
            name="password"
            type={showpassword ? 'text': 'password'}
            autoComplete="off"
            placeholder="password"
            className=" mt-4 h-12 w-full rounded-none border border-[#000000] px-4 text-10 text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          /> 
          <button className="absolute right-4 top-7 cursor-pointer text-[#3C3C3C]" type="button" onClick={() => setShowPassword(!showpassword)} >
            {
              showpassword? (
                <FaRegEyeSlash size={20} /> ):
                (
                  <FaRegEye size={20} />
                )
            }

          </button>

          </div>

         

          {/* Continue Button */}
          <Button
            type="button"
            className="mt-5 flex bg-[#3C3C3C] w-full items-center justify-center rounded-none"
          >
            CONTINUE
          </Button>
        </div>

        {/* Divider */}
        <div className="mt-5 flex items-center gap-5">
          <div className="h-px flex-1 bg-[var(--color-border)]" />

          <span className="whitespace-nowrap text-[16px] text-[var(--color-muted)]">
            or continue with
          </span>

          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {/* Social Login */}
        <div className="mt-6 flex items-center justify-center gap-6 sm:gap-[34px]">

          {/* Google */}
          <button
            type="button"
            aria-label="Continue with Google"
            className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-white)] transition-colors hover:border-[var(--color-charcoal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FcGoogle size={28} />
          </button>

          {/* Facebook */}
          <button
            type="button"
            aria-label="Continue with Facebook"
            className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-white)] transition-colors hover:border-[var(--color-charcoal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FaFacebook
              size={28}
              color="#1877F2"
            />
          </button>

          {/* Apple */}
          <button
            type="button"
            aria-label="Continue with Apple"
            className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-white)] transition-colors hover:border-[var(--color-charcoal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <FaApple
              size={30}
              className="text-[var(--color-primary)]"
            />
          </button>
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
