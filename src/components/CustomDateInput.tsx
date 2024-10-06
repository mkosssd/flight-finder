"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export function CustomDateInput({ label, onChange, fromDate, toDate, value }: { label: string, onChange: (val: Date | null) => void, fromDate?: Date, toDate?: Date, value?: Date}) {
    const [date, setDate] = React.useState<Date>()
    
    const handleDateSelect = (selectedDate: Date | undefined) => {
        const newDate = selectedDate ?? null;
        onChange(newDate);
        setDate(selectedDate)
    };

    if(value && date && value > date ) {
        setDate(undefined)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[180px]  justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" width={18} height={18} color="#C9CACC" />
                    {date ? format(date, "MMM dd, yyyy") : <span>{label}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    fromDate={fromDate}
                    toDate={toDate ?? undefined}
                />
            </PopoverContent>
        </Popover>
    )
}
