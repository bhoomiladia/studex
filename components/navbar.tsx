"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  scrollProgress?: number
}

export function Navbar({ scrollProgress = 0 }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(scrollProgress < 0.1 || scrollProgress > 0.8)
  }, [scrollProgress])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed top-0 w-full z-50 shadow-sm"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-18">
              {/* Logo with enhanced styling */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  Stud<span className="text-blue-600">DEX</span>
                </Link>
              </div>

              {/* Desktop Menu with improved spacing */}
              <div className="hidden lg:block">
                <div className="ml-10 flex items-center space-x-8">
                  {["Our Product", "Features", "Pricing", "Request Quotation", "Resources", "About Us", "Contact"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium relative group"
                      >
                        {item}
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Desktop CTA Buttons with enhanced styling */}
              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 transition-all duration-200"
                >
                  Get a Demo
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200">
                  Try Free
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-blue-600 p-2 transition-colors"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu with enhanced animations */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden overflow-hidden"
                >
                  <div className="px-2 pt-2 pb-6 space-y-1 bg-white border-t border-gray-200">
                    {[
                      "Our Product",
                      "Features",
                      "Pricing",
                      "Request Quotation",
                      "Resources",
                      "About Us",
                      "Contact",
                    ].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        {item}
                      </a>
                    ))}
                    <div className="flex flex-col space-y-3 px-4 pt-4">
                      <Button
                        variant="outline"
                        className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 font-semibold"
                      >
                        Get a Demo
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Try Free</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
