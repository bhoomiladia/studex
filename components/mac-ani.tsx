// import React from "react";
// import { MacbookScroll } from "@/components/ui/macbook-scroll";

// export function MacbookScrollDemo() {
//   return (
//     <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
//       <MacbookScroll
//         title={
//           <span>
//             This Macbook is built with Tailwindcss. <br /> No kidding.
//           </span>
//         }
//         badge={
//           <a href="https://peerlist.io/manuarora">
//             <Badge className="h-10 w-10 -rotate-12 transform" />
//           </a>
//         }
//         src={`/linear.webp`}
//         showGradient={false}
//       />
//     </div>
//   );
// }
// // Peerlist logo
// const Badge = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
//         fill="#00AA45"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//         fill="#219653"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
//         fill="#24292E"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
//         fill="white"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
//         fill="#24292E"
//       ></path>
//     </svg>
//   );
// };

// import React from "react"
// import { MacbookScroll } from "@/components/ui/macbook-scroll"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { CheckCircle, Star, Zap, ArrowRight } from "lucide-react"

// export function MacbookScrollDemo() {
//   return (
//     <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
//       <MacbookScroll
//         title={
//           <span>
//             This Macbook is built with Tailwindcss. <br /> No kidding.
//           </span>
//         }
//         badge={
//           <a href="https://peerlist.io/manuarora">
//             <Badge className="h-10 w-10 -rotate-12 transform" />
//           </a>
//         }
//         showGradient={false}
//         content={
//           <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 min-h-[600px]">
//             <div className="text-center space-y-8 max-w-4xl">
//               <div className="space-y-6">
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                   className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance"
//                 >
//                   Reimagine College Management <span className="text-blue-600">with Ease</span>
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.4 }}
//                   className="text-xl text-gray-700 leading-relaxed text-pretty max-w-3xl mx-auto"
//                 >
//                   Seamless collaboration for students, faculty, parents, and admins. Transform your educational
//                   institution with our comprehensive, intuitive platform.
//                 </motion.p>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//               >
//                 <Link href="/portal">
//                   <Button
//                     size="lg"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-8 text-2xl rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
//                   >
//                     Enter the Experience
//                     <ArrowRight className="ml-3 w-6 h-6" />
//                   </Button>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.8 }}
//                 className="flex items-center justify-center gap-12 text-sm text-gray-600 pt-8"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                   </div>
//                   <span className="font-medium">500+ Active Users</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Star className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <span className="font-medium">10+ Institutions</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//                     <Zap className="w-5 h-5 text-orange-600" />
//                   </div>
//                   <span className="font-medium">50+ Features</span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         }
//       />
//     </div>
//   )
// }

// const Badge = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
//         fill="#00AA45"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//         fill="#219653"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
//         fill="#24292E"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
//         fill="white"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
//         fill="#24292E"
//       />
//     </svg>
//   )
// }

// import React from "react"
// import { MacbookScroll } from "@/components/ui/macbook-scroll"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { CheckCircle, Star, Zap, ArrowRight } from "lucide-react"

// export function MacbookScrollDemo() {
//   return (
//     <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
//       <MacbookScroll
//         title={
//           <span>
//             This Macbook is built with Tailwindcss. <br /> No kidding.
//           </span>
//         }
//         badge={
//           <a href="https://peerlist.io/manuarora">
//             <Badge className="h-10 w-10 -rotate-12 transform" />
//           </a>
//         }
//         showGradient={false}
//         content={
//           <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 min-h-[600px]">
//             <div className="text-center space-y-8 max-w-4xl">
//               <div className="space-y-6">
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                   className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance"
//                 >
//                   Reimagine College Management <span className="text-blue-600">with Ease</span>
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.4 }}
//                   className="text-xl text-gray-700 leading-relaxed text-pretty max-w-3xl mx-auto"
//                 >
//                   Seamless collaboration for students, faculty, parents, and admins. Transform your educational
//                   institution with our comprehensive, intuitive platform.
//                 </motion.p>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//               >
//                 <Link href="/portal">
//                   <Button
//                     size="lg"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-8 text-2xl rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
//                   >
//                     Enter the Experience
//                     <ArrowRight className="ml-3 w-6 h-6" />
//                   </Button>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.8 }}
//                 className="flex items-center justify-center gap-12 text-sm text-gray-600 pt-8"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                   </div>
//                   <span className="font-medium">500+ Active Users</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Star className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <span className="font-medium">10+ Institutions</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//                     <Zap className="w-5 h-5 text-orange-600" />
//                   </div>
//                   <span className="font-medium">50+ Features</span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         }
//       />
//     </div>
//   )
// }
// const Badge = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
//         fill="#00AA45"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//         fill="#219653"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
//         fill="#24292E"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
//         fill="white"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
//         fill="#24292E"
//       />
//     </svg>
//   )
// }

// import React from "react";
// import { MacbookScroll } from "@/components/ui/macbook-scroll";

// export function MacbookScrollDemo() {
//   return (
//     <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
//       <MacbookScroll
//         title={
//           <span>
//             This Macbook is built with Tailwindcss. <br /> No kidding.
//           </span>
//         }
//         badge={
//           <a href="https://peerlist.io/manuarora">
//             <Badge className="h-10 w-10 -rotate-12 transform" />
//           </a>
//         }
//         src={`/linear.webp`}
//         showGradient={false}
//       />
//     </div>
//   );
// }
// // Peerlist logo
// const Badge = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
//         fill="#00AA45"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//         fill="#219653"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
//         fill="#24292E"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
//         fill="white"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
//         fill="#24292E"
//       ></path>
//     </svg>
//   );
// };

///////////_____>THIS SHIT IS WORKING

import React from "react";
import { MacbookScroll } from "@/components/macbook-scroll";

export function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F] flex justify-center">
      {/* Scale wrapper for MacbookScroll */}
      <div className="transform scale-105">
        {/* 125% bigger */}
        <MacbookScroll
          title={
            <span>
              <div className="relative inline-block">
                <span className="text-4xl md:text-6xl font-bold">
                  Less <span className="text-blue-600">Chaos.</span>
                </span>

                {/* Graduation hat image "hanging" from the text */}
                <img
                  src="/graduation-hat-png-2.png"
                  alt="Graduation Hat"
                  className="absolute -top-8 -left-14 w-25 -rotate-10 drop-shadow-lg"
                />
              </div>

              <span className="block text-2xl md:text-4xl">
                More <span className="text-blue-600">Clarity.</span>
              </span>
            </span>
          }
          src="/dash-1.jpg"
          showGradient={false}
        />
      </div>
    </div>
  );
}

