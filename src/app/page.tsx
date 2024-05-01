"use client"

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <main className=" text-gray-700">
      <div className="hero p-10 rounded-lg shadow-md flex items-center "> 
        <div>
          <h1 className="text-5xl mb-4 text-blue-500">Tyee Calender</h1>
          <p className="text-2xl mb-4">The better Tyee Planner</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded" onClick={() => signIn()}>
            Get Started
          </button>
        </div>
        <Image
          src="https://i.ibb.co/mNhYwcQ/logo-2.png"
          alt="Tyee Calender"
          height={500}
          width={500}
          className="ml-auto"
        />
      </div>

      <div className="section2 p-10 rounded-lg shadow-md flex flex-row-reverse items-center mb-10 ">
        <div>
          <h1 className="text-3xl mb-4 text-blue-500">Get Push Notifications</h1>
          <p className="text-xl">
            We all know the biggest problem with planners is that you forget to check them, so we&apos;ll send you reminders. Computer, phone, we know you&apos;re on one of them.
          </p>
        </div>
        <Image
          src="https://i.ibb.co/cDC1PLh/OIG4-removebg-preview.png"
          alt="Tyee Calender"
          height={500}
          width={500}
          className="mr-auto"
        />
      </div>

      <div className="section3 p-10 rounded-lg shadow-md flex items-center mb-10 ">
        <div>
          <h1 className="text-3xl mb-4 text-blue-500">Tag Events and Clubs</h1>
          <p className="text-xl">
            There is so much happening at Tyee, and we want to make sure you can keep track of what you care about the most. Follow clubs like TPCC, classes like Chinese 2, to keep track of everything!
          </p>
        </div>
        <Image
          src="https://i.ibb.co/YLLSMtt/OIG4-1-removebg-preview.png"
          alt="Tyee Calender"
          height={500}
          width={500}
          className="ml-auto"
        />
      </div>

      <div className="section4 p-10 rounded-lg shadow-md flex items-center mb-10 ">
        <Image
          src="https://i.ibb.co/dknmZQc/OIG3-removebg-preview.png"
          alt="Tyee Calender"
          height={500}
          width={500}
          className="mr-auto"
        />
        <div>
          <h1 className="text-3xl mb-4 text-blue-500">Big Community</h1>
          <p className="text-xl">
            Don&apos;t forget that there are hundreds of other students at Tyee, and
            they all contribute to the calendar and ensure that it&apos;s up to date. Join the community and help us make the calendar better!
          </p>
        </div>
      </div>
    </main>
  );
}