'use client';

import { LoaderCircle, Search } from "lucide-react"
import { Input } from "./ui/input"
import {
  parseAsString,
  useQueryState,
} from "nuqs";
import { useTransition } from "react";

function SearchInput() {
  const [isLoading, startTransition] = useTransition();
  const [name, setName] = useQueryState(
    "name",
    parseAsString
    .withDefault("")
    .withOptions({ shallow: false, throttleMs: 800 , startTransition}),
  );

  return (
    <div className="relative w-full max-w-md">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="search"
        placeholder="Search movies..."
        className="w-full pl-10 pr-4 py-2 border-gray-300 focus:border-black focus:ring-black"
      />
        {
          isLoading ? (
            <LoaderCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
          )
          :
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        }
      </div>
  )
}

export default SearchInput