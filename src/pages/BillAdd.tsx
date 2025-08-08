import { useEffect, useState } from 'react'
import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { supabase } from "../supabaseClient";

type Inputs = {
    spentOn: string,
    howMuch: number,
    when: string,
    noOfPpl: number,
    nameOfPersons: Array<string>,
    whoPaid: string,
    individualBill: number,
};

const BillAdd = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        setError,
        clearErrors,
        formState: { errors },
        control
    } = useForm<Inputs>({
        mode: "onChange", // real-time validation
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { error } = await supabase
            .from("billHistory")
            .insert([{
                moneySpentOn: data.spentOn,
                howMuch: Number(data.howMuch),
                when: data.when,
                noOfPpl: Number(data.noOfPpl),
                nameOfPpl: data.nameOfPersons.join(", "),
                whoPaid: data.whoPaid,
                individualBill: Number(data.individualBill)
            }]);

        if (error) {
            console.error("Error inserting data: ", error.message);
            alert("Failed to add bill!");
        } else {
            alert("Bill added successfully!");
            reset();
            setnoOfPerson(0);
            setNameOfPerson([]);
            setIndividualBill(0);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    const [noOfPerson, setnoOfPerson] = useState(2);
    const [nameOfPerson, setNameOfPerson] = useState<string[]>([]);
    const whoPaid = watch("whoPaid");
    const howMuch = watch("howMuch");
    const [individualBill, setIndividualBill] = useState<number>(0);

    const handleChange = (value: string, index: number) => {
        const updatedNames = [...nameOfPerson];
        updatedNames[index] = value;
        setNameOfPerson(updatedNames);
    };

    useEffect(() => {
        if (noOfPerson > 0) {
            const perPerson = howMuch / noOfPerson;
            const rounded = Math.round(perPerson * 100) / 100;
            setIndividualBill(rounded);
        }
    }, [howMuch, noOfPerson]);

    useEffect(() => {
        setValue("nameOfPersons", nameOfPerson);
        setValue("individualBill", individualBill);
    }, [nameOfPerson, individualBill, setValue]);

    return (
        <div className="my-6 px-4 h-screen flex flex-col w-full sm:w-[450px] md:w-[450px] lg:w-[450px]">
            <Link to="/"><button className="text-start underline hover:cursor-grab">back</button></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-full justify-between">
                <div className="flex flex-col gap-4 w-full mt-15">

                    {/* Spent On */}
                    <div>
                        <label>Money spent on?</label>
                        <input
                            type="text"
                            {...register("spentOn", { required: true })}
                            className="border-zinc-600 border-2 p-2 rounded w-full outline-none"
                            placeholder="Street food"
                        />
                        {errors.spentOn && <span className='text-red-500'>This field is required</span>}
                    </div>

                    {/* Amount, Date, No of People */}
                    <div className="flex gap-2">
                        <div>
                            <label>How much?</label>
                            <input
                                type="number"
                                {...register("howMuch", {
                                    required: true,
                                    min: { value: 1, message: "Value cannot be less than 1" },
                                    max: { value: 10000000, message: "Value cannot be more than 10 Million" }
                                })}
                                className="border-zinc-600 border-2 p-2 rounded w-full outline-none no-spinner"
                                placeholder="300"
                            />
                            {errors.howMuch && <span className='text-red-500'>{errors.howMuch.message}</span>}
                        </div>

                        <div>
                            <label>When?</label>
                            <input
                                type="date"
                                defaultValue={today}
                                min="1900-01-01"
                                max={today}
                                {...register("when", {
                                    required: "This field is required",
                                    validate: (value) => {
                                        const inputDate = new Date(value);
                                        const minDate = new Date("1900-01-01");
                                        const maxDate = new Date();
                                        return (
                                            inputDate >= minDate && inputDate <= maxDate ||
                                            "Date must be between 01-01-1990 and today"
                                        );
                                    },
                                })}
                                className="border-zinc-600 border-2 p-2 rounded w-full outline-none"
                            />
                            {errors.when && (
                                <span className="text-red-500">{errors.when.message}</span>
                            )}
                        </div>

                        {/* Controlled input: No. of People */}
                        <div>
                            <label>No. of ppl?</label>
                            <Controller
                                name="noOfPpl"
                                control={control}
                                rules={{
                                    required: "This field is required",
                                    min: { value: 1, message: "At least 1 person required" },
                                }}
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        {...field}
                                        value={noOfPerson}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            if (value > 10) {
                                                setError("noOfPpl", { type: "manual", message: "Max 10 persons allowed" });
                                                return;
                                            } else {
                                                clearErrors("noOfPpl");
                                            }
                                            setnoOfPerson(value);
                                            field.onChange(value);
                                        }}
                                        className="border-zinc-600 border-2 p-2 rounded w-full outline-none no-spinner"
                                        placeholder="3"
                                    />
                                )}
                            />
                            {errors.noOfPpl && (
                                <span className="text-red-500">{errors.noOfPpl.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Name of Persons */}
                    <div className='flex flex-col gap-1'>
                        {noOfPerson > 0 && <label>Name of Persons</label>}
                        {
                            Array.from({ length: noOfPerson }).map((_, index) => (
                                <input
                                    type="text"
                                    key={index}
                                    placeholder={`Person ${index + 1}`}
                                    value={nameOfPerson[index] || ""}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    className="border-zinc-600 border-2 p-2 rounded w-full outline-none"
                                />
                            ))
                        }
                    </div>

                    {/* Who Paid */}
                    <div>
                        {(nameOfPerson.length === noOfPerson && noOfPerson > 0) && (
                            <div>
                                <label>Who paid?</label>
                                <select
                                    id="whoPaid"
                                    {...register("whoPaid", { required: true })}
                                    className="border-zinc-600 bg-black text-white border-2 p-2 rounded w-full outline-none"
                                >
                                    {nameOfPerson.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bill Summary */}
                {whoPaid &&
                    <p className="text-center">Each person will pay <span className="font-semibold underline">{individualBill}</span> to <span className="font-semibold underline">{whoPaid}</span>.</p>
                }

                {/* Submit */}
                <input type="submit" className="px-20 py-2 bg-white text-black rounded" />
            </form>
        </div>
    );
};

export default BillAdd;
