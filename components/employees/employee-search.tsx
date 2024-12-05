"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EmployeeSearchProps {
  onSearch: (query: string) => void;
}

export function EmployeeSearch({ onSearch }: EmployeeSearchProps) {
  return (
    <div className="relative w-full md:w-96">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by name, department, position..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}