"use client";

import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";

export default function Locomotive() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return null;
}
