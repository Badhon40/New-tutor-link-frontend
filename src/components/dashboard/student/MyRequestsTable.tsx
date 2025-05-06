/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

export default function MyRequestsTable() {
  const currentUser = useSelector(selectCurrentUser);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/permits/get/${currentUser?.email}`,
          { next: { revalidate: 5 } }
        );
        const data = await res.json();
        setRequests(data?.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchRequest();
  }, [currentUser?.email]);

  const makePayment = async (data: { [key: string]: any }) => {
    const stripe = await loadStripe("pk_test_51NFeKsHXxHHqqBSEXEZ6oVqeAquqIpszGA5xvnGO3XSkrX53ffO3A2pRkRRuIhjoVvUKiFxBoC476BMmG8pr8GDK00kNXNphd6");

    const response = await fetch(
      "https://tutor-link-backend-theta.vercel.app/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      }
    );

    const session = await response.json();
    const result = await stripe?.redirectToCheckout({ sessionId: session?.id });
    if (result?.error) console.log(result.error);
  };

  return (
    <div className="mt-12 md:mt-1 bg-white dark:bg-gray-700 shadow rounded-lg p-4">
      {/* Table view for md and up */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Tutor Name</th>
              <th className="p-3">Availability</th>
              <th className="p-3">Accepted</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((d, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">
                  <Image
                    width={400}
                    height={400}
                    src="https://github.com/shadcn.png"
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="p-3">{d.tutorId?.name}</td>
                <td className="p-3">
                  {new Date(d.tutorId?.availability?.from).toISOString().split("T")[0]} -{" "}
                  {new Date(d.tutorId?.availability?.to).toISOString().split("T")[0]}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      d.isAccept ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  >
                    {d.isAccept ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-3 text-xs">
                  {d.isPayment ? "Paid" : "Pending"}
                </td>
                <td className="p-3">
                  {d.isPayment ? (
                    <Button disabled className="bg-green-700 text-white text-sm">
                      Paid
                    </Button>
                  ) : (
                    <Button
                      onClick={() => makePayment(d)}
                      disabled={!d.isAccept}
                      className="bg-blue-500 text-white text-sm disabled:bg-blue-200"
                    >
                      Pay Now
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small devices */}
      <div className="block md:hidden space-y-4">
        {requests.map((d, i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm bg-blue-50 dark:bg-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Image
                width={400}
                height={400}
                src="https://github.com/shadcn.png"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-base font-semibold">{d.tutorId?.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  #{i + 1}
                </p>
              </div>
            </div>
            <p className="text-sm">
              <strong>Availability:</strong>{" "}
              {new Date(d.tutorId?.availability?.from).toISOString().split("T")[0]} -{" "}
              {new Date(d.tutorId?.availability?.to).toISOString().split("T")[0]}
            </p>
            <p className="text-sm mt-1">
              <strong>Accepted:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white text-xs ${
                  d.isAccept ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {d.isAccept ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-sm mt-1">
              <strong>Payment:</strong> {d.isPayment ? "Paid" : "Pending"}
            </p>
            <div className="mt-3">
              {d.isPayment ? (
                <Button disabled className="bg-green-700 w-full text-white text-sm">
                  Paid
                </Button>
              ) : (
                <Button
                  onClick={() => makePayment(d)}
                  disabled={!d.isAccept}
                  className="bg-blue-500 w-full text-white text-sm disabled:bg-blue-200"
                >
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
