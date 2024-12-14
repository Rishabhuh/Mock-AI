"use client";
import React from 'react';

const UpgradePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Upgrade</h1>
        <p className="text-lg text-gray-500 mt-4">
          Upgrade to a monthly plan to access unlimited mock interviews, exclusive content, and priority support.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        {/* Free Plan */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-black mb-4">Free Plan</h2>
          <ul className="mb-6 space-y-2">
            <li className="text-green-600">✔ Access to 5 mock interviews</li>
            <li className="text-red-600">✖ No exclusive content</li>
            <li className="text-red-600">✖ No priority support</li>
          </ul>
          <button className="px-6 py-2 border border-purple-700 text-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition">
            Get Started
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-black mb-4">Monthly Plan</h2>
          <ul className="mb-6 space-y-2">
            <li className="text-green-600">✔ Unlimited mock interviews</li>
            <li className="text-green-600">✔ Access to exclusive content</li>
            <li className="text-green-600">✔ Priority support</li>
          </ul>
          <button className="px-6 py-2 border border-purple-700 text-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition">
            Get Started
          </button>
        </div>

        {/* Annual Plan */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-black mb-4">Annual Plan</h2>
          <ul className="mb-6 space-y-2">
            <li className="text-green-600">✔ Unlimited mock interviews</li>
            <li className="text-green-600">✔ Access to exclusive content</li>
            <li className="text-green-600">✔ Priority support</li>
            <li className="text-green-600">✔ 2 months free</li>
          </ul>
          <button className="px-6 py-2 border border-purple-700 text-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
