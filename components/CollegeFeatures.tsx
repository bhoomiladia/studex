"use client";
import React from "react";
import {
  GraduationCap,
  Users,
  Wallet,
  UserCheck,
  Building2,
  ShieldCheck,
} from "lucide-react";

export default function CollegeFeatures() {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "Student Lifecycle Tracking",
      desc: "From admission to graduation — monitor every journey.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Faculty Portal",
      desc: "Assign classes, manage exams & track student progress.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      title: "Seamless Finance Management",
      desc: "Transparent fee tracking & integrated reports.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Parent Connect",
      desc: "Real-time updates on academics, finance, and hostel.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: "Digital Hostel Manager",
      desc: "Easy allocation, leave records & attendance at a tap.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Data Security First",
      desc: "Safe, encrypted, role-based access for everyone.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">
          All Your College Needs, Seamlessly Under One Roof
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          From small colleges to large universities — our ERP helps you save
          time, minimize errors, and power a smarter digital campus.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-2xl">{feature.title}</h4>
              <p className="text-gray-600 text-md">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
