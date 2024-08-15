"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/navigation/Loader";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);


  const handleSubmit = async (event) => {
    setIsLoader(true);
    event.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        console.log("a");
        if (token.length > 0) {
            await axios.post(`${process.env.DOMAIN}/api/users/setnewpassword`, {
                token,
                newPassword,
            });
            console.log("b");
          setVerified(true);
        }
      } else {setError("Confirm Password should be same")}
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }
    finally{
        setIsLoader(false);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);


  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen text-black">
        {isLoader && <Loader></Loader>}
  {verified ? (
    <div className="bg-white p-6 rounded shadow-md text-black flex flex-col font-bold">
      <span>Password has been reset Successfully</span>
      <Link
        href="/login"
        className="mt-5 px-5 py-3 border-black border-[2px] hover:text-white hover:bg-black text-center"
      >
        Go To Login
      </Link>
    </div>
  ) : (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md ">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="new-password"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirm New Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>
        <div className="text-red-500">
          <span>{error}</span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-full"
          >
            {isLoader ? "Loading..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  )}
</div>
  );
}

export default ResetPassword;
