/* eslint-disable @typescript-eslint/no-explicit-any */
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
// Importing social media icons

const LoginForm = () => {
 
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirectPath');
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
          router.push('/');
        }
      } else {
        toast.error(res?.message);
      }
     
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDemoTeacherLogin = async () => {
    const demoUser = {
      email: "demo_teacher@gmail.com", // Replace with actual demo teacher email
      password: "12345678", // Replace with actual password
    };
    try {
      const res = await loginUser(demoUser);
      if (res?.success) {
        const user = verifyToken(res?.data?.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));
        toast.success("Logged in as Demo Teacher");
        router.push('/'); // Redirect to teacher dashboard
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong with Demo Teacher Login");
    }
  };
  
  const handleDemoStudentLogin = async () => {
    const demoUser = {
      email: "demo_student@gmail.com", // Replace with actual demo student email
      password: "12345678", // Replace with actual password
    };
    try {
      const res = await loginUser(demoUser);
      if (res?.success) {
        const user = verifyToken(res?.data?.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));
        toast.success("Logged in as Demo Student");
        router.push('/'); // Redirect to student dashboard
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong with Demo Student Login");
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
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
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
          <p className="text-sm text-gray-600">Or login with</p>

          {/* GitHub Login */}
          <button onClick={()=>handleDemoTeacherLogin()} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md bg-gray-100 text-black hover:bg-gray-200 transition duration-300">
            Demo Teacher Login
          </button>

          {/* Google Login */}
          <button onClick={handleDemoStudentLogin } className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md bg-gray-100 text-black hover:bg-gray-200 transition duration-300">
            Demo Student Login
          </button>

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
