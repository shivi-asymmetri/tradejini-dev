"use client";

import { Button } from "./ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { WebEngage } from "@/utils/webengage";
import { GridBeam } from "./GridBeam";
import { useState } from "react";

export default function Form() {
  const [number, setNumber] = useState("");
  function trimNumber(num: string) {
    let strp: string[] = [];
    for (let i = num.length; i--; i < 2) {
      strp = [...strp, num[i]];
    }
    return strp.splice(0, 10).reverse().join("");
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        WebEngage(
          "open_account_start_now_top",
          "Header",
          "Start Now!",
          "https://ekyc.tradejini.com/#/onboarding",
        );
        const id = crypto.randomUUID();
        await setDoc(doc(db, "numbers", id), {
          phoneNumber: number,
          phoneNumberWithoutCode: trimNumber(number),
          timestamp: Date.now(),
          id,
        });
        window.location.href = `https://ekyc.tradejini.com/#/onboarding?mobile_number=${number}`;
      }}
      className="relative flex w-full flex-col items-start justify-center rounded-lg pr-3 max-md:hidden max-md:gap-y-5 md:flex-row md:items-center"
    >
      <input
        type="text"
        value={number}
        required
        pattern="^[6-9]\d{9}$"
        className="h-full w-full rounded-full px-5 py-3 text-black focus:outline-none"
        title="Please Enter a valid Phone Number starting with 6, 7, 8, or 9"
        placeholder="Enter mobile number"
        onChange={(e) => {
          if (/^[6-9]?\d{0,9}$/.test(e.target.value)) {
            setNumber(e.target.value);
          }
        }}
      />

      <Button
        onClick={() => {
          WebEngage(
            "open_account_start_now_top",
            "Header",
            "Start Now!",
            "https://ekyc.tradejini.com/#/onboarding",
          );
        }}
        type="submit"
        className="specialBg -translate-x-12 rounded-full px-10 py-6 text-xl"
      >
        Start Now!
      </Button>
    </form>
  );
}
