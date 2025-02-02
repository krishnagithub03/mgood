"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mgoodId, setMgoodId] = useState("");
  const navLinks = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About Us",
      path: "/about-us",
    },
    {
      id: 3,
      name: "Teleconsultation",
      path: "/book-tc",
    },
    {
      id: 4,
      name: "Prescriptions",
      path : "/prescriptions"
    }
  ];
  const handleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    if (user?.email) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getMgoodId`, {
          email: user.email,
        })
        .then((res) => {
          setMgoodId(res.data.mgoodId);
        })
        .catch((error) => {
          setMgoodId("Not Found");
          // console.error("Failed to fetch MgoodId:", error);
        });
    }
  }, [user]);
  return (
    <nav className="p-3 flex justify-between bg-white items-center shadow-sm text-black">
      <a href="/" className="flex items-center gap-2">
        <Image
          src="/asset5.jpg"
          className="object-cover max-w-12 max-h-12"
          width={180}
          height={80}
          alt="logo"
        />
        <span className="text-lg font-medium font-display">MGood</span>
      </a>
      <ul className="hidden md:flex gap-12 font-body font-medium">
        {navLinks.map((item, index) => (
          <Link href={item.path} key={item.id}>
            <li className="hover:scale-105 ease-in-out  hover:text-primary cursor-pointer">
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <div
        className={`flex align-middle ${user ? "border-2 rounded-full" : ""}`}
      >
        {!user ? (
          <Link href="/book-tc">
            {/* <LoginLink> */}
            <button className="text-xs md:text-base md:flex gap-2 items-center border-2 border-gray-400 hover:bg-primary px-2 md:px-6 py-2 rounded-md font-display">
              Start Teleconsultation
              <i className="fa-solid fa-phone ml-2 md:ml-0"></i>
              {/* <i className="fa-solid fa-arrow-right"></i> */}
            </button>
            {/* </LoginLink> */}
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Image
                width={40}
                height={40}
                src={
                  user?.picture ==
                  "https://gravatar.com/avatar/8f09e2c347dc3a23653c40425f4b41d7fe947e270661cf900899a7499884995f?d=blank&size=200"
                    ? "/profile.jpg"
                    : user?.picture
                }
                alt="profile-pic"
                className="rounded-full border-2"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <ul className="flex flex-col font-display">
                <li className="cursor-pointer hover:bg-slate-300 p-2 rounded-md">
                  My Profile
                </li>
                <li className="cursor-pointer hover:bg-slate-300 p-2 rounded-md">
                  Appointments
                </li>
                <li className="cursor-pointer hover:bg-slate-300 p-2 rounded-md">
                  MgoodId : {mgoodId}
                </li>
                <li className="cursor-pointer hover:bg-slate-300 p-2 rounded-md">
                  <LogoutLink>Log Out</LogoutLink>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        )}

        <button className="p-2 md:hidden" onClick={handleMenu}>
          <i className="fa-solid fa-bars text-gray-500"></i>
        </button>
      </div>

      {showMobileMenu && (
        <div
          className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${
            showMobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4 shadow-sm p-3">
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/asset5.jpg"
                className="object-cover max-w-12 max-h-12"
                width={180}
                height={80}
                alt="logo"
              />
              <span className="text-lg font-medium font-display">MGood</span>
            </a>
            <button className="p-2" onClick={handleMenu}>
              <i className="fa-solid fa-xmark text-gray-500"></i>
            </button>
          </div>
          <ul className="flex flex-col gap-4 font-body font-medium mt-5 p-3">
            {navLinks.map((item) => (
              <Link href={item.path} key={item.id}>
                <li
                  className="hover:text-primary cursor-pointer"
                  onClick={handleMenu}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
