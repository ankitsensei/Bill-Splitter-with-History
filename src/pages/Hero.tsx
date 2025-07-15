import { Link } from "react-router";
import BillHistory from "./BillHistory";
import Btn from "../comp/Btn"

const Hero = () => {
    return (
        <div className="mt-20 flex flex-col justify-between">
            <div className="">
                <BillHistory />
            </div>
            <div className="mt-20">
                <Link to="/billadd"><Btn title="+" /></Link>
            </div>
        </div>
    )
}

export default Hero

