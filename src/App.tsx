import { Routes, Route } from "react-router";

import Home from "./pages/Home"
import BillAdd from "./pages/BillAdd"

const App = () => {

  return (
    <div>
      <h1 className='text-7xl font-semibold'>
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