'use client';

import DetailsCard from '@/components/DetailsCard';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import data from '@/assets/airline.json';
import CustomSheet from '@/components/CustomSheet';
import Loading from './loading';
import { Suspense } from 'react';

const Page = () => {
    const flightData: IItinerary[] = data;
    const searchParams = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000)

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading/>}>

            <section className="py-10">
                <div className='container px-5'>
                    <div className='mb-4'>
                        <h2 className='text-grayish'>Showing {flightData.length} of 554 results</h2>
                    </div>
                    {flightData.map((info, index) => (
                        <div key={index} className='my-5 relative'>
                            <div className='absolute z-10 top-0 left-0 w-full h-full'>
                                <CustomSheet data={info} params={paramsObject} />
                            </div>
                            <div className=''>
                                <DetailsCard index={index} info={info} params={paramsObject} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Suspense>
    );
};

export default Page;
