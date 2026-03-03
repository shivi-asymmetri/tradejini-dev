"use client";

import React from "react";
import { EcoSystem } from "./(components)/Ecosystem";
import CubePlus from "./(components)/CubePlus";
import TryNow from "./(components)/TryNow";
import CubePlusEcosystem from "./(components)/EcosystemNew";
import Products from "@/components/ProductPage";

export default function PlatformShowcase() {
  return (
    <>
      {/* <CubePlus />
      <EcoSystem />
      <CubePlusEcosystem />
      <TryNow /> */}
      <Products />
    </>
  );
}
