import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from 'axios';
import { useRouter } from "next/navigation";

function ConfirmPasswordForm({ func }) {
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = new useRouter()
    const [isLoader, setIsLoader] = useState(false)
    const  handleDeleteAccount  = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${process.env.DOMAIN}/api/users/deleteUser`, { confirmPassword })
            console.log(response.data.message);
            await axios.get(
                `${process.env.DOMAIN}/api/users/logout`
            );
            toast.success(response.data.message)
            router.push("/");
        } catch (error) {
            toast.error(error?.response?.data.error)
            
        }
    }

    return (
        <div className="absolute flex justify-center items-center top-0 left-0 bg-gray-500 w-full min-h-full bg-opacity-50">
            <form onSubmit={handleDeleteAccount} className="bg-gray-700 py-5 px-10 rounded-lg">

                <div className="w-full flex justify-end"><FontAwesomeIcon onClick={() => func(false)} icon={faXmark} className="hover:cursor-pointer border-[2px] py-[2px] px-1 rounded-md border-white" /></div>
                <div className="mb-4">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="confirm-password"
                    >
                        Enter Password
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-600 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="confirm-password"
                        type="password"
                        placeholder="Enter Your Password"
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                </div>
                <div className="text-red-500">
                    {/* <span>{error}</span> */}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {isLoader ? "Deleting..." : "Delete Account"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmPasswordForm
