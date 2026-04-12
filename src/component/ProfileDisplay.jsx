import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Eye, ArrowDown } from "lucide-react";

import { getInitials } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";

export const ProfileDisplay = ({ openNavigation, setOpenNavigation }) => {
  const { user } = useSelector((state) => state.user);
  const { width } = useWindowSize();
  const [userInitials, setUserInitials] = useState();

  useEffect(() => {
    if (!user) return;
    const nameInitial = getInitials(user._doc.firstName, user._doc.lastName);

    setUserInitials(nameInitial);
  }, [user]);

  return (
    <>
      <div
        className="border border-solid border-slate-300 rounded-4xl px-2 py-2"
        onClick={() => setOpenNavigation(!openNavigation)}
      >
        <div className="flex">
          <div
            className="rounded-full px-2 py-2.5 text-blue-500 font-bold"
            style={{ padding: "8px", backgroundColor: "lightblue" }}
          >
            {userInitials}
          </div>
          {width > 768 && (
            <div className="flex flex-col items-start px-2">
              <div className="flex items-center">
                <div className="flex flex-col items-start">
                  <div className="text-black text-sm">
                    {user._doc.firstName}
                    {user._doc.lastName}
                  </div>
                  <div className="text-black text-xs">{user._doc.email}</div>
                </div>
                <ArrowDown size="16px" className="text-black ml-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
