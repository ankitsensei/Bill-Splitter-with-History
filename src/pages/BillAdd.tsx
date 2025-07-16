import { useEffect, useState } from 'react'

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
    noOfPerson: number,
    individualBill: number,
};


const BillAdd = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const today = new Date().toISOString().split('T')[0];

    const [noOfPerson, setnoOfPerson] = useState(0);
    const [nameOfPerson, setNameOfPerson] = useState<string[]>([]);
    const whoPaid = watch("whoPaid");
    const howMuch = watch("howMuch");
    const [individualBill, setIndividualBill] = useState<number>(0);

    const handleChange = (value: string, index: number) => {
        const updatedNames = [...nameOfPerson];
        updatedNames[index] = value;
        setNameOfPerson(updatedNames);
    }

    useEffect(() => {
        if (noOfPerson > 0) {
            const perPerson = howMuch/noOfPerson;
            const rounded = Math.round(perPerson * 100)/100;
            setIndividualBill(rounded);
        }
    }, [howMuch, noOfPerson])



    useEffect(() => {
        setValue("nameOfPersons", nameOfPerson);
        setValue("individualBill", individualBill);
    }, [nameOfPerson, individualBill, setValue]);


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

                    <div className='flex flex-col gap-1'>{
                        noOfPerson > 0 &&
                        <label htmlFor="">Name of Persons</label>
                    }
                        {
                            Array.from({ length: noOfPerson }).map((_, index) => (
                                <input
                                    type="text"
                                    key={index}
                                    placeholder={`Person ${index + 1}`}
                                    value={nameOfPerson[index] || ""}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    className="border-zinc-600 border-2 p-2 rounded w-full outline-none" />
                            ))
                        }
                    </div>
                    <div>{
                        (nameOfPerson.length === noOfPerson && noOfPerson > 0) && <div>
                            <label htmlFor="">Who paid?</label>
                            <select id="whoPaid" {...register("whoPaid", { required: true })} className="border-zinc-600 bg-black text-white border-2 p-2 rounded w-full outline-none"
                            >
                                {
                                    nameOfPerson.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))
                                }
                            </select>
                            {
                                nameOfPerson.length > noOfPerson && <p className='text-red-500'>No. of ppl does not match the no. of names</p>
                            }
                        </div>
                    }

                    </div>
                </div>
                {
                    (whoPaid) &&
                    <p className="text-center">Each person will pay <span className="font-semibold underline">{individualBill}</span> to <span className="font-semibold underline">{whoPaid}</span>.</p>
                }
                <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
            </form>
        </div>
    )
}

export default BillAdd