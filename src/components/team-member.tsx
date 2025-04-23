"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ReactNode } from "react"

interface TeamMemberProps {
  name: string
  role: string
  image: string
  icon?: ReactNode
}

export function TeamMember({
  name,
  role,
  image,
  icon,
}: TeamMemberProps) {
  return (
    <Card className="p-6 relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        {/* Member Image */}
        <div className="relative mb-4">
          <div
            className="h-24 w-24 relative rounded-full overflow-hidden shadow-lg"
            style={{
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 96px, 96px"
              className="object-cover"
            />
          </div>

          {/* Icon badge */}
          {icon && (
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
              {icon}
            </div>
          )}
        </div>

        {/* Name and role */}
        <h3 className="mb-1 text-xl font-bold">{name}</h3>

        {/* Role Badge */}
        <div className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-sm">
          {role}
        </div>
      </div>
    </Card>
  )
}
