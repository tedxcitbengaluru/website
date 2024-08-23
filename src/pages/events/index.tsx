import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { convertDate } from '@/utils/date';
import { useSheetData } from '../../context/SheetDataContext';

const transformEventsData = (events: any[]) => {
    return events.map((event) => ({
        ...event,
        poster: `/events/${event[1]}.jpg`, // Assuming event[1] contains the event name
    }));
};

const transformCirclesData = (circles: any[]) => {
    return circles.map((circle) => ({
        ...circle,
        poster: `/circles/${circle[1]}.jpg`, // Assuming circle[1] contains the circle name
    }));
};

const Events: React.FC = () => {
    const [pageType, setPageType] = useState('events');
    const { data, error } = useSheetData();

    if (error) {
        return <div>Error loading data.</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    // Ignore the first row for both events and circles
    const eventsWithoutHeader = data.events.slice(1);
    const circlesWithoutHeader = data.circles.slice(1);

    const transformedEvents = transformEventsData(eventsWithoutHeader);
    const transformedCircles = transformCirclesData(circlesWithoutHeader);

    const filteredEvents = transformedEvents.filter((event) => event[4] !== "TRUE");
    const sortedEvents = filteredEvents.sort((a: any, b: any) => b[0] - a[0]);

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

            {/* Selection Buttons */}
            <div className="my-20 flex flex-col flex-wrap items-center justify-center gap-8 sm:flex-row md:gap-32 lg:gap-48">
                <button
                    onClick={() => setPageType('events')}
                    style={pageType === 'events' ? { borderColor: '#e62b1e', color: 'gray' } : undefined}
                    className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-16 py-4 text-lg font-semibold text-ted-black-200 shadow-[2px_10px_60px_#e62b1e33] duration-150 hover:border-ted-red-100 hover:text-ted-red-100 sm:text-2xl"
                >
                    TEDx Events
                </button>
                <button
                    onClick={() => setPageType('circles')}
                    style={pageType === 'circles' ? { borderColor: '#e62b1e', color: 'gray' } : undefined}
                    className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-16 py-4 text-lg font-semibold text-ted-black-200 shadow-[2px_10px_60px_#e62b1e33] duration-150 hover:border-ted-red-100 hover:text-ted-red-100 sm:text-2xl"
                >
                    TEDx Circles
                </button>
            </div>

            {/* Content Section */}
            {pageType === 'events' ? (
                <div className="flex flex-col items-center gap-16 sm:gap-32 md:gap-48">
                    {sortedEvents.map((event: any, i: number) => {
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
            ) : (
                <div className="relative mb-24 flex w-screen flex-row flex-wrap justify-center gap-x-16 gap-y-32 px-16 py-16 text-lg font-semibold text-ted-off-white">
                    {transformedCircles.map((circle, i) => (
                        <div key={i} className="relative flex flex-col items-center">
                            <div className="relative h-[380px] w-[306px] overflow-clip rounded-3xl border-4 border-ted-light-gray">
                                <Image
                                    src={circle.poster}
                                    fill
                                    alt={circle[1]}
                                />
                            </div>
                            <div className="absolute bottom-[-2rem] z-10 rounded-2xl bg-ted-red py-2 px-16 hover:underline">
                                <Link href={`/circles/${circle[0]}`}>Know More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
