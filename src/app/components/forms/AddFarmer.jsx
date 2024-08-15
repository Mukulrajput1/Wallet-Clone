import axios from "axios";
import React, { useReducer } from "react";
import { useState } from "react";
import { useContexter } from "@/app/dashboard/contexter";
import toast from "react-hot-toast";

function AddFarmer() {
  const { username,setShowForm,setFarmers } = useContexter();
  const initialState = {
    fullname: "",
    villagename: "",
    mobile: "",
    email: username,
  };
  const formReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
        break;

      case "RESET_FIELD":
        return initialState;
        break;
      default:
        break;
    }
  };
  const [errMessage, setErrMessage] = useState("");
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const { fullname, villagename, mobile } = formData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.DOMAIN}/api/services/tubewell/farmers`,
        formData
      );
      toast.success(response.data.message)
      setFarmers(response.data.data)
      setShowForm(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error)
    } finally {
      dispatch({ type: "RESET_FIELD" });
    }
  };
  return (
    <div className=" bg-[#1e1e2d] p-10 rounded-2xl">
      <span className="text-lg uppercase font-bold">Add Farmer</span>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="flex flex-col">
          <label className="text-[12px] text-[#c0c0c4] font-bold">
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                value: e.target.value,
                field: "fullname",
              })
            }
            value={fullname}
            className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-2xl"
            placeholder="Enter Name"
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-[12px] text-[#c0c0c4] font-bold">
            Village Name
          </label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                value: e.target.value,
                field: "villagename",
              })
            }
            value={villagename}
            className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-2xl"
            placeholder="Enter Village Name"
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-[12px] text-[#c0c0c4] font-bold">
            Mobile No.
          </label>
          <input
            type="tel"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                value: e.target.value,
                field: "mobile",
              })
            }
            value={mobile}
            className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-2xl"
            placeholder="Enter Mobile Number"
          ></input>
        </div>
        <button className=" bg-[#04c8c8] text-white px-5 py-4 w-full font-bold rounded-2xl uppercase text-sm hover:bg-[#4aafaf] ease-in-out duration-200">
          Register
        </button>
        <span className="text-red">{errMessage}</span>
      </form>
    </div>
  );
}

export default AddFarmer;
