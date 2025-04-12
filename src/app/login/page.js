'use client'
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../components/navigation/Loader";



function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoader,setIsLoader] = useState(false)
  const url = process.env.NEXT_PUBLIC_API_URL
  const [error,setError] = useState('')
  const router = new useRouter()
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit =async (event) => {
    setIsLoader(true)
    event.preventDefault();
    try {
        const data = {
            username: username,
            password: password
        }
        const response =await axios.post("/api/users/login",data)
        console.log(response)
        setError(response.data.message)
        
        router.push('/dashboard')
    } catch (error) {
        console.log(error)
        setError(error.response.data.error)
        setIsLoader(false)
    }
    finally{
        setUsername('');
        setPassword('');
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center " >
      {isLoader && <Loader/>}
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto bg-white py-10 px-5 rounded-lg shadow-md shadow-white">
        <div className="w-full flex justify-center mb-3"><span className="font-bold text-lg text-black">LOGIN</span></div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username:
        </label>
        <input
          className="shadow appearance-none focus:border-blue-400 font-fontawesome border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Your Username"
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          className="shadow appearance-none border focus:border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder=" Enter Your Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="text-red-600 text-sm">{error}</div>
        <div className="text-sm w-full flex justify-end "><Link href='/forgotpassword' className="cursor-pointer text-blue-500 hover:text-blue-700 pb-1">Forgot Password?</Link></div>
      <div className="flex items-center justify-between flex-col">
        <button
            disabled = {isLoader? true:false}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isLoader? "Logging In...":"LogIn"}
        </button>
      </div>
      <div>
        <div className="text-gray-800 text-sm mt-3">Don&apos;t have account, <Link href='/signup' className="text-blue-500">SignUp</Link> here</div>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
