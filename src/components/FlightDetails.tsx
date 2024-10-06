import { cn, getAirlineLogo } from '@/lib/utils'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const FlightDetails = ({ data, date, isLast, isLayover }: { data: IFlight, date: string, isLast?: boolean, isLayover?: boolean }) => {
    return (
        <li className={cn("relative flex-1 after:content-[''] after:w-0.5 after:h-full  after:border-black after:border-l after:inline-block after:absolute after:top-6 after:left-[6.5px]", isLast ? 'after:hidden' : '', isLayover ? 'after:border-dashed' : '')}>
            <div className="flex w-full">
                <span
                    className="w-3.5 mt-1 h-3.5 aspect-square  border-2 border-black rounded-full flex justify-center items-center mr-3 text-sm text-white ">
                </span>
                <div className="block w-full">
                    <h2 className='text-sm mb-1 text-start'>{date} • {data.departure} </h2>
                    <div className='flex w-full justify-between'>
                        <h2 className="font-bold text-[16px] text-slate-900  mb-2">{data.departureCityCode} • {data.departureAirport}</h2>
                        <div className='flex px-10  gap-3'>
                            <div className='border border-borderLight flex items-center rounded-sm w-[40px] h-[40px]'>
                                <Image alt={data.airline} width={40} height={40} src={getAirlineLogo(data.airline)} className='object-contain'></Image>
                            </div>
                            <div className='text-[13px] text-black/90'>
                                <p>{data.airline} • {data.flightNumber} </p>
                                <p>Economy • A330 </p>
                                <p>Flight time {data.duration} </p>
                            </div>
                        </div>
                    </div>
                    {isLayover && (
                        <div className='p-6 flex gap-2 items-center'>
                            <Clock width={18} /> <p className='text-[16px]'>Layover 2h 45m</p>
                        </div>
                    )}

                </div>
            </div>
        </li>
    )
}

export default FlightDetails
