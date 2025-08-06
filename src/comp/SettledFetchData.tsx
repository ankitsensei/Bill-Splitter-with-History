import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";
import { FaTrashAlt } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";



interface BillHistoryItem {
    id: number;
    moneySpentOn: string;
    howMuch: number;
    when: string;
    noOfPpl: number;
    nameOfPpl: string[];
    whoPaid: string;
    noOfPerson: number;
    individualBill: number;
}


const SettledFetchData = () => {
    const [data, setData] = useState<BillHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFromSupabase = async () => {
            const { data, error } = await supabase.from('settled').select('*');

            if (error) {
                console.log("Error fetching: ", error);
            } else {
                setData(data);
            }
            setLoading(false);
        }
        fetchFromSupabase();
    }, [])
    // Delete Handler
    const deleteHandler = async (index: number) => {
        const itemId = data[index].id;
        const { error } = await supabase
            .from('settled')
            .delete()
            .eq('id', itemId)

        if (error) {
            console.log("❌ Error deleting item: ", error.message);
        } else {
            console.log("✅ Item deleted successfully:");
        }
        setData(prev => prev.filter((_, i) => i !== index));
    }
    // Unsettled Handler
    const unSettledHandler = async (index: number) => {
        const { id, ...itemWithoutId } = data[index];
        void id;

        const { data: insertedData, error } = await supabase
            .from('billHistory')
            .insert([itemWithoutId]);

        if (error) {
            console.log("❌ Error inserting data: ", error.message);
        } else {
            console.log("✅ Data inserted successfully: ", insertedData);
        }
        deleteHandler(index);
    };

    if (loading) return <p>Loading...</p>;
    return (
        <div className='w-lvw sm:w-[450px] md:w-[450px] lg:w-[450px] px-4 pb-20 flex flex-col gap-2'>
            <h2 className='text-2xl  pb-2 text-zinc-400'></h2>
            {
                data.map((item, index) => (
                    <ul className='border-zinc-800 border-1 p-2 rounded-2xl'>
                        <div className='text-zinc-400 flex flex-col gap-1'>
                            <div className='bg-purple-800 text-white py-2 rounded-t-xl'>
                                <li className='text-4xl text-center'>-₹{item.howMuch}</li>
                                <div className='flex justify-between px-2'>
                                    <li><span>{item.moneySpentOn}</span></li>
                                    <li className='text-end text-zinc-100'>{item.when}</li>
                                </div>

                            </div>
                            <div className='flex gap-2 justify-start'>
                                <li className='text-white w-20'><span className='text-white'>{item.noOfPpl}</span> people: </li>
                                <li><span>{item.nameOfPpl}</span></li>

                            </div>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <li className=''>Who paid: <span className='px-2 bg-amber-400 text-black rounded-lg'>{item.whoPaid}</span></li>
                                    <li>Each person will pay <span className='px-2 bg-green-400 text-black rounded-lg'>Rs.{item.individualBill}</span> to <span className='px-2 bg-amber-400 text-black rounded-lg'>{item.whoPaid}</span>.</li>
                                </div>
                                <div className='p-2 flex items-center gap-4'>
                                    <FaHourglassEnd className='text-sm text-amber-500' onClick={() => unSettledHandler(index)} />
                                    <FaTrashAlt className='text-sm text-red-500' onClick={() => deleteHandler(index)} />
                                </div>
                            </div>
                        </div>
                    </ul>
                ))
            }
        </div>
    )
}

export default SettledFetchData