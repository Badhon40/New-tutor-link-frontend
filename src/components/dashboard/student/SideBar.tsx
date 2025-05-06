"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/Redux/hook";
import { usePathname } from "next/navigation";

export default function SidebarWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const role = useAppSelector((state) => state.auth.user?.role);

  const routePrefix = role === "Tutor" ? "/tutor" : "/studentdashboard";

  const linkClasses = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `block px-2 py-1 rounded transition font-medium ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
    }`;
  };
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:text-gray-900 p-2 rounded shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-800 text-blue-600 shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <Link href="/">
            <div className="text-3xl font-extrabold mb-10 text-blue-600 dark:text-white">
              TutorLink
            </div>
          </Link>
          <nav className="space-y-4 font-medium">
            {role === "Tutor" && (
             <Link href={`${routePrefix}`} className={linkClasses(`${routePrefix}`, true)}>
             🏠 Dashboard
           </Link>
            )}

            <Link href={`${routePrefix}/profile`} className={linkClasses(`${routePrefix}/profile`)}>
              👤 Profile
            </Link>

            {role === "Tutor" ? (
              <Link href="/tutor/studentrequest" className={linkClasses(`/tutor/studentrequest`)}>
                📨 Student Requests
              </Link>
            ) : (
              <Link
                href="/studentdashboard/myrequest"
                className={linkClasses(`/studentdashboard/myrequest`)}
              >
                📚 Manage Tutors
              </Link>
            )}

            <Link href={`${routePrefix}/mybookings`} className={linkClasses(`${routePrefix}/mybookings`)}>
              📅 My Bookings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
