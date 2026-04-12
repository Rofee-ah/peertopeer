"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CampusPicks from "@/component/CampusPicks";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import HeroSection from "@/component/HeroSection";
import ScrollIndicator from "@/component/ScrollIndicator";
import Trade from "@/component/Trade";

import { removeVendor, setVendor } from "@/redux/slice/VendorSlice";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) return;
    if (!user._doc.isVendor) return;
    const getVendorDetails = async () => {
      try {
        const response = await fetch(
          `/api/get-vendor?email=${user._doc.email}`,
          {
            method: "GET",
          },
        );
        const initData = await response.json();
        if (!initData.success) return;
        toast.success("Vendor Details Fetched successfully");
        dispatch(setVendor(initData.data));
      } catch (error) {
        console.error(error);
      }
    };
    getVendorDetails();
  }, []);
  return (
    <>
      <Header />
      <HeroSection />
      <ScrollIndicator />
      <CampusPicks />
      <Trade />
      <Footer />
    </>
  );
}
