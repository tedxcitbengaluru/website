import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { convertDate } from '@/utils/date';
import { useSheetData } from '../../context/SheetDataContext';

const transformEventsData = (events: any[]) => {
    return events.map((event) => {
        return {
            ...event,
            poster: `/events/${event[1]}.jpg`, // Assuming event[1] contains the event name
        };
    });
};

const Events: React.FC = () => {
    const { data, error } = useSheetData();

    if (error) {
        return <div>Error loading events.</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    // Ignore the first row
    const eventsWithoutHeader = data.events.slice(1);

    const transformedEvents = transformEventsData(eventsWithoutHeader);

    return (
        <div className="mt-32 mb-16 flex w-screen flex-col items-center text-sm font-semibold text-ted-off-white sm:text-lg md:mb-24 md:text-2xl">
            {/* Text Section */}
            <div className="text-center mb-8 sm:mb-16">
                <div className="text-3xl font-bold text-ted-red md:text-5xl">
                    Our Events
                </div>
                <div className="text-lg font-bold text-ted-black-100 md:text-2xl mt-4">
                    Discover amazing events organized at{' '}
                    <span className="text-ted-red">TED</span>
                    xCITBengaluru
                </div>
            </div>

            {/* Events List */}
            <div className="flex flex-col items-center gap-16 sm:gap-32 md:gap-48">
                {transformedEvents
                    .sort((a: any, b: any) => b[0] - a[0])
                    .map((event: any, i: number) => {
                        if (event[4] === "TRUE") return null;

                        const date = convertDate(event[2]);

                        return (
                            <div key={i} className="relative flex flex-col items-center">
                                <div className="absolute top-[-1rem] z-10 rounded-lg bg-ted-red px-4 py-2 sm:px-8 md:top-[-2rem] md:rounded-2xl md:px-16 md:py-4">
                                    {`${date.date} ${date.month} ${date.year}`}
                                </div>
                                <div className="relative h-[calc(510/1047*60vw)] w-[60vw] overflow-clip rounded-3xl border-4 border-ted-light-gray">
                                    <Image
                                        src={event.poster}
                                        fill
                                        alt={event[1]}
                                    />
                                </div>

                                <div className="absolute bottom-[-1rem] z-10 rounded-lg bg-ted-red py-2 px-4 hover:underline sm:px-8 md:bottom-[-2rem] md:rounded-2xl md:py-4 md:px-16">
                                    <Link href={`/events/${event[0]}`}>Know More</Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Events;
