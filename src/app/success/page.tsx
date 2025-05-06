// app/success/page.js
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const orderPlacedRef = useRef(false);

  useEffect(() => {
    if (sessionId && !orderPlacedRef.current) {
      orderPlacedRef.current = true;

      fetch(
        `https://tutor-link-backend-pi.vercel.app/checkout-session/${sessionId}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Checkout session data:", data);
        })
        .catch((err) => console.error("Error fetching payment details:", err));
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful! 🎉
        </h1>
        <p className="mt-2 text-gray-700">Thank you for your purchase.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;