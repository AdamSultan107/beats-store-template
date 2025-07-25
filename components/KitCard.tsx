"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type KitCardProps = {
  id: string
  name: string
  type: string
  price: string
  index: number
}

export default function KitCard({ id, name, type, price, index }: KitCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), index * 100)
    return () => clearTimeout(timeout)
  }, [index])

  return (
    <Link href={`/kits/${id}`}>
      <div
        className={`w-[300px] rounded-2xl overflow-hidden shadow-sm transition cursor-pointer hover:shadow-lg hover:scale-105 border border-neutral-200 transform duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Image
          src="/kitstockphoto.jpg"
          alt={`${name} (${type})`}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
        <div className="bg-white p-5 text-center">
          <p className="text-md text-black font-semibold mb-2 uppercase">
            {name} ({type})
          </p>
          <p className="text-sm text-pink-500 font-bold">{price}</p>
        </div>
      </div>
    </Link>
  )
}
