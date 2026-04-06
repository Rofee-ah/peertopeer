import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Home, User, Mail, Lock, CheckCircle, CircleCheck } from "lucide-react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { addAccount, removeAccount } from "@/redux/slice/RegisterSlice";

export const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.register);

  const [codeSent, setCodeSent] = useState(false);
  const [registeredToken, setRegisteredToken] = useState();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (codeSent) return;
    const verificationCode = async () => {
      const newToken =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      const response = await fetch("/api/token", {
        method: "POST",
        body: JSON.stringify({ token: newToken, email: account.email }),
      });

      const initData = await response.json();
      if (!initData.success) {
        return toast.error(initData.message);
      }
      toast(initData.message);
      setCodeSent(true);
    };
    verificationCode();
  }, [codeSent]);

  const handleEmail = () => {
    dispatch(
      addAccount({
        email: "",
      }),
    );
  };

  const goBack = () => {
    dispatch(removeAccount());
  };

  const handleSubmit = () => {
    if (otp === "" || otp.length !== 6) {
      return toast.error("invalid otp");
    }
    const verifyAccountToken = async () => {
      const response = await fetch(`/api/token-verify?email=${account.email}`, {
        method: "GET",
      });
      const initData = await response.json();
      setRegisteredToken(initData.token);
    };
    verifyAccountToken();
    if (+registeredToken === +otp) {
      dispatch(
        addAccount({
          verified: true,
        }),
      );
    } else {
      toast.error("The token you enter does not match");
      return;
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          <Home className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Go to Home</span>
        </Link>
        <div
          className="w-full max-w-2xl `bg-gradient-to-r from-[#f8fafe] rounded-3xl shadow-2xl p-8 sm:p-12"
          style={{ minHeight: "600px" }}
        >
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <div className="flex flex-col items-center text-gray-500 bg-blue-500 px-4 py-4 rounded-2xl">
              <Mail className="w-6 h-6 mb-2 text-white" />
              <span className="text-sm font-semibold text-white">
                SET PROFILE{" "}
              </span>
            </div>
            <div className="flex flex-col items-center border-2 border-blue-500 bg-blue-50 px-4 py-4 rounded-2xl">
              <User className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-semibold">VERIFY EMAIL</span>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <Lock className="w-6 h-6 mb-2" />
              <span className="text-sm font-semibold">SET PASSWORD</span>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <CircleCheck className="w-6 h-6 mb-2" />
              <span className="text-sm font-semibold">COMPLETE</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4">
            Verify your identity
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Please enter the otp that was sent to your email{" "}
            <strong>{account.email}</strong>
          </p>
          <span
            className="flex justify-center text-sm font-semibold"
            style={{ paddingBottom: "40px" }}
          >
            Not your institutional mail?{" "}
            <span
              className="text-blue-500 mx-2"
              onClick={handleEmail}
              style={{ cursor: "pointer" }}
            >
              Change
            </span>
          </span>
          <div
            className="flex justify-center text-5xl"
            style={{ paddingBottom: "40px" }}
          >
            <OTPInput
              className="border border-solid border-black"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="flex">
            <button
              onClick={goBack}
              type="submit"
              className="w-full bg-white-600 text-black py-4 border rounded-full font-semibold text-lg mx-2"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition"
            >
              Next
            </button>
          </div>
          <div className="border border-black/25 my-8"></div>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
