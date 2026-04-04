"use client";

import React from "react";

import { useSelector } from "react-redux";

import {
  CompleteSignUp,
  SetPassword,
  SetProfile,
  VerifyEmail,
} from "@/component/signup";

const page = () => {
  const { account } = useSelector((state) => state.register);
  console.log({ account });

  const name = "qudus";

  let PageComponent;
  switch (true) {
    case account === null:
      PageComponent = SetProfile;
      break;
    case account.verified === true && !account.password:
      PageComponent = SetPassword;
      break;
    case account.password !== null && account.verified === true:
      PageComponent = CompleteSignUp;
      break;
    case account.email !== "":
      PageComponent = VerifyEmail;
      break;
    default:
      PageComponent = SetProfile;
  }

  return (
    <>
      <PageComponent />
    </>
  );
};

export default page;
