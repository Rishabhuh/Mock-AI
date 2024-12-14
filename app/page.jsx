"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white overflow-hidden">
      <div className="text-center mb-10 pt-20">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to AI Based Mock Interview Platform
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Get started with personalized mock interviews, premium plans, and
          real-time feedback to improve your skills.
        </p>
      </div>
      <div className="mb-12">
        <Image
          src="/interview.jpg"
          alt="Teamwork"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="flex gap-6 mb-20">
        <Button
          className="px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-purple-100 transition"
          onClick={() => router.push("/dashboard")}
        >
          Get Started
        </Button>

        <Button
          className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-purple-600 transition"
          onClick={() => router.push("/dashboard/about")}
        >
          About Us
        </Button>
      </div>
      <section className="w-full py-16 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What We Do</h2>
          <p className="text-lg">
            Our platform provides you with a comprehensive mock interview
            experience. Whether you’re preparing for a technical, HR, or
            industry-specific interview, we have a variety of tools to enhance
            your confidence. From personalized feedback to structured
            interview simulations, we help you excel in your job interviews.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full text-center text-sm text-gray-300 bg-transparent py-4">
        © Barak Valley Engineering College. All rights reserved.
      </footer>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
