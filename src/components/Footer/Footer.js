import { useEffect, useState } from 'react';
import './footer.css';

export default function Footer() {
    const [currentDate, setCurrentDate] = useState();

    useEffect(()=> {
        const date = new Date()
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
        setCurrentDate(date.toLocaleDateString('en-US', options));
    }, [currentDate])

    return (
        <div className="footer">
        <h4>Current Date: {currentDate}</h4>
        </div>
    )
}
