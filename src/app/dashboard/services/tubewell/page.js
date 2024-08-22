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
import { Button, Modal } from "react-bootstrap";
import AddTime from "@/app/components/modals/AddTime";
import { Select, Tooltip } from 'antd'

function Tubewell() {
  const { showForm, setShowForm } = useContexter()
  const { farmers, setFarmers } = useContexter()
  const {Option} = useContexter()
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="bg-[#151521] w-full h-[calc(100vh-4rem)] justify-between flex overflow-hidden relative">
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
          <div className="flex justify-between">
            <div className="text-white font-bold text-lg m-3 capitalize">{farmer}</div>
            {show ? (<button
              onClick={() => {
                setShow(false);
              }}
              className="absolute top-5 right-5 z-50"
            >
              <FontAwesomeIcon className="h-6" icon={faXmark} />
            </button>) : <div><button onClick={handleShow} className=" bg-[#04c8c8] text-white px-5 py-2 rounded-md uppercase text-sm hover:bg-[#4aafaf] ease-in-out duration-200">+ Add</button></div>}
          </div>
          <div className=" h-full w-full flex justify-between">
            {show && <AddTime timeData={timeData} setTimeData={setTimeData}></AddTime>}
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
                    <th>Action</th>
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
                        <td className="flex-1 text-center">
                          <Select
                            defaultValue='Actions'
                            value={'Action'}
                            // className="btn btn-light btn-active-light-primary btn-sm ant-select-no-border"
                            onChange={(e) => {
                              handleMenuSelect(e, item)
                            }}
                          // dropdownClassName="ant-select-no-border"
                          >
                            <Option value='Edit'>Edit</Option>
                            <Option value='delete'>Delete</Option>
                          </Select>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>

        </div>
        {/* <div className="flex">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div> */}
      </div>


    </>
  );
}

export default Tubewell;
