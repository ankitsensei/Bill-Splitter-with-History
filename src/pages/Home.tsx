import Btn from "../comp/Btn"
import { Link } from "react-router";

const home = () => {

  return (
    <div className="mt-20 px-4 flex flex-col gap-10 w-full lg:w-1/4">
      <div className="mt-20">
        <Link to="/billadd"><Btn title="+" /></Link>
      </div>
    </div>
  )
}

export default home