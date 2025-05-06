"use client";

import React from "react";
import { useAppSelector } from "@/Redux/hook";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux/Features/Auth/authSlice";
import { persistor } from "@/Redux/store";
import { useRouter } from "next/navigation";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const handleLogOut = () => {
    dispatch(logout());
    persistor.purge();
    router.push("/");
  };
  return (
    <nav className="fixed top-0 left-0 lg:left-64 right-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-8 shadow-sm">
      {/* Welcome Message */}
      <div className="hidden sm:block text-sm sm:text-lg font-semibold text-blue-600 dark:text-white truncate">
        Hi {user?.name}, Welcome to your Dashboard
      </div>

      {/* Avatar & Dropdown */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Image
                src={"https://i.ibb.co/Dc78Zt5/avatar-1299805-1280.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full w-10 h-10  hover:ring-2 ring-blue-400 transition dark:bg-blue-100"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md p-2 mt-2 w-44"
            sideOffset={8}
          >
            <DropdownMenuItem asChild>
              <Link
                href={'/'}
                className="flex items-center gap-2 px-2 py-2 rounded text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <LayoutDashboard size={18} /> Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={
                  user.role === "Student"
                    ? "/studentdashboard/profile"
                    : "/tutor/profile"
                }
                className="flex items-center gap-2 px-2 py-2 rounded text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <LayoutDashboard size={18} /> Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleLogOut(); // implement this
              }}
              className="flex items-center gap-2 px-2 py-2 rounded text-sm text-red-600 hover:bg-red-600   hover:text-white dark:hover:text-white   dark:hover:bg-red-800 transition cursor-pointer"
            >
              <LogOut size={18} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default DashboardNavbar;
