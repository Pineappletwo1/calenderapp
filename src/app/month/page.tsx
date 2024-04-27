const Month: FC = () => {
    const date = new Date();
    const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-500 mb-4">Upcoming Events</h1>
            <select className="mb-4 bg-white border border-gray-300 rounded py-2 px-4 text-gray-700">
                <option>Month</option>
                <option>Week</option>
                <option>Day</option>
            </select>
            <div className="grid grid-flow-col grid-rows-5 gap-4 w-3/4 h-3/4 bg-white rounded-lg shadow-lg p-4">
                {daysInMonth.map((day, index) => (
                    <div key={index} className="p-2 w-auto h-20 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500 font-bold">
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