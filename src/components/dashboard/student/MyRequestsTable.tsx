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
          {
            next: { revalidate: 5 },
          }
        );

        const data = await res.json();
        console.log("mydata", data);

        setRequests(data?.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchRequest();
  }, [currentUser?.email]);

  const makePayment = async (data: { [key: string]: any }) => {
    console.log("inside paymet", data);
    const stripe = await loadStripe(
      "pk_test_51NFeKsHXxHHqqBSEXEZ6oVqeAquqIpszGA5xvnGO3XSkrX53ffO3A2pRkRRuIhjoVvUKiFxBoC476BMmG8pr8GDK00kNXNphd6"
    );

    const body = {
      data,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    console.log("session", session);

    const result = await stripe?.redirectToCheckout({
      sessionId: session?.id,
    });
    // setLoading(false);
    console.log("payment result", result);

    if (result?.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-600 shadow rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-blue-100 text-blue-800">
          <tr className="text-left">
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
          {requests?.map((d, i) => (
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
                {" "}
                {
                  new Date(d.tutorId?.availability?.from)
                    .toISOString()
                    .split("T")[0]
                }{" "}
                -{" "}
                {
                  new Date(d.tutorId?.availability?.to)
                    .toISOString()
                    .split("T")[0]
                }
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    d.accepted === "Yes" ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {d?.isAccept === true ? (
                    <button>Yes</button>
                  ) : (
                    <button>No</button>
                  )}
                </span>
              </td>
              <td className="p-3">
                <span className="px-2 py-1 rounded  text-white text-xs">
                  {d.isPayment === false ? <p>Pending</p> : <p>Paid</p>}
                </span>
              </td>
              <td className="p-3">
                {d.isPayment ? (
                  <Button
                    disabled
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-green-700 text-base"
                  >
                    Paid
                  </Button>
                ) : (
                  <Button
                    onClick={() => makePayment(d)}
                    disabled={!d.isAccept}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-100 disabled:text-blue-500 text-base"
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
  );
}
