import React from 'react'
import FlightData from './FlightData'
import { Button } from './ui/button';
// import CustomSheet from './CustomSheet';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailsCard = ({ info, params, index }: { info: IItinerary, params: any, index: number }) => {

    return (
        <div className='py-2 border rounded-[7px] border-lightBorder'>
            <div className="grid md:grid-cols-[4fr_1fr]">

                <div className='flex flex-col w-full px-3'>
                    {info.flights.map((i, childIndex) =>
                        <FlightData index={index} key={childIndex} childIndex={childIndex} params={params} data={i} />
                    )}
                </div>
                <div className='md:border-l max-md:border-t py-2 border-lightBorder px-4 flex flex-col justify-end items-stretch'>
                    <p className='text-xs text-grayish mb-0.5'>from</p>
                    <p className='text-[20px] mb-2'>{info.price}</p>
                    <Button className='bg-themeBtn hover:bg-themeBtn/90'>
                        Select
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DetailsCard