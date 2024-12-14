"use client";
import React from "react";
import Image from "next/image";

const guide = {
  name: "Mr. Gautam Nath",
  role: "Professor in the Department of CSE",
  image: "/gautam.jpg",
};

const teamMembers = [
  {
    name: "Rishab Ranjan Goswami",
    phone: "8473888604",
    image: "/RRG2.jpg",
  },
  {
    name: "Manash Jyoti Bora",
    phone: "8134856496",
    image: "/Roome2.jpg",
  },
  {
    name: "Anuj Adhikari",
    phone: "6000649624",
    image: "/Monk2.jpg",
  },
  {
    name: "Dipannita Borah",
    phone: "9395053400",
    image: "/Dipu2.jpg",
  },
  {
    name: "Rajdeep Karmakar",
    phone: "8135814933",
    image: "/Premik2.jpg",
  },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Image
        src="/college.jpg"
        layout="fill"
        objectFit="cover"
        className="opacity-30 z-0"
        alt="College Background"
      />
      <h1 className="text-center text-4xl font-bold py-10 z-10 relative">
        Barak Valley Engineering College
      </h1>

      <div className="flex flex-col items-center py-8 relative z-10">
        {/* Guide Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center">
            <Image
              src={guide.image}
              width={80}
              height={80}
              className="rounded-full mb-4"
              alt={guide.name}
            />
            <h2 className="text-2xl font-bold">{guide.name}</h2>
            <p className="text-gray-600">{guide.role}</p>
          </div>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold mt-10">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 mb-4">
                <Image
                  src={member.image}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                  alt={member.name}
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">CSE, 7th Semester</p>
              <p className="text-gray-600">{member.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
