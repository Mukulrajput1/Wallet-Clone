"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContexter } from "../contexter";
import ConfirmPasswordForm from "@/app/components/forms/ConfirmPasswordForm";

function Profile() {
  const { username, mobile } = useContexter();
  const [editMobile, setEditMobile] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [showForm,setShowForm] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
  }
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-5 py-10">
      {showForm && <ConfirmPasswordForm func = {setShowForm}></ConfirmPasswordForm>}
      <div className="bg-white h-full text-gray-900 p-6 w-full ">
        <div>
          <form>
            <div className="text-white flex flex-col justify-center items-center">
              <div className="bg-gray-700 h-32 w-32 flex justify-center items-center text-6xl rounded-full">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <div className="text-gray-700 font-bold py-3">
                <div>{username}</div>
              </div>
            </div>
            <div className="font-bold my-5 flex flex-col justify-center items-center w-full space-y-5">
              <div className="flex flex-col">
                <div ><label>Email : </label><span className="float-end text-sm hover:text-gray-700 cursor-pointer" onClick={() => { setEditEmail(!editEmail) }}><FontAwesomeIcon icon={faPenToSquare} /></span></div>
                <input
                  type="text"
                  disabled={editEmail ? false : true}
                  className={`${editEmail ? 'bg-gray-200' : 'bg-gray-100'} h-10 text-gray-700 px-3`}
                  value={username}
                ></input>
              </div>
              <div className="flex flex-col">
                <div ><label>Mobile : </label><span className="float-end text-sm hover:text-gray-700 cursor-pointer" onClick={() => { setEditMobile(!editMobile) }}><FontAwesomeIcon icon={faPenToSquare} /></span></div>
                <input
                  type="text"
                  disabled={editMobile ? false : true}
                  className={`${editMobile ? 'bg-gray-200' : 'bg-gray-100'} h-10 text-gray-700 px-3`}
                  value={mobile}
                ></input>
              </div>
              {/* <div className="flex flex-col">
                <label>Password : </label>
                <input
                  type="password"
                  disabled
                  className="bg-gray-100 h-10 text-gray-700 px-3"
                  value={password}
                ></input>
              </div> */}
            </div>
          </form>
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500 ">
              <button className="hover:text-gray-900" onClick={()=>setShowForm(true)}>Delete Account </button> |{" "}
              <button className="hover:text-gray-900">Reset Account</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Profile;
