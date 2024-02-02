import React from 'react';
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex items-center justify-between px-3  max-w-7xl mx-auto">
        <p className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3x1">Weather</h2>
            <MdWbSunny className="text-3x1 mt-1 text-yellow-300" />
        </p>
        <section className="felx gap-2 items-center">
            <MdMyLocation />
        </section>
    </div>
    </nav>
  )
}
