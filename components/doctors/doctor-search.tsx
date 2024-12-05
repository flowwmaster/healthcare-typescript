"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DoctorSearchProps {
  onSearch: (query: string) => void;
}

export function DoctorSearch({ onSearch }: DoctorSearchProps) {
  return (
    <div className="relative w-full md:w-96">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search doctors by name, specialty..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}