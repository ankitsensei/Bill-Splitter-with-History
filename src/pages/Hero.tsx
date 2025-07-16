import { Link } from "react-router";
import BillHistory from "./BillHistory";
import Btn from "../comp/Btn"

const Hero = () => {
    return (
        <div className="mt-20 flex h-full flex-col justify-between">
            <div className="">
                <BillHistory />
            </div>
            <Link to="/billadd"><Btn title="+" /></Link>
        </div>
    )
}

export default Hero

