'use client'

import React from 'react';
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';
import useState from 'react';
import axios from 'axios';
import { error } from 'console';

type Props = {}

export default function Navbar({}: Props) {

  const [city, setCity] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")

  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false)

async function handleInputChange(value :string) {
  setCity(value);
  if(value.length > 3) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);

      const suggestions = response.data.list.map((item: any) => item.name);
      setSuggestions(suggestions);
      setError("");
      setShowSuggestions(true);
    } catch (error) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  } else {
    setSuggestions([]);
    setShowSuggestions(false);
  }
}

return (
  <>
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex items-center justify-between px-3  max-w-7xl mx-auto">
        <p className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>
        <section className="flex gap-2 items-center">
            <MdMyLocation  className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"/>
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm">Dorking</p>
            <div> 
                <SearchBox 
                value={city}
                // onSubmit={}
                onChange={(e)=> handleInputChange(e.target.value)} /> 
            </div>
        </section>
    </div>
    </nav>
    </>
  );
}

function SuggestionBox({ suggestions, showSuggestions, handleSuggestionClick, error 
} : {
  suggestions: string[]; 
  showSuggestions: boolean; 
  handleSuggestionClick: (item: string) => void; 
  error: string
})

{
  return (
    <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
    <li className="cursor-pointer p-1 rounded hover:bg-gray-200"></li>
    </ul>
  )
}