import Link from "next/link";
import React, { useRef, useState } from "react";
import { useContexter } from "@/app/dashboard/contexter";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

function Navbar() {
  const { username, isLoader, setIsLoader, isActive } = useContexter();
  const { walletAmount } = useContexter();
  const { isNavbar, setIsNavbar } = useContexter();
  const router = new useRouter();
  const logout = async () => {
    setIsLoader(true);
    console.log(`${process.env.DOMAIN}/api/users/logout`);
    try {
      const response = await axios.get(
        `${process.env.DOMAIN}/api/users/logout`
      );
      console.log(response);
      router.push("/");
      setIsLoader(false);
    } catch (error) {
      console.log(error);
      console.log("error");
      setIsLoader(false);
    }
  };
  return (
    <>
      {isLoader && <Loader></Loader>}
      <div className="w-full h-16 flex items-center bg-white xl:px-20 lg:px-9 z-50 px-5">
        <div className="text-gray-800 md:w-1/2 xl:-2/3 hidden md:flex">
          <ul className="flex space-x-1 lg:space-x-10 font-bold">
            <li>
              <FontAwesomeIcon className="text-xl" icon={faWallet} />{" "}
              <span>&#x20B9; {walletAmount}</span>
            </li>
            <li>
              <Link
                className={`px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md transition-all ${
                  isActive === 0 ? "bg-gray-700 text-white" : ""
                }`}
                href="/dashboard"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md transition-all ${
                  isActive === 1 ? "bg-gray-700 text-white" : ""
                }`}
                href="/dashboard/expenses"
              >
                Expenses
              </Link>
            </li>
            <li>
              <Link
                className={`px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md transition-all ${
                  isActive === 2 ? "bg-gray-700 text-white" : ""
                }`}
                href="/dashboard/income"
              >
                Incomes
              </Link>
            </li>
            <li>
              <Link
                className={`px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md transition-all ${
                  isActive === 3 ? "bg-gray-700 text-white" : ""
                }`}
                href="/dashboard/services"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-gray-800 md:w-1/2 xl:-1/3 flex justify-end space-x-3">
          <div className="font-bold hover:bg-gray-700 px-4 py-2 rounded-md hover:text-white">
            <Link href={`/dashboard/${username}`}>
              Hi, {username?.split("@")[0]}
            </Link>
          </div>
          <div className="hidden md:flex items-center">-</div>
          <button
            onClick={logout}
            className="hidden md:flex hover:text-black hover:font-bold cursor-pointer items-center"
          >
            Logout
          </button>
        </div>
        <div className="absolute right-5 md:hidden flex justify-end text-black text-lg">
          <FontAwesomeIcon
            onClick={() => setIsNavbar(!isNavbar)}
            icon={faBars}
          ></FontAwesomeIcon>
        </div>
      </div>

      <div
        className={`h-[100vh] w-[170px] transition-all text-black font-bold bg-white absolute ${
          isNavbar ? "ml-[0px]" : "ml-[-170px]"
        }`}
      >
        <ul className="text-center">
          <li className="py-2 hover:font-bold cursor-pointer ">
            <FontAwesomeIcon className="text-4xl" icon={faWallet} />
            <br></br>
            <span>&#x20B9; {walletAmount}</span>
          </li>
          <li className="py-5 hover:font-bold cursor-pointer">
            <Link href="/dashboard">Home</Link>
          </li>
          <li className="py-5 hover:font-bold cursor-pointer">
            <Link href="/dashboard/expenses">Expenses</Link>
          </li>
          <li className="py-5 hover:font-bold cursor-pointer">
            <Link href="/dashboard/income">Income</Link>
          </li>
          <li className="py-5 hover:font-bold cursor-pointer">
            <Link href="/dashboard/services">Services</Link>
          </li>
          <li className="py-5 hover:font-bold cursor-pointer">
            <div onClick={logout} className="cursor-pointer">
              Logout
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
