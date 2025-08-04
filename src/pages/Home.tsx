import BillHistory from "./BillHistory";
import { Link } from "react-router";
import Btn from "../comp/Btn"
const home = () => {

  return (
    <div className="mt-10 flex h-full flex-col justify-between">
      <div className="">
        <BillHistory />
      </div>
      <Link to="/billadd" className="w-full px-4 absolute bottom-4 sticky"><Btn title="+" /></Link>
    </div>
  )
}

export default home