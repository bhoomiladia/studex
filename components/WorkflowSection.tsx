"use client";
import React from "react";
import { GraduationCap, BookOpen, Wallet, BarChart } from "lucide-react";
import Image from "next/image";

export default function WorkflowSection() {
  const steps = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      title: "Admissions & Enrollment",
      desc: "From application submission to student registration.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "Academics & Learning",
      desc: "Course management, attendance, and progress tracking.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-blue-500" />,
      title: "Finance & Operations",
      desc: "Fee collection, payroll, and resource allocation.",
    },
    {
      icon: <BarChart className="w-8 h-8 text-blue-500" />,
      title: "Reporting & Analytics",
      desc: "Real-time data insights for informed decision-making.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center ">
          <Image
            src="/studexdash.png"
            alt="Workflow Illustration"
            width={1200}
            height={700}
            className="object-contain w-[150%] h-auto rounded-2xl" // 120% of container
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Seamless Workflow, Simplified Management
          </h2>
          <p className="text-gray-600 mb-10">
            Experience an integrated flow that connects all core aspects of
            college operations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-start space-y-2">
                {step.icon}
                <h4 className="font-semibold text-lg">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
