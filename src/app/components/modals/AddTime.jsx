import React from "react";

function AddTime({ timeData, setTimeData }) {
  const chanegeTimeData = (event) => {
    const { name, value } = event.target;
    setTimeData((prevTimeData) => ({
      ...prevTimeData,
      [name]: value,
    }));
  };
  const addTimeRecord = () => {
    try {
      null;
    } catch (error) {
      null;
    }
  };
  return (
    <div className="absolute left-0 top-0 w-screen h-[calc(100vh-4rem)] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[30%]">
        <form
          className="mt-5 space-y-3 bg-[#1e1e2d] p-5 rounded-2xl"
          onSubmit={addTimeRecord}
        >
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
    </div>
  );
}

export default AddTime;
