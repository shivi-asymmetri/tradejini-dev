"use client";
import Image from "next/image";
import FadeInWrapper from "./FadeInWrapper";
import PhoneInput from "react-phone-input-2";

import { GridBeam } from "./GridBeam";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { WebEngage } from "@/utils/webengage";
export default function JoinTheTradingRevolution() {
  function trimNumber(num: string) {
    // const lastElement = num[num.length - 1];
    let strp: string[] = [];
    for (let i = num.length; i--; i < 2) {
      strp = [...strp, num[i]];
    }
    return strp.splice(0, 10).reverse().join("");
  }

  const [number, setNumber] = useState("");

  return (
    <section className="w-full bg-black bg-grid-white/10">
      <div className="relative flex flex-col items-stretch overflow-hidden md:max-h-[100vh] md:min-h-[100vh] md:flex-row">
        <svg
          width="156"
          height="63"
          viewBox="0 0 156 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0 ml-24 mt-8"
        >
          <path
            d="M31 .5h32M0 .5h32m30 31h32m-1 0h32m-1 31h32M62.5 32V0m62 63V31"
            stroke="url(#grad1)"
            strokeWidth={1.5}
          />
          <defs></defs>
        </svg>

        <div className="flex flex-col mt-6 md:mt-0 justify-center space-y-0 px-5 text-white md:w-[65%] md:space-y-8 md:p-8 md:pl-20 xl:px-32">
          <h4 className="font-poppins text-2xl font-bold text-white max-md:text-center md:text-4xl">
            Be part of the&nbsp;
            <span className="md:hidden">trading revolution</span>
            <span className="bg-gradient-to-r from-[#00B1D2] to-[#19DEA0] bg-clip-text text-transparent max-md:hidden">
              <br />
              Trading Revolution
            </span>
            <span className="bg-gradient-to-b from-[#05FAB0] to-[#058950] bg-clip-text text-transparent md:hidden">
              <br />
              Faster
            </span>
          </h4>
          <Image
            width={240}
            height={240}
            className="w-40 max-md:mx-auto max-md:my-6 max-md:w-60 md:w-60"
            src="/customers2.webp"
            alt=""
          />
          <p className="font-bold text-white/60 max-md:text-center">
            Open a free <span className="text-[#239AB8]">Demat</span> account in
            minutes.
          </p>

          <div className="grid place-items-center pt-3 md:hidden">
            <a
              href="https://cp.tradejini.com/Ox1Ux9"
              className="specialBg w-fit rounded-[20px] px-6 py-4 text-center font-bold text-white"
            >
              Start Now!
            </a>
          </div>
          <div className="relative pt-4 md:hidden">
            <Image
              alt="devices"
              width={3000}
              height={3000}
              className="z-[99]"
              src={"/footerMobile.webp"}
            />
          </div>

          <form
            onSubmit={async (e) => {
              WebEngage(
                "open_account_start_now_footer",
                "Footer",
                "Start Now!",
                "https://ekyc.tradejini.com/#/onboarding",
              );
              e.preventDefault();
              const id = crypto.randomUUID();
              await setDoc(doc(db, "numbers", id), {
                phoneNumber: number,
                phoneNumberWithoutCode: trimNumber(number),
                timestamp: Date.now(),
                id,
              });
              window.location.href = "https://cp.tradejini.com/Ox1Ux9?";
            }}
            className="relative flex w-full flex-col items-start justify-center rounded-lg pr-3 max-md:hidden max-md:gap-y-5 md:flex-row md:items-center"
          >
            <input
              type="text"
              value={number}
              required
              pattern="^[6-9]\d{9}$" // Validation pattern to allow only numbers starting with 6, 7, 8, or 9
              className="h-full w-full rounded-full px-5 py-3 text-black focus:outline-none"
              title="Please Enter a valid Phone Number starting with 6, 7, 8, or 9"
              placeholder="Enter mobile number" // Placeholder text
              onChange={(e) => {
                // Ensure that the number is only valid if it starts with 6, 7, 8, or 9
                if (/^[6-9]?\d{0,9}$/.test(e.target.value)) {
                  setNumber(e.target.value);
                }
              }}
            />

            <Button
              type="submit"
              className="specialBg -translate-x-12 rounded-full px-10 py-6 text-xl"
            >
              Start Now!
            </Button>
          </form>
        </div>
        <div className="relative flex items-center md:w-1/2">
          <Image
            alt="devices"
            width={3000}
            height={3000}
            className="z-[99] -translate-x-16 scale-125 py-20 max-md:hidden"
            src={"/phonelaptop.webp"}
          ></Image>
        </div>
      </div>
    </section>
  );
}
