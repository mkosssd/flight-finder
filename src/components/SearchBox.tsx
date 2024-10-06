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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchBox = ({ classname, params,closeDrawer }: { classname?: string, params?: any, closeDrawer?:any }) => {
    const navigator = useRouter();
    const { toast } = useToast();
    
    const [fromCity, setFromCity] = useState<string | null>(params?.fromCity || null);
    const [toCity, setToCity] = useState<string | null>(params?.toCity || null);
    const [departureDate, setDepartureDate] = useState<Date | null>(
        params?.departureDate ? new Date(params.departureDate) : null
    );
    const [returnDate, setReturnDate] = useState<Date | null>(
        params?.returnDate ? new Date(params.returnDate) : null
    );
    
    const handleInterchange = () => {
        setFromCity(toCity);
        setToCity(fromCity);
    };

    const handleChange = (selectedDate: Date | null) => {
        if (!selectedDate) return;
        setDepartureDate(selectedDate);
        setReturnDate(null);
    };

    const searchButtonHandler = () => {
        if (!fromCity) {
            toast({
                title: "Missing Departure City.",
                description: "Please select a departure city.",
                action: <ToastAction altText="Try again">Okay</ToastAction>,
                variant: 'destructive'
            });
            return;
        }

        if (!toCity) {
            toast({
                title: "Missing Arrival City.",
                description: "Please select an arrival city.",
                action: <ToastAction altText="Try again">Okay</ToastAction>,
                variant: 'destructive'
            });
            return;
        }

        if (!departureDate) {
            toast({
                title: "Missing Departure Date.",
                description: "Please select a departure date.",
                action: <ToastAction altText="Try again">Okay</ToastAction>,
                variant: 'destructive'
            });
            return;
        }

        if (!returnDate) {
            toast({
                title: "Missing Return Date.",
                description: "Please select a return date.",
                action: <ToastAction altText="Try again">Okay</ToastAction>,
                variant: 'destructive'
            });
            return;
        }

        const formattedDepartureDate = departureDate.toISOString().split('T')[0];
        const formattedReturnDate = returnDate.toISOString().split('T')[0];

            
        const query = new URLSearchParams({
            fromCity: fromCity,
            toCity: toCity,
            departureDate: formattedDepartureDate,
            returnDate: formattedReturnDate
        }).toString();

        navigator.push(`/search?${query}`);
        //to simulate loading
        window.location.reload()
        if(closeDrawer) closeDrawer(false)

    };

    return (
        <div className={cn("mx-auto ", classname)}>
            <div>
                <h2 className="font-bold text-xl mb-6">Flights</h2>
            </div>
            <div>
                <div className="grid max-lg:place-items-center lg:grid-cols-[1fr_auto_1fr_auto_auto] items-center gap-4 mb-9">
                    <CustomInput
                        data={airports.filter(e => e.code !== toCity)}
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
                        data={airports.filter(e => e.code !== fromCity)}
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
                            value={departureDate}
                        />
                    </div>
                    <div className="col-span-1">
                        <CustomDateInput
                            label="Return"
                            fromDate={departureDate ?? new Date()}
                            value={returnDate}
                            onChange={(date) => setReturnDate(date)}
                        />
                    </div>
                </div>
                <div className="text-end">
                    <Button onClick={searchButtonHandler} className="px-9 py-6 bg-themeBtn w-[250px] hover:bg-themeBtn/90">
                        <Search className="mr-2 h-4 w-4" /> Search flights
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
