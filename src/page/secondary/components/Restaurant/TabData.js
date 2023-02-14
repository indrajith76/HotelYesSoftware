import React, { useState } from "react";

import ModalView from "./ModalView";
import { IoEllipsisVertical } from "react-icons/io5";
import { useContext } from "react";
import { NavContext } from "../../../../contexts/NavProvider";

export const TabData = ({ tableData, rerender, setRerender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableInfo, setTableInfo] = useState([]);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  const toggleModal = function () {
    setIsOpen(!isOpen);
    setSideBarOn(!sideBarOn)
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-row  flex-wrap">
        {tableData.map((data) => (
          <button
            onClick={() => {
              setTableInfo(data);
              toggleModal();
            }}
          >
            <div className="bg-gray-200 w-24 h-24 rounded-2xl flex flex-col p-4 m-3">
              <div className="ml-auto">
                <IoEllipsisVertical size={12} />
              </div>
              <div
                className="text-2xl text-center my-auto"
                style={{ fontSize: 12 }}
              >
                {data.tableNumber}
              </div>
            </div>
          </button>
        ))}
      </div>
      <ModalView
        rerender={rerender}
        setRerender={setRerender}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleModal={toggleModal}
        state={tableInfo}
      />
    </div>
  );
};
