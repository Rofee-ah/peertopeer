"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { ProfileDisplay } from "./ProfileDisplay";
import { useWindowSize } from "@/hooks/useWindowSize";
import { removeUser } from "@/redux/slice/UserSlice";
import { removeVendor } from "@/redux/slice/VendorSlice";

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { vendor } = useSelector((state) => state.vendor);
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  // Prevent background scrolling when menu opens
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const handleLogout = () => {
    setOpenNavigation(false);
    dispatch(removeUser());
    dispatch(removeVendor());
    router.push("/");
  };

  return (
    <div className="bg-[#f9fbff]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4">
        <div className="mx-auto max-w-7xl rounded-full bg-white shadow-xl px-5 md:px-8 py-4 md:py-7 flex items-center justify-between ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-[#0053c6] flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
              U
            </div>

            <span className="text-lg md:text-xl font-semibold text-gray-900">
              UI Exchange
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-gray-800 font-medium">
            <Link
              href="/BrowseMarketPlace"
              className="hover:text-blue-600 transition"
            >
              Browse Marketplace
            </Link>

            <Link
              href="/SellOnUiExchange"
              className="hover:text-blue-600 transition"
            >
              Sell on UI Exchange
            </Link>
          </nav>

          {/* Desktop Auth */}
          {!user ? (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/Login"
                className="text-gray-900 font-medium hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link href="/SignUp">
                <button className="rounded-full bg-blue-600 px-6 py-2.5 text-white font-semibold hover:bg-blue-700 transition">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <div
                className="cursor-pointer"
                onClick={() => setOpenNavigation(!openNavigation)}
              >
                <ProfileDisplay
                  setOpenNavigation={setOpenNavigation}
                  openNavigation={openNavigation}
                />
              </div>

              {openNavigation && (
                <div className="absolute right-0 top-full z-50 mt-4 w-[300px] rounded-[32px] bg-white px-6 py-6 shadow-2xl ring-1 ring-black/5">
                  <nav className="flex flex-col space-y-4 text-gray-900 font-medium text-sm">
                    <ul>
                      {path !== "/VendorProfile" && (
                        <li className="py-2">
                          <Link
                            href="/VendorProfile"
                            onClick={() => setOpenNavigation(false)}
                            className="hover:text-blue-600 transition"
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}
                      <li style={{ cursor: "pointer" }}>
                        <button
                          // href="#"
                          onClick={handleLogout}
                          className="hover:text-blue-600 transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[#0053c6]"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h20M4 14h20M4 21h20" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-full z-50 px-4 pt-24 transition-all duration-200 ease-out
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-[32px] shadow-2xl px-6 py-8 relative md:hidden">
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-0 left-6 h-12 w-12 rounded-full bg-white shadow flex items-center justify-center text-blue-600 text-xl"
          >
            ✕
          </button>

          <nav className="space-y-8 text-gray-900 font-medium text-lg mt-10">
            <Link href="/" onClick={() => setOpen(false)} className="block">
              Browse Marketplace
            </Link>

            <Link
              href="/SellOnUiExchange"
              onClick={() => setOpen(false)}
              className="block"
            >
              Sell on UI Exchange
            </Link>
          </nav>

          {/* Auth */}
          {!user && (
            <div className="mt-12 flex items-center gap-6">
              <Link
                href="/Login"
                onClick={() => setOpen(false)}
                className="text-gray-900 font-medium text-lg"
              >
                Login
              </Link>

              <Link href="/SignUp">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-blue-600 px-8 py-3 text-white font-semibold text-lg"
                >
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
