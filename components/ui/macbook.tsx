import React from "react"

export const Macbook = ({
  title,
  badge,
  children,
}: {
  title?: React.ReactNode
  badge?: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F] p-8">
      {title && <div className="text-center text-gray-500 mb-4">{title}</div>}
      {badge && <div className="absolute top-4 right-4">{badge}</div>}

      {/* Macbook frame */}
      <div className="relative bg-gray-200 rounded-xl shadow-lg overflow-hidden w-full max-w-4xl mx-auto">
        {/* Mac screen area */}
        <div className="bg-black h-[600px] overflow-auto p-4 text-white">
          {children}
        </div>
      </div>
    </div>
  )
}
