/* eslint-disable react/no-unescaped-entities */
"use client";
import { verifyToken } from "@/lib/verifyToken";
import { setUser, TUser } from "@/Redux/Features/Auth/authSlice";
import { useAppDispatch } from "@/Redux/hook";
import { loginUser } from "@/services/auth";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing the eye icons
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  // demo login
  const demoLogin = async (role: "Tutor" | "Student") => {
    const demoCredentials = {
      Tutor: { email: "demo_teacher@gmail.com", password: "12345678" },
      Student: { email: "demo_student@gmail.com", password: "12345678" },
    };
    const data = demoCredentials[role];
    try {
      const res = await loginUser(data);
      if (res?.success) {
        const user = verifyToken(res?.data?.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      // console.log(res.data.accessToken);

      if (res?.success) {
        const user = verifyToken(res?.data?.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center px-4 py-5">
      <div className="md:w-[450px] w-[350px] shadow-[0px_0px_20px_theme(colors.blue.600)]  overflow-hidden rounded-lg border border-[#066ccb] py-6 px-8 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center py-5 border-b">
          Login Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          {/* Email Input */}
          <div className="relative">
            <label className="text-md font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="text-md font-semibold">Password</label>

            <input
              type={showPassword ? "text" : "password"} // Toggle input type based on state
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-3/5 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} color="#6B7280" />
              ) : (
                <AiFillEye size={24} color="#6B7280" />
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-lg text-blue-600 hover:underline"
            >
              Register here
            </a>
          </p>
        </form>
        <div className="text-center mt-6 space-y-4">
        <div className="flex items-center justify-center my-4">
        <div className="flex-grow h-px bg-gray-400"></div>
        <span className="px-4 text-black dark:text-gray-300 text-sm font-medium tracking-wide">
          QUICK DEMO ACCESS
        </span>
        <div className="flex-grow h-px bg-gray-400"></div>
      </div>
          {/* GitHub Login */}
          <div className="mt-4 space-x-4 flex flex-col gap-4 ">
            <Button
              variant="outline"
              className="w-full bg-blue-600 dark:bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => demoLogin("Tutor")}
            >
              {" "}
              <GiTeacher size={"2rem"} />
              Demo Login as Tutor
            </Button>
            <Button
              variant="outline"
              className="w-full bg-blue-600 dark:bg-blue-600  text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => demoLogin("Student")}
            >
              <PiStudentBold size={"2rem"} /> Demo Login as Student
            </Button>
          </div>

          <p className=" flex items-center justify-center mt-6">
            <Link
              href="/"
              className="flex gap-3 items-center text-base font-semibold text-gray-400 hover:text-[#066ccb] "
            >
              <MoveLeft /> Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
