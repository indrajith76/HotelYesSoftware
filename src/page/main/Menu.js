import React, { useContext, useState } from "react";
import { ModalProvider } from "styled-react-modal";
import NewMenuEntry from "./components/Menu/NewMenuEntry";
import NewCategory from "./components/Menu/NewCategory";
import { useEffect } from "react";
import DataFrame from "./components/Menu/DataFrame";
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/adminFirebase";
import { extreSmallFont, largeFont } from "../../theme";
import { NavContext } from "../../contexts/NavProvider";
import { CiSearch } from "react-icons/ci";

let data = [
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
  { productId: 10251, productName: "VICTE", quantity: 20 },
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
];
let title = ["Food Name", "Category", "Recipe", "Price"];
const Menu = () => {
  const [rerender, setRerender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  const [openAddCategory, setAddCategory] = useState(false);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  function toggleModal3(e) {
    setOpenPurchaseBill(!openPurchaseBill);
    setSideBarOn(!sideBarOn);
  }
  function toggleModal2(e) {
    setAddCategory(!openAddCategory);
    setSideBarOn(!sideBarOn);
  }
  const getMenuData = async () => {
    const doc1 = collection(db, "menu");
    const snap = await getDocs(doc1);
    const arr = [];
    snap.forEach((docs) => {
      arr.push(docs.data());
    });
    setDataList(arr);
  };
  useEffect(() => {
    getMenuData();
  }, [rerender]);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Manage Menu
          </div>
          <div className="flex items-center justify-between mt-10">
            <div>
              <button
                onClick={toggleModal3}
                className="rounded border bg-green-600 text-white text-sm py-1 px-8 mx-4"
                style={{ fontSize: extreSmallFont }}
              >
                New Entry
              </button>
              <button
                onClick={toggleModal2}
                className="rounded border duration-500 border-green-600 hover:bg-green-600 text-green-600 hover:text-white text-sm py-1 px-8 mx-4"
                style={{ fontSize: extreSmallFont }}
              >
                New Category
              </button>
            </div>
            <form className="mr-5 flex">
              <input
                type="text"
                placeholder="Search here"
                className="input input-bordered border-green-600 input-sm w-full max-w-xs rounded-tr-none rounded-br-none"
              />
              <button className="bg-green-600 px-2 text-white rounded-tr rounded-br"><CiSearch/></button>
            </form>
          </div>
        </div>
        <div className="px-12 pb-8">
          <DataFrame data={dataList} title={title} />
        </div>

        <NewMenuEntry
          rerender={rerender}
          setRerender={setRerender}
          isOpen={openPurchaseBill}
          toggleModal={toggleModal3}
        />
        <NewCategory
          rerender={rerender}
          setRerender={setRerender}
          isOpen={openAddCategory}
          setIsOpen={setAddCategory}
          toggleModal={toggleModal2}
        />
      </div>
    </ModalProvider>
  );
};

export default Menu;
