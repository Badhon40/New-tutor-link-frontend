/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
type Email = {
  email: string;
};
type B = {
  userEmail: string;
  tutorId: Email;
};
const BookingTable = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const [bookings, setBookings] = useState([]);
  console.log("from state ", bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/permits`, {
          next: { revalidate: 30 },
        });

        const data = await res.json();

        if (currentUser?.email) {
          const filtered = data?.data?.filter(
            (b: B) => b.userEmail === currentUser.email
          );
          setBookings(filtered);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [currentUser?.email]);

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto p-4">
        <h2 className="text-xl font-semibold mb-4 ">Booking Details</h2>
        <table className="w-full table-auto text-sm text-left ">
          <thead className="text-gray-700 border-b ">
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Tutor Id</th>

              <th className="px-4 py-2">Total Amount</th>

              <th className="px-4 py-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b: any, i) => (
              <tr key={i} className="border-b ">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{b?.userEmail}</td>
                <td className="px-4 py-2">{b?.tutorId?._id}</td>

                <td className="px-4 py-2">{b.price}</td>

                <td className="px-4 py-2">
                  <span className=" text-white text-xs font-semibold px-3 py-1 rounded">
                    {b?.isPayment === false ? <p>Pending</p> : <p>Paid</p>}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
