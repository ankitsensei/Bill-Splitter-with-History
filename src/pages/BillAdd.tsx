import { useForm } from "react-hook-form";
import { Link } from "react-router";



const BillAdd = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const today = new Date().toISOString().split('T')[0];

    console.log(watch("example"));

    return (
        <div className="my-6 px-4 h-screen flex flex-col justify-start w-full sm:w-[450px] md:w-[450px] lg:w-[450px]">
            <Link to="/"><button className="text-start underline hover:cursor-grab">back</button></Link>
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-10">
                    <div>
                        <label htmlFor="">Money spent on?</label>
                        <input type="text" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Street food" />
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <label htmlFor="">How much?</label>
                            <input type="number" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="300" />
                        </div>
                        <div>
                            <label htmlFor="">When?</label>
                            <input type="date" defaultValue={today} {...register("example")} className="border-zinc-600  border-2 p-2 rounded w-full outline-none" />
                        </div>
                        <div>
                            <label htmlFor="">No. of ppl?</label>
                            <input type="number" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="3" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Name of Persons</label>

                        <input type="text" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Ankit" />
                        <input type="text" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Shyam" />
                        <input type="text" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Rohit" />
                    </div>
                    <div>
                        <label htmlFor="">Who paid?</label>
                        <select id="whoPaid" {...register("whoPaid")} className="border-zinc-600 bg-black text-white border-2 p-2 rounded w-full outline-none"
                        >
                            <option value="Ankit">Ankit</option>
                            <option value="Shyam">Shyam</option>
                            <option value="Rohit">Rohit</option>
                        </select>
                    </div>
                </form>
                {errors.exampleRequired && <span>This field is required</span>}
                <p className="text-center">Each person will pay <span className="font-semibold underline">Rs.100</span> to <span className="font-semibold underline">Ankit</span>.</p>
                <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
            </div>
        </div>
    )
}

export default BillAdd