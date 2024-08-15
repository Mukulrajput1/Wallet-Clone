import React from "react";
import { useState,useEffect } from "react";
import Link from "next/link";


function FarmerTab({func,farmers}) {

  const [farmer,setFarmer] = useState(farmers[0]?.name)
  
  useEffect(() => {
    func(false,farmer)
  }, [farmer]);
  
  const sendDataToParent = () =>{
    func(true,farmer);
  }
  const handleClick =(e) =>{
    setFarmer(e.target.textContent)
    // console.log(farmer)
  }
  
  

  const authors = [
    {
      avatar: "/image/a.jpg",
      name: "Emma Smith",
      description: "Project Manager",
    },

    {
      avatar: "/image/b.jpg",
      name: "Sean Bean",
      description: "PHP, SQLite, Artisan CLI",
    },

    {
      avatar: "/image/c.jpg",
      name: "Brian Cox",
      description: "HTML5, jQuery, CSS3",
    },

    {
      avatar: "/image/d.jpg",
      name: "Dan Wilson",
      description: "MangoDB, Java",
    },

    {
      avatar: "/image/e.jpg",
      name: "Natali Trump",
      description: "NET, Oracle, MySQL",
    },

    {
      avatar: "/image/a.jpg",
      name: "Francis Mitcham",
      description: "React, Vue",
    },

    {
      avatar: "/image/b.jpg",
      name: "Jessie Clarcson",
      description: "Angular, React",
    },
  ];

  return (
    <div>
      <div className="flex h-full flex-col">
        {/* begin::Wrapper */}
        <div
          className="flex-grow overflow-y-auto "
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-wrappers="#kt_aside_wordspace"
          data-kt-scroll-dependencies="#kt_aside_secondary_footer"
          data-kt-scroll-offset="0px"
        >
          <div className="tab-content">
            <div className="tab-pane fade active show" role="tabpanel">
              <div className="mx-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white mx-0 my-7 mt-10 justify-left ml-5 text-lg  items-center flex uppercase">
                    Farmers
                  </h3>
                  <button onClick={sendDataToParent} className=" bg-[#04c8c8] text-white px-5 py-2 rounded-md uppercase text-sm hover:bg-[#4aafaf] ease-in-out duration-200">+ Add</button>
                </div>
                <div className="mb-12">
                  {farmers.map((a) => (
                    <div className="flex items-center mb-7" key={a.name}>
                      <div className="symbol symbol-50px me-5">
                        <img
                              src='/image/b.jpg'
                              className="w-[50px]"
                              alt="farmerImg"
                            />
                      </div>
                      <div className="flex-grow-1">
                        <button
                          className="text-white font-bold hover:text-primary text-base hover:text-[#04c8c8] capitalize"
                          onClick={handleClick}
                        >
                          {a.name}
                        </button>
                        <span className="text-gray-500 block font-bold capitalize">
                          {a.villageName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* end::Tab content */}
        </div>
        {/* end::Wrapper */}
        {/* begin::Footer */}

        {/* end::Footer */}
      </div>
    </div>
  );
}

export default FarmerTab;
