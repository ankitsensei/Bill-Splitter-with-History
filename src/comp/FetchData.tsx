import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

interface BillHistoryItem {
    moneySpentOn: string;
    howMuch: number;
    when: string;
    noOfPpl: number;
    nameOfPersons: string[];
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
        <div>
            <h2 className='text-4xl'>Fetched Data:</h2>
            {
                data.map((item) => (
                    <ul className='border-zinc-400 border-1 p-2 w-full rounded-md'>
                        <li>Spent on: {item.moneySpentOn}</li>
                        <li>How much: {item.howMuch}</li>
                        <li>No. of ppl: {item.noOfPerson}</li>
                        <li>Name of Ppl: {item.nameOfPersons}</li>
                        <li>Who paid: {item.whoPaid}</li>
                        <li>Each person will pay Rs.{item.individualBill} to {item.whoPaid}.</li>
                    </ul>
                ))
            }

        </div>
    )
}

export default FetchData



