import { useState } from 'react';
import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";

export default async function SubscribeTags() {
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState('');

      await connectToDataBase();



    return (
        <div>
            <h1>Subscribe to a Tag</h1>
            <input 
                type="text" 
                value={tag} 
                onChange={(e) => setTag(e.target.value)} 
                placeholder="Enter tag" 
            />
            <button onClick={subscribeToTag}>Subscribe</button>
            {message && <p>{message}</p>}
        </div>
    );
}