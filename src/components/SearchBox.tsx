'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { CustomDateInput } from './CustomDateInput';
import { ArrowLeftRight, ArrowUpDown, Search } from 'lucide-react';
import { CustomInput } from './CustomInput';
import airports from "@/assets/cities.json";
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';

const SearchBox = ({ classname }: { classname?: string }) => {
    const navigator = useRouter()
    const { toast } = useToast()


    const [fromCity, setFromCity] = useState<string | null>(null);
    const [toCity, setToCity] = useState<string | null>(null);
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    const handleInterchange = () => {
        setFromCity(toCity);
        setToCity(fromCity);
    };


    const handleChange = (selectedDate: Date | null) => {
        if (!selectedDate) return
        setDepartureDate(selectedDate)
        setReturnDate(null)
    }

    const searchButtonHandler = () => {

        if (!fromCity || !toCity || !departureDate || !returnDate) {
            toast({
                title: "Invalid Details.",
                description: "Please fill all the details.",
                action: <ToastAction altText="Try again">Okay</ToastAction>,
                variant: 'destructive'
            })

            return
        }

        const formattedDepartureDate = departureDate.toISOString().split('T')[0];
        const formattedReturnDate = returnDate.toISOString().split('T')[0];

        const query = new URLSearchParams({
            fromCity: fromCity,
            toCity,
            departureDate: formattedDepartureDate,
            returnDate: formattedReturnDate
        }).toString();

        navigator.push(`/search?${query}`)
    }

    return (
        <div className={cn("mx-auto ", classname)}>
            <div>
                <h2 className="font-bold text-xl mb-6">Flights</h2>
            </div>
            <div>
                <div className="grid  max-lg:place-items-center lg:grid-cols-[1fr_auto_1fr_auto_auto]  gap-4 mb-9 ">

                    <CustomInput
                        data={airports.filter(e => e.code != toCity)}
                        placeholder="Where from?"
                        className="col-span-1"
                        value={fromCity}
                        onChange={setFromCity}
                    />

                    <Button variant="ghost" onClick={handleInterchange} className="w-min rounded-[50%] bg-slate-100 hover:bg-slate-200 p-2">
                        <ArrowLeftRight className="h-5 w-5 md:block hidden" />
                        <ArrowUpDown className="h-5 w-5 block md:hidden" />
                    </Button>

                    <CustomInput
                        data={airports.filter(e => e.code != fromCity)}
                        placeholder="Where to?"
                        className="col-span-1"
                        value={toCity}
                        onChange={setToCity}

                    />

                    <div className="col-span-1">
                        <CustomDateInput
                            label="Departure"
                            onChange={handleChange}
                            fromDate={new Date()}
                        />
                    </div>
                    <div className="col-span-1">
                        <CustomDateInput
                            label="Return"
                            fromDate={departureDate ?? new Date()}
                            value={departureDate ?? undefined}
                            onChange={(date) => setReturnDate(date)}
                        />
                    </div>
                </div>
                <div className='text-end'>
                    <Button onClick={searchButtonHandler} className='px-9 bg-themeBtn w-[250px] hover:bg-themeBtn/90 ' >
                        <Search className="mr-2 h-4 w-4" /> Search flights
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
