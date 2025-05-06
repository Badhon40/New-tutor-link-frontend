/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Email = {
  _id: string;
  email: string;
};
type B = {
  _id: string;
  userEmail: string;
  tutorId: Email;
  price: number;
  isPayment: boolean;
};

const BookingTable = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [studentBooking, setStudentBooking] = useState<B[]>([]);
  const [tutorBooking, setTutorBooking] = useState<B[]>([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/permits`, {
          next: { revalidate: 30 },
        });
        const data = await res.json();

        if (currentUser?.email) {
          const filteredStudentData = data?.data?.filter(
            (b: B) => b.userEmail === currentUser.email
          );
          setStudentBooking(filteredStudentData);
        } else {
          setStudentBooking([]);
        }

        if (currentUser?.id) {
          const filteredTutorData = data?.data?.filter(
            (b: B) => b?.tutorId?._id === currentUser?.id
          );
          setTutorBooking(filteredTutorData);
        } else {
          setTutorBooking([]);
        }
      } catch (error) {
        console.error("Failed to fetch studentBooking:", error);
      }
    };

    fetchBooking();
  }, [currentUser?.email, currentUser?.id]);

  const bookings = currentUser?.role === "Student" ? studentBooking : tutorBooking;

  return (
    <div className="w-full mt-12 md:mt-1">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

        {/* Table for medium and larger screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 border-b bg-blue-100 text-blue-800">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User Email</th>
                <th className="px-4 py-2">Tutor ID</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{b?.userEmail}</td>
                  <td className="px-4 py-2">{b?.tutorId?._id}</td>
                  <td className="px-4 py-2">{b?.price}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        b?.isPayment ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {b?.isPayment ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for small screens */}
        <div className="block md:hidden space-y-4">
          {bookings.map((b, i) => (
            <div key={i} className="border rounded-lg p-4 bg-blue-50 dark:bg-gray-700 shadow-sm">
              <div className="mb-2 text-sm text-gray-800 dark:text-gray-100 font-semibold">
                Booking #{i + 1}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p><strong>User Email:</strong> {b?.userEmail}</p>
                <p><strong>Tutor ID:</strong> {b?.tutorId?._id}</p>
                <p><strong>Amount:</strong> ${b?.price}</p>
                <p>
                  <strong>Payment:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      b?.isPayment ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {b?.isPayment ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
