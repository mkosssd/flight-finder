import SearchBox from '@/components/SearchBox'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Flight Finder',
    description: 'Find Flights'
}

const Home = () => {
	const username = 'Brian'
	return (
		<section className="min-h-screen font-neue_montreal py-24">
			<div className="container ">
				<div className="flex flex-col items-center max-md:px-5">

					<div className="header mb-6">
						<h1 className='text-[36px] '>Good afternoon, {username || 'Guest'}</h1>
					</div>
					<SearchBox classname='shadow-xl py-12 px-20 border border-lightBorder rounded-[12px]' />
				</div>
			</div>

		</section>
	)
}

export default Home
