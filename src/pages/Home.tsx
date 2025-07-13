import Btn from "../comp/Btn"
const home = () => {
  return (
    <div className="bg-neutral-900 h-screen w-full text-white flex flex-col justify-start items-center">
      <h1 className='text-8xl font-semibold'>
        Bill Splitter
      </h1>
      <div className="mt-20">
        <Btn title="+"/>
      </div>
    </div>
  )
}

export default home