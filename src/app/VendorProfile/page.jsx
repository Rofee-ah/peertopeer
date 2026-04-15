"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import { Store, Package, Eye, ArrowRight, Box, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Header from "@/component/Header";

import { setVendor, updateVendor } from "@/redux/slice/VendorSlice";
import { addUserListing } from "@/redux/slice/ListingSlice";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { vendor } = useSelector((state) => state.vendor);
  const { userListing } = useSelector((state) => state.listing);

  console.log({ vendor });
  const [isFetching, setIsFetching] = useState(false);
  const [gettingUserListing, setGettingUserListing] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (vendor) return;
    const fetchVendorDetails = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(
          `/api/get-vendor?email=${user._doc.email}`,
          {
            method: "GET",
          },
        );
        const initData = await response.json();
        if (!initData.success) {
          toast.error("Something went wrong, Try again");
          return;
        }
        dispatch(setVendor(initData.data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchVendorDetails();
  }, [user, vendor]);

  useEffect(() => {
    if (vendor) {
      setGettingUserListing(true);
      const getUserListing = async () => {
        const response = await fetch(
          `/api/get-listing?email=${user._doc.email}`,
          {
            method: "GET",
          },
        );
        const initData = await response.json();
        if (!initData.success) {
          toast.error(initData.message);
          return;
        }
        const filteredListing = initData.data.filter(
          (item) => item.email === user._doc.email,
        );
        toast.success(initData.message);
        dispatch(addUserListing(filteredListing));
        dispatch(updateVendor(filteredListing));
        setGettingUserListing(false);
      };
      getUserListing();
    }
  }, []);

  const handleProceed = () => {
    router.push("/CreateListing");
  };

  return (
    <div className="bg-[#f4f6fb] min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="pt-24 p-6 md:p-12" style={{ paddingTop: "130px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:mt-24">
          <div className="bg-white rounded-3xl shadow-md overflow-hidden lg:col-span-4">
            <div className="relative h-40 w-full overflow-visible">
              <div className="absolute inset-0 z-0">
                {vendor?.logo && (
                  <Image
                    src={vendor?.logo}
                    alt="cover logo"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl border-4 border-white">
                  <Store className="text-blue-600" size={40} />
                </div>
              </div>
            </div>

            <div className="pt-14 pb-8 px-6 text-center">
              {!isFetching ? (
                <>
                  <h2 className="text-2xl font-bold">
                    {vendor?.businessName || "Business/Profile Name"}
                  </h2>

                  <div className="flex justify-center items-center gap-2 mt-2 text-gray-500">
                    <BadgeCheck className="text-blue-600" size={16} />
                    VERIFIED VENDOR
                  </div>

                  <div className="flex justify-center gap-4 mt-6 flex-wrap">
                    <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
                      <Package size={16} />
                      {vendor?.listing.length || 0} Listings
                    </button>

                    <button className="flex items-center gap-2 bg-teal-200 text-gray-800 px-5 py-2 rounded-full">
                      <Eye size={16} />
                      Profile View
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                  </div>
                </>
              )}

              <button
                onClick={handleProceed}
                className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full flex items-center justify-center gap-2 text-lg font-medium"
              >
                Create Listing
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md flex flex-col justify-center items-center text-center p-10 lg:col-span-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <Box size={36} className="text-gray-600" />
            </div>
            {!gettingUserListing ? (
              <>
                <h3 className="text-xl font-semibold mt-6">No listings yet</h3>

                <p className="text-gray-500 mt-2 max-w-md">
                  Your business is set up and ready to go. Create your first
                  listing to start reaching students on campus.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center pt-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
