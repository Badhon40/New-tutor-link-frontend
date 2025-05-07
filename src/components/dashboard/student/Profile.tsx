"use client";
import { updateUser } from "@/Redux/Features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const CurrentUser = useAppSelector((state) => state.auth.user);

  // Ensure the client-side rendering does not happen until after the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark as mounted once the component is rendered on the client
  }, []);

  // Fallback for initial state (before mounted) to avoid hydration mismatch
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    image: "https://github.com/shadcn.png", // Fallback image
  });

  // Set profile data after the component has mounted and `CurrentUser` is available
  useEffect(() => {
    if (CurrentUser) {
      setProfile({
        name: CurrentUser?.name || "No Name", // Default value
        email: CurrentUser?.email || "No Email", // Default value
        address: CurrentUser?.address || "No Address",
        phone: CurrentUser?.phone || "No Phone",
        image: "https://github.com/shadcn.png", // Default fallback image
      });
    }
  }, [CurrentUser]); // Trigger this when CurrentUser changes

  const [editMode, setEditMode] = useState(false);

  // Client-only rendering (prevent SSR mismatch)
  const [formData, setFormData] = useState(profile);
  if (!isMounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    try {
      console.log("Submitted Form Data:", formData);

      // Call your API to save the profile data
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/users/${CurrentUser?.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      await res.json();
      window.location.reload();
      dispatch(updateUser(formData)); // Update user in global state

      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {!editMode ? (
        <div className="bg-white dark:bg-gray-600 shadow-xl rounded-xl p-6 w-[350px] text-center space-y-2">
          <Image
            src={profile.image}
            width={500}
            height={400}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <p>
            <span className="font-semibold">Name:</span> {profile.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {profile.address}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {profile.phone}
          </p>
          <button
            onClick={() => {
              setFormData(profile); // Pre-fill the form with current profile
              setEditMode(true); // Enable editing
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-600 shadow-lg rounded-xl p-6 w-[350px] space-y-4"
        >
          <h2 className="text-lg font-semibold text-center">Edit Profile</h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
