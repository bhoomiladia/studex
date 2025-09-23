"use client";
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function CampusChallenges() {
  const problems = [
    {
      title: "Fragmented Data",
      desc: "Information scattered across multiple systems leading to inefficiencies.",
    },
    {
      title: "Manual Processes",
      desc: "Paper-based workflows causing delays and administrative burden.",
    },
    {
      title: "Lack of Insights",
      desc: "Difficulty in generating comprehensive reports for strategic decisions.",
    },
    {
      title: "Compliance Challenges",
      desc: "Struggles to meet regulatory requirements and maintain data accuracy.",
    },
  ];

  const solutions = [
    {
      title: "Centralized Database",
      desc: "All college data unified in one secure, accessible platform.",
    },
    {
      title: "Automated Workflows",
      desc: "Digital processes for admissions, fees, and examinations, saving time.",
    },
    {
      title: "Real-time Analytics",
      desc: "Dynamic dashboards providing instant insights into college operations.",
    },
    {
      title: "Enhanced Security",
      desc: "Robust access controls and data encryption ensure compliance and privacy.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
        Solving Your Campus Management Challenges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Problems */}
        <div>
          <h3 className="text-3xl font-semibold text-red-600 mb-6 -ml-32">
            The Problem
          </h3>
          <ul className="space-y-6">
            {problems.map((item, i) => (
              <li key={i} className="flex items-start space-x-4">
                <XCircle className="w-6 h-6 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-3xl font-semibold text-blue-600 mb-6 -ml-32">
            The Solution
          </h3>
          <ul className="space-y-6">
            {solutions.map((item, i) => (
              <li key={i} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
