import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

interface BillHistoryItem {
    spentOn: string;
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
            <h2>Fetched Data:</h2>
            <ul>
                {
                    data.map((item) => (
                        <li>{JSON.stringify(item)}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FetchData