/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function RequestList() {
  const currentUser = useSelector(selectCurrentUser);

  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/permits`, {
          next: { revalidate: 30 },
        });

        const data = await res.json();
        console.log("response", data);

        if (currentUser?.email) {
          const filtered = data?.data?.filter(
            (b: any) => b.tutorId.email === currentUser.email
          );
          setRequests(filtered);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchRequest();
  }, [currentUser?.email]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/permits/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAccept: true }), // Set isAccept to true
        }
      );
      const data = await response.json();
      console.log(data);

      // if (response.ok) {
      //   // Update the requests state after accepting the request
      //   setRequests((prevRequests) =>
      //     prevRequests.map((request) =>
      //       request._id === requestId ? { ...request, isAccept: true } : request
      //     )
      //   );
      //   toast.success(data.message || "Request accepted!");
      // } else {
      //   toast.error(data.message || "Failed to accept the request.");
      // }
    } catch (error) {
      console.error(error);
      toast.error("Error while accepting the request.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4  overflow-y-auto max-h-[500px]">
      <h2 className="text-center text-xl font-bold mb-6">Request Form</h2>

      <div className="space-y-4">
        {requests.map((req: any, idx: number) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <div className="font-bold text-lg text-gray-900">
                {req.userEmail}
              </div>
            </div>
            <span
              className={`text-white text-sm font-semibold px-4 py-2 rounded-full`}
            >
              {req.isAccept ? (
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-not-allowed">
                  Accepted
                </button>
              ) : (
                <button
                  onClick={() => handleAcceptRequest(req?.tutorId?._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Accept
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
