"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function CustomDateInput({ label, onChange, fromDate, toDate, value, }: {
    label: string;
    onChange: (val: Date | null) => void;
    fromDate?: Date;
    toDate?: Date;
    value?: Date | null;
}) {
    const [date, setDate] = useState<Date | null>(value ?? null);
    
    useEffect(() => {
        setDate(value ?? null);
    }, [value]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        const newDate = selectedDate ?? null;
        onChange(newDate);
        setDate(newDate);
    }

    // reset date if value is greater
    if (value && date && value > date) {
        setDate(null);
    }

    return (
        <Popover>
            <PopoverTrigger asChild className="py-6">
                <Button
                    variant={"outline"}
                    className={cn(
                        "md:w-[180px] w-[250px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon
                        className="mr-2 h-4 w-4"
                        width={18}
                        height={18}
                        color="#C9CACC"
                    />
                    {date ? format(date, "MMM dd, yyyy") : <span>{label}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date ? date : undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                    fromDate={fromDate}
                    toDate={toDate ?? undefined}
                />
            </PopoverContent>
        </Popover>
    );
}
