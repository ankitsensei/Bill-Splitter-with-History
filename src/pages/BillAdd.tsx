import { useForm } from "react-hook-form";


const BillAdd = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const today = new Date().toISOString().split('T')[0];

    console.log(watch("example"));

    return (
        <div className="mt-20 px-2 flex flex-col gap-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <input type="text" {...register("example")} className="border-zinc-600 border-2  p-2 rounded w-full" placeholder="Money spent on?" />
                <input type="number" {...register("example")} className="border-zinc-600 border-2 p-2 rounded w-full" placeholder="How much?" />
                <input type="date" defaultValue={today} {...register("example")} className="border-zinc-600  border-2 p-2 rounded w-full" placeholder="When?" />
            </form>
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
        </div>
    )
}

export default BillAdd