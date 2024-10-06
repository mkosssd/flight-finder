"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { formatDate } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import FlightDetails from './FlightDetails';

const CustomSheet = ({ data, params }: { data: IItinerary, params: any }) => {
    console.log(data);
    const departureData = data.flights[0]
    const arrivalData = data.flights[1]
    const departureDate = formatDate(new Date(params.departureDate), 'EEE dd MMMM')
    const returnDate = formatDate(new Date(params.returnDate), 'EEE dd MMMM')
    return (
        <Sheet>
            <SheetTrigger className='w-full h-full'></SheetTrigger>
            <SheetContent className="md:w-[700px] w-full !max-w-none px-8 ">
                <SheetClose><ArrowLeft width={17} /></SheetClose>
                <SheetHeader className="border-b border-bordeLight py-4 mb-8">
                    <SheetTitle className="text-xl">Flight Details</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    <div>
                        <ul className=" overflow-hidden space-y-8 ">
                            <FlightDetails data={departureData} date={departureDate} />
                            <FlightDetails isLayover data={arrivalData} date={departureDate} />
                            <FlightDetails data={arrivalData} date={returnDate} />
                            <FlightDetails isLast data={departureData} date={returnDate} />
                        </ul>
                    </div>

                </SheetDescription>
            </SheetContent>
        </Sheet>

    )
}

export default CustomSheet