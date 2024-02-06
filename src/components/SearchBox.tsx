/** @format */

import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { Props } from "../../types/types";

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
        className="font-OpenSans px-4 py-2 w-[230px] bg-stone-200 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-yellow text-white rounded-r-md focus:outline-none h-full">
        <IoSearch className="bg-yellow"/>
      </button>
    </form>
  );
}