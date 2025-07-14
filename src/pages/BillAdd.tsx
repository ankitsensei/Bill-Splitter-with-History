import { useState } from 'react'

import { Link } from "react-router";
import { useForm, } from "react-hook-form";
// import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    spentOn: string,
    howMuch: number,
    when: string,
    noOfPpl: number,
    nameOfPersons: Array<string>,
    whoPaid: string,
    listOfPerson: Array<string>,
    noOfPerson: number,
};


const BillAdd = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const today = new Date().toISOString().split('T')[0];

    const [listOfPerson, setListOfPerson] = useState<string[]>([]);
    const [noOfPerson, setnoOfPerson] = useState(0);


    return (
        <div className="my-6 px-4 h-screen flex flex-col w-full sm:w-[450px] md:w-[450px] lg:w-[450px]">
            <Link to="/"><button className="text-start underline hover:cursor-grab">back</button></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-full justify-between">
                <div className="flex flex-col gap-4  w-full mt-15">
                    <div>
                        <label htmlFor="">Money spent on?</label>
                        <input type="text" {...register("spentOn", { required: true })} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Street food" />
                        {errors.spentOn && <span>This field is required</span>}
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <label htmlFor="">How much?</label>
                            <input type="number" {...register("howMuch", { required: true })} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="300" />
                            {errors.howMuch && <span>This field is required</span>}
                        </div>
                        <div>
                            <label htmlFor="">When?</label>
                            <input type="date" defaultValue={today} {...register("when", { required: true })} className="border-zinc-600  border-2 p-2 rounded w-full outline-none" />
                            {errors.when && <span>This field is required</span>}
                        </div>
                        <div>
                            <label htmlFor="">No. of ppl?</label>
                            <input type="number" {...register("noOfPpl", { required: true })} value={noOfPerson} onChange={(e) => setnoOfPerson(parseInt(e.target.value))} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="3" />
                            
                            {errors.noOfPpl && <span>This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Name of Persons</label>

                        <input type="text" {...register("nameOfPersons", { required: true })} value={listOfPerson.join(', ')} onChange={(e) => setListOfPerson(e.target.value.split(', '))} className="border-zinc-600 border-2 p-2 rounded w-full outline-none" placeholder="Ankit, Shyam, Rohit" />
                    </div>
                    <div>
                        <label htmlFor="">Who paid?</label>
                        <select id="whoPaid" {...register("whoPaid", { required: true })} className="border-zinc-600 bg-black text-white border-2 p-2 rounded w-full outline-none"
                        >
                            {
                                listOfPerson.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))
                            }
                        </select>
                        {
                            listOfPerson.length > noOfPerson && <p className='text-red-500'>This cannot be</p>
                        }
                    </div>
                </div>
                <p className="text-center">Each person will pay <span className="font-semibold underline">Rs.100</span> to <span className="font-semibold underline">Ankit</span>.</p>
                <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
            </form>
        </div>
    )
}

export default BillAdd