"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportsFiltersProps {
  reportType: "all" | "financial" | "clinical" | "operational";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onReportTypeChange: (
    value: "all" | "financial" | "clinical" | "operational"
  ) => void;
  onDateRangeChange: any;
  // onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function ReportsFilters({
  reportType,
  dateRange,
  onReportTypeChange,
  onDateRangeChange,
}: ReportsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Select
        value={reportType}
        onValueChange={(
          value: "all" | "financial" | "clinical" | "operational"
        ) => onReportTypeChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Reports</SelectItem>
          <SelectItem value="financial">Financial</SelectItem>
          <SelectItem value="clinical">Clinical</SelectItem>
          <SelectItem value="operational">Operational</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
