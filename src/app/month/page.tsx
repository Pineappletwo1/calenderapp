import { redirect } from "next/navigation";

export default function Month() {
  const numToMonth = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return redirect(`/month/${numToMonth[currentMonth]} ${currentYear}`);
}
