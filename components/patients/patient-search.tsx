"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PatientSearchProps {
  onSearch: (query: string) => void;
}

export function PatientSearch({ onSearch }: PatientSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search patients..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}