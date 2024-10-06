'use client'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer";
import { getCityData } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { formatDate } from 'date-fns';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBox from './SearchBox';
import { Button } from './ui/button';

const DetailsHeader = () => {
    const searchParams = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());
    const depCity = getCityData(paramsObject.fromCity)
    const arrCity = getCityData(paramsObject.toCity)
    const depDate = paramsObject.departureDate
    const retDate = paramsObject.returnDate
    const router = useRouter()
    console.log(depCity);

    return (
        <div className='border-b py-5 border-lightBorder'>
            <div className="container">
                <div className="flex max-md:p-4 justify-between">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <div className='cursor-pointer border-2 border-borderLight md:rounded-[50px] rounded md:px-6 px-9 md:py-2 py-4 md:items-center flex md:gap-5 max-md:flex-col max-md:w-full '>
                                <div className='flex gap-2'>
                                    <p className='font-bold'>{depCity?.code}</p>
                                    <p className="md:max-w-[150px] tracking-wider text-[#787B80] overflow-hidden whitespace-nowrap text-ellipsis">{depCity?.name}</p>
                                </div>
                                <Separator className='w-[1px] hidden h-full md:block bg-[#E6E8EB]' />
                                <div className='flex gap-2'>
                                    <p className='font-bold'>{arrCity?.code}</p>
                                    <p className="md:max-w-[150px] tracking-wider text-[#787B80] overflow-hidden whitespace-nowrap text-ellipsis">
                                        {arrCity?.name}
                                    </p>
                                </div>
                                <Separator className='w-[1px] hidden h-full md:block bg-[#E6E8EB]' />
                                <div className='max-md:mb-3'>
                                    <p className='font-bold'>{formatDate(depDate, 'MMM dd')} - {formatDate(retDate, 'MMM dd')}</p>
                                </div>
                                <Separator className='w-[1px] hidden h-full md:block bg-[#e2e2e2]' />
                                <Button variant='ghost' className="md:w-8 md:h-8 rounded-full bg-[#E5EBEB] hover:bg-[#E5EBEB]/70 p-2">
                                    <Search width={18} height={18} />
                                </Button>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="!top-0 mt-0 py-5 !h-fit" data-vaul-drawer-direction="top">
                            <SearchBox classname="z-50" />
                        </DrawerContent>
                    </Drawer>
                    <Button onClick={()=>router.push('/')} variant='outline' className="border-2 rounded-[50%] p-2 h-[50px] w-[50px] ">
                        <X width={25} height={25} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DetailsHeader