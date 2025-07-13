import { useForm } from "react-hook-form";


const BillAdd = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const today = new Date().toISOString().split('T')[0];

    console.log(watch("example"));

    return (
        <div className="mt-20 px-4 flex flex-col gap-10 w-full lg:w-1/4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                <input type="text" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Money spent on?" />
                <div className="flex gap-2">
                    <input type="number" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="How much?" />
                    <input type="date" defaultValue={today} {...register("example")} className="border-zinc-600  border-2 p-2 rounded w-full outline-none" placeholder="When?" />
                </div>
            </form>
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
        </div>
    )
}

export default BillAdd