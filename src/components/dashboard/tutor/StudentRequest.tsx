/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function RequestList() {
  const currentUser = useSelector(selectCurrentUser);
  const [refetch, setRefetch] = useState(false);
  const [requests, setRequests] = useState<{ _id: string; isAccept?: boolean }[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/permits`);
        const data = await res.json();
        if (currentUser?.email) {
          const filtered = data?.data?.filter((b: any) => b.tutorId.email === currentUser.email);
          setRequests(filtered);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchRequest();
  }, [currentUser?.email, refetch]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/permits/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAccept: true }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setRefetch(!refetch);
        toast.success(data.message || "Request accepted!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while accepting the request.");
    }
  };

  return (
    <div className="w-full   mx-auto ">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">Request List</h2>

      <div className="space-y-4">
        {requests.map((req: any, idx: number) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex-1">
              <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
                 <span className="text-gray-600 dark:text-gray-300">{req.userEmail}</span>
              </p>
            </div>

            <div className="flex-shrink-0">
              {req.isAccept ? (
                <button
                  disabled
                  className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg cursor-not-allowed"
                >
                  Accepted
                </button>
              ) : (
                <button
                  onClick={() => handleAcceptRequest(req?.tutorId?._id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
