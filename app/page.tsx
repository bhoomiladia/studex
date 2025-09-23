"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { MacbookScrollDemo } from "@/components/mac-ani";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // or use any slider library
import {
  Users,
  GraduationCap,
  Calendar,
  FileText,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import { Slideshow } from "@/components/Slideshow";
import { HeroParallaxDemo } from "@/components/HeroParallaxDemo";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HoverBorderGradientDemo } from "@/components/HoverBorderGradient";
import CampusChallenges from "@/components/CampusChallenges";
import WorkflowSection from "@/components/WorkflowSection";
import CollegeFeatures from "@/components/CollegeFeatures";

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrollProgress={scrollProgress} />

      {/* Branding Section */}
      <section className="h-[60vh] w-full bg-white dark:bg-[#0B0B0F] flex items-center justify-center mt-20">
        <div className="max-w-8xl w-full flex flex-col md:flex-row justify-between px-8 md:px-16">
          {/* Left Branding Section */}
          <div className="md:w-1/2 text-left space-y-6 ml-40">
            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
              One Stop Solution
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              The Future of
              <br />
              Campus Management.
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 -mt-2">
              Streamline administrative tasks, boost efficiency, and gain
              powerful insights to drive student success.
            </p>

            <div className="flex gap-4">
              <Link href="/portal">
                <button className="px-5 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">
                  Request Live Demo
                </button>
              </Link>
              <button className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                Pricing & Plans
              </button>
            </div>
          </div>

          {/* Right Computer Monitor with slideshow */}
          <div className="md:w-2/3 flex justify-center mt-10 md:mt-0 relative">
            <div className="relative w-[700px]">
              {/* Laptop frame */}
              <img
                src="/mac2.jpg"
                alt="Laptop Frame"
                className="w-full h-auto relative z-0 scale-100"
              />

              {/* Slideshow inside the laptop screen */}
              <div
                className="absolute bg-white overflow-hidden z-10"
                style={{
                  top: "6.4%", // adjust vertical alignment
                  left: "10.1%", // adjust horizontal alignment
                  width: "79.2%", // width of actual screen
                  height: "80%", // height of actual screen
                  borderRadius: "8px",
                }}
              >
                <Slideshow />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-white -mt-12">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-8 text-balance">
            The Smarter Way to Manage Education
          </h2>
          <div className="py-10 px-5 -mt-12">
            <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
              <LayoutTextFlip
                text="The future of "
                words={["Clarity", "Efficiency", "Growth", "Success"]}
              />
            </motion.div>
            <p className="mt-2 text-center text-base text-neutral-600 dark:text-neutral-400">
              Experience a seamless, intuitive platform designed to simplify
              campus life.
            </p>
          </div>
          <div className="-mt-2"></div>
        </div>
      </section>
      <div className="flex items-center justify-center -mt-20">
        <Link href="/portal">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center px-6 py-3 text-lg font-semibold cursor-pointer"
          >
            🚀 Enter Portal
          </HoverBorderGradient>
        </Link>
      </div>

      <section className="py-24 px-6 bg-white ">
        <div className="container mx-auto max-w-10xl">
          <div className="text-center mb-20">
            <div className=" -mt-24 mb-10">
              <CampusChallenges />
            </div>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">
              Why Stud<span className="text-blue-600">DEX</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your institution effectively with
              cutting-edge technology
            </p>
          </div>
          <div className="-mt-10">
            <WorkflowSection />
          </div>
          <div>
            <CollegeFeatures />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Users,
                title: "Admissions",
                description:
                  "Streamlined application process with automated workflows and digital document management",
                color: "blue",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
                hoverColor: "group-hover:bg-blue-100",
              },
              {
                icon: BookOpen,
                title: "Student Portal",
                description:
                  "Intuitive student dashboard for course management, grades, and academic resources",
                color: "green",
                bgColor: "bg-green-50",
                iconColor: "text-green-600",
                hoverColor: "group-hover:bg-green-100",
              },
              {
                icon: GraduationCap,
                title: "Faculty Management",
                description:
                  "Comprehensive faculty administration, scheduling, and performance tracking tools",
                color: "orange",
                bgColor: "bg-orange-50",
                iconColor: "text-orange-600",
                hoverColor: "group-hover:bg-orange-100",
              },
              {
                icon: Calendar,
                title: "Attendance",
                description:
                  "Real-time attendance monitoring with automated reporting and analytics",
                color: "purple",
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
                hoverColor: "group-hover:bg-purple-100",
              },
              {
                icon: FileText,
                title: "Results",
                description:
                  "Automated result processing, grade distribution, and transcript generation",
                color: "indigo",
                bgColor: "bg-indigo-50",
                iconColor: "text-indigo-600",
                hoverColor: "group-hover:bg-indigo-100",
              },
              {
                icon: Building,
                title: "Hostel Management",
                description:
                  "Automated Hostel Allotement ,mess allotement and fee management",
                color: "indigo",
                bgColor: "bg-indigo-50",
                iconColor: "text-indigo-600",
                hoverColor: "group-hover:bg-indigo-100",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-gray-200 group bg-white hover:-translate-y-2"
              >
                <div
                  className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 ${feature.hoverColor} transition-colors`}
                >
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h2 className="text-5xl lg:text-6xl font-bold mb-10 text-balance leading-tight">
            The complete platform to{" "}
            <span className="text-blue-400">simplify college operations</span>{" "}
            and enhance student experience.
          </h2>
          <p className="text-2xl text-slate-300 leading-relaxed mb-16 text-pretty max-w-4xl mx-auto">
            Join hundreds of institutions worldwide who trust our platform to
            manage their educational operations efficiently. Experience the
            future of college management today.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              Get a Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 bg-transparent px-12 py-6 text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Try Free
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                CollegeMgmt <span className="text-blue-600">SaaS</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Transforming education through innovative technology and
                seamless user experiences.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Demo", "API", "Integrations"],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Contact",
                  "Training",
                  "Status",
                  "Community",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Partners", "Press"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-900 mb-6 text-lg">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors text-base"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              © 2025 CollegeMgmt SaaS. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              {["Terms", "Privacy", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}