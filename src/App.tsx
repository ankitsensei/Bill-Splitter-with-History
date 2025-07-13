import { Routes, Route } from "react-router";

import Home from "./pages/Home"
import BillAdd from "./pages/BillAdd"

const App = () => {

  return (
    <div className="w-full h-screen flex flex-col items-center ">
      <h1 className='text-3xl lg:text-5xl text-center mt-10 font-semibold'>
        Bill Splitter
      </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/billadd" element={<BillAdd />} />
        </Routes>
    </div>
  )
}

export default App