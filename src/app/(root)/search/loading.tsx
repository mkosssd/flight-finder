'use client';
import { CustomSkeleton } from '@/components/CustomSkeleton';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [loadingState, setLoadingState] = useState({
        searching: true,
        rules: true,
        results: true
    });

    useEffect(() => {
        const timers = [
            setTimeout(() => {
                setLoadingState(prevState => ({
                    ...prevState,
                    searching: false
                }));
            }, 2000),
            setTimeout(() => {
                setLoadingState(prevState => ({
                    ...prevState,
                    rules: false
                }));
            }, 3000),
            setTimeout(() => {
                setLoadingState(prevState => ({
                    ...prevState,
                    results: false
                }));
            }, 4000),
        ];

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    return (
        <div className='overflow-hidden'>
            <div className="relative h-[4px] rounded-full bg-gray-300">
                <div className="absolute top-0 left-0 h-full rounded-full bg-slate-500 animate-moving"></div>
            </div>
            <div className='w-full h-screen'>
                <div className="container h-full">
                    <div className="relative flex justify-evenly flex-wrap gap-8">
                        {Array.from({ length: 36 }, (_, index) => (
                            <CustomSkeleton key={index} />
                        ))}
                    </div>
                    <div className='absolute top-0 left-0 h-full w-full'>
                        <div className='flex items-center justify-center h-full'>
                            <div className='shadow-lg p-4 w-[323px] h-[300px] bg-white flex flex-col items-center justify-center gap-5'>
                                <div>
                                    <Image
                                        width={100}
                                        height={100}
                                        src='https://s3-alpha-sig.figma.com/img/df34/ff5d/de2e13b8b13ef90316e36338415b882b?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gf5vcD9rdcm2adRpOJP3gAjZdFw4t~nDk35aMPorNTirD6B6qGn4pQi1JbReocuqq~cxodGvgarRJAqSKVzdPvbZ0Gyv0mqiHHHJv~tpYoZFF-6NghBwV2j2pm3pgUrXDX-pAMCdybJneNFMyGh6rc4b0WuRxmPOYb1xwpjZtlNbcR4tUe3~0kr-qGqBrab0RTcQdcfhpY16~48jsZyfHNrKppbIOVS3uuCP56JxjeadzaL9X4m2sQkb0-fmozexqp6FxJLkxHRQGc877BVL6ltt~fNDX5w1DYb~HNrx4gEtmQEYKL-aay2uVWzMRKvcJXvHFiga99BawWL493xM9g__'
                                        alt='Flying'
                                    />
                                </div>
                                <div>
                                    <p className={cn(' flex items-center gap-2 mb-4', loadingState.searching ? 'text-[#C9CACC]' : 'text-[#787B80]')}>
                                        {loadingState.searching ? <Loader /> : <CircleCheck width={15} height={15} color='green' />} Searching 400+ flights
                                    </p>
                                    <p className={cn('text-[#] flex items-center gap-2 mb-4', loadingState.rules ? 'text-[#C9CACC]' : 'text-[#787B80]')}>
                                        {loadingState.rules ? <Loader /> : <CircleCheck width={15} height={15} color='green' />} Attaching company rules
                                    </p>
                                    <p className={cn('text-[#] flex items-center gap-2 mb-4', loadingState.results ? 'text-[#C9CACC]' : 'text-[#787B80]')}>
                                        {loadingState.results ? <Loader /> : <CircleCheck width={15} height={15} color='green' />} Serving best results
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
