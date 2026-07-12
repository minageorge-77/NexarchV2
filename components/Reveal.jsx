"use client";

import { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";



const variantClass = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom"
};

const delayClassMap = {
  100: "delay-100",
  150: "delay-150",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
  600: "delay-600",
  700: "delay-700"
};

export default function Reveal({
  children,
  variant = "up",
  delay,
  className = ""





}) {
  const { ref, visible } = useReveal();
  const delayClass = delay ? delayClassMap[delay] : "";

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${variantClass[variant]} ${delayClass} ${className}`}>
      
      {children}
    </div>);

}