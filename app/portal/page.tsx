"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Settings, GraduationCap, Users, Heart, ArrowRight, Wallet, Building2, BookOpen } from "lucide-react"

const roles = [
  {
    title: "Admin",
    description: "Complete system administration and management control",
    icon: Settings,
    color: "bg-blue-600 hover:bg-blue-700",
    borderColor: "border-blue-200 hover:border-blue-400",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Student",
    description: "Access courses, grades, and academic resources",
    icon: GraduationCap,
    color: "bg-green-600 hover:bg-green-700",
    borderColor: "border-green-200 hover:border-green-400",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Financial Admin",
    description: "Manage fees, budgets, and financial operations with ease",
    icon: Wallet,
    color: "bg-purple-600 hover:bg-purple-700",
    borderColor: "border-purple-200 hover:border-purple-400",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
   {
    title: "Hostel Admin",
    description: "Oversee hostel allocations, attendance, and records",
    icon: Building2,
    color: "bg-orange-600 hover:bg-orange-700",
    borderColor: "border-orange-200 hover:border-orange-400",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Librarian",
    description: "Manage books, inventory, and student borrow requests",
    icon: BookOpen,
    color: "bg-yellow-600 hover:bg-yellow-700",
    borderColor: "border-yellow-200 hover:border-yellow-400",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
]

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 px-4 mt-16">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                Welcome to Your College <br />
                <span className="text-blue-600">Data Management Portal</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed text-pretty max-w-3xl mx-auto">
                Choose your role to continue and experience our comprehensive management system tailored to your
                specific needs and responsibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
<section className="py-16 px-4 bg-gray-50">
  <div className="container mx-auto max-w-8xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Role</h2>
      <p className="text-lg text-gray-600">
        Each role provides a customized experience designed for your specific workflow
      </p>
    </div>

    {/* Single Row with Equal Height Cards */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {roles.map((role, index) => {
        const IconComponent = role.icon;
        return (
          <Card
            key={index}
            className={`flex flex-col justify-between p-8 h-[380px] hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 ${role.borderColor} bg-white rounded-xl`}
          >
            <div className="flex flex-col items-center text-center flex-1">
              <div
                className={`w-16 h-16 ${role.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className={`w-8 h-8 ${role.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-gray-600 leading-relaxed">{role.description}</p>
            </div>
            <Button
              className={`mt-6 w-full ${role.color} text-white font-bold py-3 rounded-lg group-hover:shadow-lg transition-all duration-300`}
            >
              LogIn as {role.title}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        );
      })}
    </div>

    <div className="text-center mt-16">
      <p className="text-gray-600 mb-6 text-lg">
        Need help choosing the right role for your needs?
      </p>
      <Button
        variant="outline"
        size="lg"
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent px-8 py-3 font-bold rounded-lg"
      >
        Contact Support
      </Button>
    </div>
  </div>
</section>


      {/* Features Preview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What You'll Experience</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Each role provides access to powerful tools and features designed to streamline your daily tasks
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Intuitive Dashboard</h3>
              <p className="text-gray-600">Clean, organized interface with role-specific widgets and quick actions</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed with instant notifications and live data synchronization</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Seamless Collaboration</h3>
              <p className="text-gray-600">Connect and communicate with other users across your institution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">CollegeMgmt SaaS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Transforming education through innovative technology and seamless user experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2025 CollegeMgmt SaaS. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Support
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
