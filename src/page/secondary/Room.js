import React from "react";
import { ModalProvider } from "styled-react-modal";
import { RoomTab } from "./components/Room/RoomTab";
import { useEffect } from "react";
import { getRoomList } from "./components/Room/functions/function";
import { useState } from "react";
import DatePicker from "./components/Room/components/DatePicker";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../../config/adminFirebase";
import toast from "react-hot-toast";
import { setDate } from "date-fns";

const Room = () => {
  const [rerender, setRerender] = useState(false);
  const [available, setAvailable] = useState([]);
  const [booked, setBooked] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [dirty, setDirty] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date().getTime());
  const [todayAvailable, setTodayAvailable] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    setAvailable([]);
    setBooked([]);
    setReserved([]);
    setDirty([]);
    const arr = await getRoomList(selectDate);
    setAvailable(arr.arr);
    setBooked(arr.arr3);
    setReserved(arr.arr2);
    setDirty(arr.arr4);
  };

  const deleteRoom = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, "roomList", id))
      .then(() => {
        toast.success("Room Deleted Successfully.");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Room isn't Deleted");
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllData();
  }, [rerender, loading]);

  return (
    <ModalProvider>
      <div className="w-full h-full overflow-y-scroll">
        <div className="p-8">
          <div className=" text-2xl font-bold tracking-tighter">Book Room</div>
          <div className="w-1/3 my-4 flex flex-col space-y-4 ">
            <div className="flex flex-1">
              <DatePicker
                label={"Pick a Date"}
                value={selectDate}
                setValue={setSelectDate}
              />
            </div>
            <div className=" flex-1 flex flex-row space-x-3">
              <button
                onClick={() => {
                  getAllData();
                }}
                className="bg-green-600 rounded-xl px-8 h-10 mt-auto text-sm text-white"
              >
                Search
              </button>
              <button
                onClick={() => {
                  getAllData();
                }}
                className="bg-gray-600 rounded-xl px-8 h-10 mt-auto text-sm text-white"
              >
                Refresh
              </button>
            </div>
          </div>

          <RoomTab
            rerender={rerender}
            setRerender={setRerender}
            available={available}
            booked={booked}
            reserved={reserved}
            dirty={dirty}
            deleteRoom={deleteRoom}
          />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Room;
