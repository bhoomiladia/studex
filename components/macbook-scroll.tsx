// "use client"

// import type React from "react"
// import { useRef, useEffect, useState } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"

// interface MacBookScrollProps {
//   children: React.ReactNode
//   onScrollProgress?: (progress: number) => void
// }

// export function MacBookScroll({ children, onScrollProgress }: MacBookScrollProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [isComplete, setIsComplete] = useState(false)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   })

//   const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.05, 0.95, 0.8])
//   const y = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, -20, -100, -250])
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9, 1], [1, 1, 1, 0.7, 0.2])
//   const macbookOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1, 0.5, 0])
//   const contentScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1.02, 1.1])

//   useEffect(() => {
//     const unsubscribe = scrollYProgress.on("change", (progress) => {
//       onScrollProgress?.(progress)
//       setIsComplete(progress > 0.8)
//     })
//     return unsubscribe
//   }, [scrollYProgress, onScrollProgress])

//   return (
//     <div ref={containerRef} className="relative h-[250vh]">
//       <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <motion.div style={{ scale, y, opacity }} className="relative w-full max-w-7xl mx-auto px-4">
//           {/* MacBook Frame */}
//           <motion.div style={{ opacity: macbookOpacity }} className="relative">
//             {/* Screen Bezel with enhanced styling */}
//             <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-3xl p-8 shadow-2xl border border-gray-700">
//               {/* Top Bar with more realistic browser chrome */}
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="flex gap-2">
//                   <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
//                   <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
//                   <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
//                 </div>
//                 <div className="flex-1 bg-gray-200 rounded-lg h-8 mx-6 flex items-center px-4 shadow-inner">
//                   <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
//                   <span className="text-sm text-gray-800 font-medium">https://collegemgmt.com</span>
//                   <div className="ml-auto w-4 h-4 bg-gray-400 rounded opacity-50"></div>
//                 </div>
//               </div>

//               {/* Screen Content with enhanced container */}
//               <motion.div
//                 style={{ scale: contentScale }}
//                 className="bg-white rounded-xl overflow-hidden aspect-[16/10] shadow-2xl border border-gray-200"
//               >
//                 {children}
//               </motion.div>
//             </div>

//             {/* MacBook Base with more realistic styling */}
//             <div className="relative">
//               <div className="bg-gradient-to-b from-gray-300 to-gray-400 h-8 rounded-b-3xl shadow-xl border-x border-b border-gray-400"></div>
//               <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-t-sm"></div>
//               {/* Keyboard area suggestion */}
//               <div className="absolute inset-x-4 top-2 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-sm opacity-60"></div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }









// import React from "react"

// export const MacbookScroll = ({
//   title,
//   badge,
//   showGradient,
//   content,
// }: {
//   title?: React.ReactNode
//   badge?: React.ReactNode
//   showGradient?: boolean
//   content?: React.ReactNode
// }) => {
//   return (
//     <div className="macbook-container relative p-8">
//       {title && <div className="text-center text-gray-500 mb-4">{title}</div>}
//       {badge && <div className="absolute top-4 right-4">{badge}</div>}

//       {/* Macbook frame */}
//       <div className="relative bg-gray-200 rounded-xl shadow-lg overflow-hidden w-full max-w-4xl mx-auto">
//         <div className="bg-black h-[600px] overflow-auto p-4 text-white">
//           {content}
//         </div>
//       </div>

//       {showGradient && (
//         <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 pointer-events-none" />
//       )}
//     </div>
//   )
// }





import React from "react";

export const MacbookScroll = ({
  title,
  src,
  showGradient,
}: {
  title?: React.ReactNode;
  src?: string;
  showGradient?: boolean;
}) => {
  return (
    <div className="macbook-container relative p-8">
      {title && <div className="text-center text-gray-700 dark:text-gray-300 mb-4">{title}</div>}
      {/* Macbook frame */}
      <div className="relative bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full max-w-4xl mx-auto">
        <div className="bg-black h-[600px] overflow-hidden text-white flex items-center justify-center">
          {src ? (
            <img src={src} alt="Macbook Content" className="w-full h-full object-cover" />
          ) : (
            <div className="text-sm text-gray-300">No content</div>
          )}
        </div>
      </div>
      {showGradient && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-blue-500 to-purple-500 opacity-10" />
      )}
    </div>
  );
};

type MacbookScrollDemoProps = {
  className?: string;
};

export function MacbookScrollDemo({ className = "" }: MacbookScrollDemoProps) {
  return (
    <div
      className={`w-full overflow-hidden bg-white dark:bg-[#0B0B0F] flex justify-center py-10 ${className}`}
    >
      {/* Scale wrapper for MacbookScroll */}
      <div className="transform scale-100">
        <MacbookScroll
          title={
            <div className="pt-6">
              <span className="text-lg md:text-xl">
                Less Chaos.<br />More Clarity.
              </span>
            </div>
          }
          src={`/linear.webp`}
          showGradient={false}
        />
      </div>
    </div>
  );
}
