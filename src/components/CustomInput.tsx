import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, LocateFixed } from "lucide-react";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface ICustomInput {
    data: IAirport[];
    placeholder?: string;
    className?: string;
    value: string | null;
    onChange: (value: string | null) => void;
}

const CustomInput = ({ data, placeholder, className, value, onChange }: ICustomInput) => {
    const [open, setOpen] = useState(false);

    // Find the selected data based on the value
    const selectedData = data.find((item) => item.code === value);

    return (
        <div
            className={cn(
                "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 hover:bg-slate-100 px-2",
                className
            )}
        >
            <LocateFixed className="h-[18px] w-[18px]" color="#C9CACC" />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between bg-transparent hover:bg-transparent overflow-hidden focus-visible:ring-0:border-0"

                    >
                        <p>
                            {selectedData ? (
                                <>
                                    <span className="font-bold">{selectedData.code}</span> <span className="font-[#787B80]"> {selectedData.name}</span>
                                </>
                            ) : (
                                placeholder
                            )}</p>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandInput placeholder={placeholder} />
                        <CommandList>
                            <CommandEmpty>No City found.</CommandEmpty>
                            <CommandGroup>
                                {data.map((d) => (
                                    <CommandItem
                                        key={d.code}
                                        value={d.code}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? null : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === d.code ? "opacity-100" : "hidden"
                                            )}
                                        />
                                        <p>
                                            <span className="font-bold">{d.code}</span> {d.city}, {d.country}
                                        </p>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export { CustomInput };
