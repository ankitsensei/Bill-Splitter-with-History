import { useForm } from "react-hook-form";


const BillAdd = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const today = new Date().toISOString().split('T')[0];

    console.log(watch("example"));

    return (
        <div className="my-6 px-4 h-screen flex flex-col justify-between gap-10 w-full lg:w-1/4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full mt-10">
                <div>
                    <label htmlFor="">Money spent on?</label>
                    <input type="text" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Money spent on?" />
                </div>

                <div className="flex gap-2">
                    <div>
                        <label htmlFor="">How much?</label>
                        <input type="number" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="How much?" />
                    </div>
                    <div>
                        <label htmlFor="">When?</label>
                        <input type="date" defaultValue={today} {...register("example")} className="border-zinc-600  border-2 p-2 rounded w-full outline-none" placeholder="When?" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="">Number of people?</label>
                        <input type="number" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-50 outline-none" placeholder="Number of people?" />
                    </div>
                </div>
            </form>
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
        </div>
    )
}

export default BillAdd