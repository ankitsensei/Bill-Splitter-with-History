import { useState } from 'react';

import BillHistory from "./BillHistory";
import { Link } from "react-router";
import Btn from "../comp/Btn"
import SettledFetchData from "../comp/SettledFetchData";
const Home = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <div className="w-lvw sm:w-[450px] md:w-[450px] lg:w-[450px] mt-10 flex h-full flex-col justify-between items-center">
      <div className="">
        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center border-2 border-zinc-600 rounded-lg'>
            <button
              onClick={() => { setToggle(true) }}
              className={`w-30 px-2 py-1  rounded-lg ${toggle ? "bg-[#6e11b0]" : ""}`}>
              Unsettled
            </button>
            <button
              onClick={() => { setToggle(false) }}
              className={`w-30 px-2 py-1 rounded-lg ${toggle ? "" : "bg-[#6e11b0]"}`}>
              Settled
            </button>
          </div>
        </div>
        {
          toggle ?
            <BillHistory /> :
            <SettledFetchData />
        }
      </div>
      <Link to="/billadd" className="w-full px-4 absolute bottom-4 sticky"><Btn title="+" /></Link>
    </div>
  )
}

export default Home