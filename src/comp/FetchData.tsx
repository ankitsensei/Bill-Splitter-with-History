import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

interface BillHistoryItem {
    moneySpentOn: string;
    howMuch: number;
    when: string;
    noOfPpl: number;
    nameOfPpl: string[];
    whoPaid: string;
    noOfPerson: number;
    individualBill: number;
}


const FetchData = () => {
    const [data, setData] = useState<BillHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFromSupabase = async () => {
            const { data, error } = await supabase.from('billHistory').select('*');

            if (error) {
                console.log("Error fetching: ", error);
            } else {
                setData(data);
            }
            setLoading(false);
        }
        fetchFromSupabase();
    }, [])

    console.log(data);

    if (loading) return <p>Loading...</p>;
    return (
        <div className='w-lvw sm:w-[450px] md:w-[450px] lg:w-[450px] px-4 flex flex-col gap-2'>
            <h2 className='text-4xl pb-2'>Expense:</h2>
            {
                data.map((item) => (
                    <ul className='border-zinc-800 border-1 p-2 rounded-2xl'>
                        <div className='text-zinc-400 flex flex-col gap-1'>
                            <div className='bg-purple-800 text-white py-2 rounded-t-xl'>
                                <li className='text-4xl text-center'>-₹{item.howMuch}</li>
                                <div className='flex justify-between px-2'>
                                    <li><span>{item.moneySpentOn}</span></li>
                                    <li className='text-end'>{item.when}</li>
                                </div>

                            </div>
                            <div className='flex gap-2 justify-start'>
                                <li className='text-white w-20'><span className='text-white'>{item.noOfPpl}</span> people: </li>
                                <li><span>{item.nameOfPpl}</span></li>

                            </div>
                            <li className=''>Who paid: <span className='px-2 bg-amber-400 text-black rounded-lg'>{item.whoPaid}</span></li>
                            <li>Each person will pay <span className='px-2 bg-green-400 text-black rounded-lg'>Rs.{item.individualBill}</span> to <span className='px-2 bg-amber-400 text-black rounded-lg'>{item.whoPaid}</span>.</li>
                        </div>
                    </ul>
                ))
            }
        </div>
    )
}

export default FetchData