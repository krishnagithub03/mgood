"use client";
import Image from "next/image";
import React, { useEffect } from "react";
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

function Header() {
  const navLinks = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ];

  const { user } = useKindeBrowserClient();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <nav className="p-3 flex justify-between bg-white items-center shadow-sm text-black">
      <a href="/" className="flex items-center gap-2">
        <Image
          src="/asset5.png"
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
      {!user ? (
        <LoginLink>
          <button className="md:flex gap-2 items-center border-2 border-gray-400 hover:bg-primary px-6 py-2 rounded-md font-display">
            Get Started
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </LoginLink>
      ) : (
        <Popover>
          <PopoverTrigger>
            <Image
              width={40}
              height={40}
              src={user?.picture}
              alt="profile-pic"
              className="rounded-full"
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
                <LogoutLink>Log Out</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}

      {/* <button className="p-2 md:hidden">
        <i className="fa-solid fa-bars text-gray-500"></i>
      </button> */}

      {/* <div className="fixed inset-0 bg-white"></div> */}
    </nav>
  );
}

export default Header;
