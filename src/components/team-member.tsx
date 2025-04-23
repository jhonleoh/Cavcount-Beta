"use client"

import { Card } from "@/components/ui/card"

interface TeamMemberProps {
  name: string
  roleDescription: string
  avatarIndex: number
  primaryContributor?: boolean
}

// Function to generate a consistent color based on name
const getAvatarColor = (index: number) => {
  const colors = [
    "bg-gradient-to-br from-violet-500 to-purple-700",
    "bg-gradient-to-br from-blue-500 to-indigo-700",
    "bg-gradient-to-br from-emerald-500 to-green-700",
    "bg-gradient-to-br from-amber-500 to-orange-700",
    "bg-gradient-to-br from-rose-500 to-red-700",
  ]
  return colors[index % colors.length]
}

export function TeamMember({
  name,
  roleDescription,
  avatarIndex,
  primaryContributor = false,
}: TeamMemberProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card className={`p-6 relative overflow-hidden transition-all duration-300 ${primaryContributor ? "border-primary/50" : ""}`}>
      <div className="flex flex-col items-center text-center">
        {/* 3D-style Avatar */}
        <div className="relative mb-4">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg ${getAvatarColor(avatarIndex)}`}
            style={{
              transform: "perspective(800px) rotateX(10deg)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {initials}
          </div>

          {/* Primary contributor badge */}
          {primaryContributor && (
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              ★
            </div>
          )}
        </div>

        {/* Name and role */}
        <h3 className="mb-1 text-xl font-bold">{name}</h3>

        {/* Role Badge */}
        <div className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-sm">
          {roleDescription}
        </div>
      </div>
    </Card>
  )
}
