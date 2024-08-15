"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FarmerTab from "@/app/components/tabs/FarmerTab";
import AddFarmer from "@/app/components/forms/AddFarmer";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContexter } from "../../contexter";
import axios from "axios";
import toast from "react-hot-toast";

function Tubewell() {
  const { showForm, setShowForm } = useContexter()
  const { farmers, setFarmers } = useContexter()
  const [farmer, setFarmer] = useState("");
  const showAddFarmer = (data, data2) => {
    setShowForm(data);
    setFarmer(data2);
  };
  const fetchFarmer = async () => {
    try {
      const response = await axios.get(`${process.env.DOMAIN}/api/services/tubewell/farmers`);
      setFarmers(response.data.data)
      console.log(farmers)
    } catch (error) {
      toast.error(error?.data.response.error)
    }
  }
  const farmerData = [{
    startDate: '12/24',
    endDate: '13/24',
    startTime: '12:00',
    endTime: '04:00',
    rounds: 1,
    totalTime: 4,
  }, {
    startDate: '12/24',
    endDate: '13/24',
    startTime: '12:00',
    endTime: '04:00',
    rounds: 1,
    totalTime: 4,
  },]
  useEffect(() => {
    fetchFarmer()
  }, [])
  useEffect(() => {
    setFarmer(farmers[0]?.name)
  }, [farmers])
  const [timeData, setTimeData] = useState({
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    clockRound: '',
  })
  const chanegeTimeData = (event) => {
    const { name, value } = event.target;
    setTimeData(prevTimeData => ({
      ...prevTimeData,
      [name]: value
    }));
  }
  const addTimeRecord = () => {
    try {
      null
    } catch (error) {
      null
    }
  }

  return (
    <div className="bg-[#151521] w-full h-[calc(100vh-4rem)] justify-between flex overflow-hidden">
      <div className="bg-[#1e1e2d] w-[30%]  h-[calc(100vh-4rem)] hover:overflow-y-scroll">
        <FarmerTab func={showAddFarmer} farmers={farmers}></FarmerTab>
      </div>
      {showForm && (
        <div className="w-full h-[calc(100vh-4rem)] z-50 bg-gray-500 bg-opacity-20 absolute flex justify-center items-center">
          <button
            onClick={() => {
              setShowForm(false);
            }}
            className="absolute top-5 right-5"
          >
            <FontAwesomeIcon className="h-6" icon={faXmark} />
          </button>
          <AddFarmer></AddFarmer>
        </div>
      )}
      <div className=" w-[70%]  h-[calc(100vh-4rem)] p-[1%]">
        <div className="text-white font-bold text-lg m-3 capitalize">{farmer}</div>
        <div className=" h-full w-full flex justify-between">
          <div className="w-[40%]">
            <form className="mt-5 space-y-3 bg-[#1e1e2d] p-5 rounded-2xl" onSubmit={addTimeRecord}>
              <span className="font-medium">Add Record</span>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label className="text-[12px] text-[#c0c0c4] font-bold">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-md"
                    name="startDate"
                    placeholder=""
                    value={timeData.startDate}
                    onChange={chanegeTimeData}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label className="text-[12px] text-[#c0c0c4] font-bold">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-md"
                    name="startTime"
                    placeholder=""
                    value={timeData.startTime}
                    onChange={chanegeTimeData}
                  ></input>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label className="text-[12px] text-[#c0c0c4] font-bold">
                    End Date
                  </label>
                  <input
                    type="date"
                    className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-md"
                    name="endDate"
                    placeholder="Enter Name"
                    value={timeData.endDate}
                    onChange={chanegeTimeData}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label className="text-[12px] text-[#c0c0c4] font-bold">
                    End Time
                  </label>
                  <input
                    type="time"
                    className=" bg-[#151521] outline-none px-5 py-3 focus:bg-gray-700 rounded-md"
                    placeholder="Enter Name"
                    name="endTime"
                    value={timeData.endTime}
                    onChange={chanegeTimeData}
                  ></input>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-[#c0c0c4] font-bold">
                  Enter Clock Rounds
                </label>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <input
                      type="number"
                      className=" bg-[#151521] outline-none px-2 py-3 focus:bg-gray-700 rounded-md"
                      placeholder=""
                      name="clockRound"
                      value={timeData.clockRound}
                      onChange={chanegeTimeData}
                    ></input>
                  </div>
                  <button className=" bg-[#04c8c8] text-white px-10 py-3 font-bold rounded-md uppercase text-sm hover:bg-[#4aafaf] ease-in-out duration-200">
                    Add
                  </button>
                </div>
              </div>
              <span className="text-red"></span>
            </form>
          </div>
          <div className="w-[58%]  rounded-2xl mt-5 h-[80%]">
            <div>
              
            </div>
            <table className="w-full">
              <thead className="w-full">
                <tr className="flex justify-around bg-[#1e1e2d] py-2 rounded-lg text-sm w-full">
                  <th >Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Total Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {farmerData?.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className={`w-full flex h-14 items-center rounded-lg bg-[#1e1e2d] py-2 my-3`}
                    >
                      <td className="flex-1 text-center">{`${data?.startDate}-${data?.endDate}`}</td>
                      <td className="flex-1 text-center">{data?.startTime}</td>
                      <td className="flex-1 text-center">{data?.endTime}</td>
                      <td className="flex-1 text-center">{data?.totalTime}</td>
                      <td className="flex-1 text-center">{`${data?.totalTime * 100}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Tubewell;
