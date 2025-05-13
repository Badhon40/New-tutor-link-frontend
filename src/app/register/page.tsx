import RegisterForm from '@/components/modules/auth/register/Register';
import login from "../assets/login.png"
import Image from "next/image";

const StudentRegister = () => {
  return (
    <div className='min-h-screen w-full items-center bg-gray-200 dark:bg-gray-900 m'>
      <div className="mx-auto flex flex-col md:flex-row items-center">
       <div className="md:w-[50%] min-h-screen flex justify-center items-center">
         <Image src={login}
          height={600}
          width={600}
          alt="Login Image"
          />
       </div>
      <div className="bg-blue-400 min-h-screen w-full py-6 md:py-0 md:w-[50%] md:rounded-l-4xl ">
        <RegisterForm />
      </div>
      </div>
     
    </div>
  );
};

export default StudentRegister;
