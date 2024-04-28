import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-6xl mt-6 font-normal">Tyee Calendar</h1>
      <h2 className="text-3xl mt-6 font-normal">
        Tyee Calendar, the better Tyee planner that people will use.
      </h2>
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className=" shadow-lg">
          <h1 className="text-2xl bg-gray-100 p-6">Get Push Notifications</h1>
          <p className="p-6 text-lg">
            We all know the biggest problem with planners is that you forget to
            check them, so we&apos;ll send you reminders. Computer, phone, we know
            you&apos;re on one of them.
          </p>
        </div>
        <div className=" shadow-lg">
          <h1 className="text-2xl bg-gray-100 p-6">Tag Events and Clubs</h1>
          <p className="p-6 text-lg">
            There is so much happening at Tyee, and we want to make sure you can
            keep track of what you care about the most. Follow clubs like TPCC,
            classes like Chinese 2, to keep track of everything!
          </p>
        </div>
        <div className=" shadow-lg">
          <h1 className="text-2xl bg-gray-100 p-6">Big Tyee Community</h1>
          <p className="p-6 text-lg">
            Don&apos;t forget that there are hundreds of other students at Tyee, and
            they all contribute to the calendar and ensure that it&apos;s up to date.
            Join the community and help us make the calendar better!
          </p>
        </div>
      </div>
    </main>
  );
}