const Month: FC = () => {
    const date = new Date();
    const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <h1>Upcoming Events</h1>
            <select>
                <option>Month</option>
                <option>Week</option>
                <option>Day</option>
            </select>
            <div className="grid grid-flow-col grid-rows-5 gap-1 w-full h-full">
                {daysInMonth.map((day, index) => (
                    <div key={index} className="p-2 w-auto h-20">
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
}

function getDaysInMonth(month: number, year: number): Date[] {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export default Month;