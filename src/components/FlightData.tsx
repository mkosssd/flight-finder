import Image from 'next/image';
import React from 'react';
import { formatDate } from 'date-fns';
import { getAirlineLogo } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlightData = ({ data, params, index, childIndex }: { data: IFlight, params: any, index: number, childIndex: number }) => {

    return (
        <div className='my-3'>
            <div className='mx-3 mb-2'>
                {index >= 1 && <p className='text-grayish text-[13px]'>{formatDate(new Date(childIndex > 0 ? params.returnDate : params.departureDate), 'EEE dd MMM')}</p>}
                {/* Hiding date at first index as hidden in figma design */}
            </div>
            <div className='flex flex-row w-full items-center '>
                <div className='mx-3  border border-lightBorder rounded-sm w-[45px] h-[45px] flex items-center'>
                    <Image alt={data.airline} src={getAirlineLogo(data.airline)} width={45} height={45} className='object-cover' />
                </div>
                <div className='grid grid-cols-[2fr_1fr_1fr] w-full items-start gap-2'>
                    <div className=''>
                        <p className='text-xs text-grayish mb-0.5'>{data.airline} • {data.flightNumber}</p>
                        <p className='text-[18px] flex gap-1'>{data.arrival} - {data.departure} {childIndex == 1 && <span className='text-[#962828F9] text-[12px]'>+1 day</span>}</p>
                    </div>
                    <div className=''>
                        <p className='text-xs text-grayish mb-0.5'>{data.route}</p>
                        <p className='text-[18px]'>{data.duration}</p>
                    </div>
                    <div className='flex flex-col h-full'>
                        <p className='flex-grow text-xs text-grayish mb-0.5'>{data.additionalInfo}</p>
                        <p className='text-[18px]'>{data.stops}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FlightData;
