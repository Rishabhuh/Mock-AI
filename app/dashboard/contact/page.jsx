// app/dashboard/contact/page.jsx

import React from 'react';

function ContactUs() {
    return (
        <div className="py-10 flex flex-col items-center">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {/* Card 1 */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Email Support</h2>
                    <p className="mt-4">Reach us at BVEC@gmail.com for assistance.</p>
                </div>
                {/* Card 2 */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Live Chat</h2>
                    <p className="mt-4">Chat with our support team 24/7 for instant help.</p>
                </div>
                {/* Card 3 */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Phone Support</h2>
                    <p className="mt-4">Call us at 91-8473888604 for immediate support.</p>
                </div>
                {/* Card 4 */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Social Media</h2>
                    <p className="mt-4">Connect with us on Facebook, Twitter, and Instagram.</p>
                </div>
                {/* Card 5 */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">FAQ</h2>
                    <p className="mt-4">Check out our FAQ for commonly asked questions.</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
