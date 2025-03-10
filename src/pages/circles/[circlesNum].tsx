import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faClock, faLeftLong, faMapLocation, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { convertDate } from '@/utils/date';
import { useSheetData } from '../../context/SheetDataContext';

const transformEventData = (circles: any) => {
    return {
        ...circles,
        poster: `/circles/${circles[1]}.jpg`, // Assuming event[1] is the event name used in the image filename
        poster_width: 500, // Default width (adjust as needed)
        poster_height: 400, // Default height (adjust as needed)
    };
};

const CirclesInfo: React.FC = () => {
    const router = useRouter();
    const { circlesNum } = router.query;
    const { data, error } = useSheetData();

    if (router.isFallback) return <div>Loading...</div>;
    if (error) return <div>Error loading event data.</div>;
    if (!data) return <div>Loading...</div>;

    // Find the circle event by its index (first column)
    const circle = data.circles.find((e: any) => e[0] === circlesNum);

    if (!event) return <div>Event not found.</div>;

    const transformedCircle = transformEventData(circle);
    const date = convertDate(transformedCircle[3]);

    // Determine if the current event is the last one
    const currentIndex = data.circles.findIndex((e: any) => e[0] === circlesNum);
    const isLastEvent = currentIndex === data.circles.length - 1;

    return (
        <main className='pt-28'>
            <div className="text-center text-5xl font-bold text-ted-red">Overview</div>
            <div className="mx-auto my-6 h-[2px] w-[100px] bg-ted-off-white"></div>
            <div className="mb-16 text-center text-7xl font-bold text-ted-off-white">
                {transformedCircle[1]} {/* Circle Event Title */}
            </div>

            {/* Display the event image */}
            <div className="mb-8">
                <Image
                    src={transformedCircle.poster} 
                    alt={transformedCircle[1]}
                    width={transformedCircle.poster_width} 
                    height={transformedCircle.poster_height} 
                    className="mx-auto rounded-lg shadow-lg"
                />
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-x-16 gap-y-8 px-16 text-sm font-semibold text-ted-off-white sm:text-lg md:px-32 md:text-3xl">
                <div className="flex items-center gap-4 rounded-2xl border-2 border-ted-off-white px-8 py-4 shadow-[2px_10px_60px_#e62b1e33] duration-150 md:px-16">
                    <FontAwesomeIcon icon={faCalendarDay} style={{ width: '1em', height: '1em' }} />
                    {`${date.date} ${date.month} ${date.year}`}
                </div>
                <div className="flex items-center gap-4 rounded-2xl border-2 border-ted-off-white px-8 py-4 shadow-[2px_10px_60px_#e62b1e33] duration-150 md:px-16">
                    <FontAwesomeIcon icon={faClock} style={{ width: '1em', height: '1em' }} />
                    {`${date.hours % 12 || 12}:${date.minutes < 10 ? '0' : ''}${date.minutes} ${
                        date.hours >= 12 ? 'PM' : 'AM'
                    }`}
                </div>
                <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-ted-off-white px-8 py-4 text-center shadow-[2px_10px_60px_#e62b1e33] duration-150 sm:flex-row md:px-16">
                    <FontAwesomeIcon icon={faMapLocation} style={{ width: '1em', height: '1em' }} />
                    Cambridge Institute Of Technology, KR Puram, Bengaluru
                </div>
            </div>
            <div className="mt-16 flex w-screen flex-col items-center gap-8 bg-ted-dark-gray py-8 px-8 font-semibold text-ted-off-white md:gap-16 md:px-24 md:py-16">
                <div className="text-center text-3xl md:text-5xl">About the Session</div>
                <div className="text-justify text-sm md:text-lg">{transformedCircle[2]}</div>
            </div>
            <div className="bg-ted-black flex flex-row py-8 px-16 text-xs text-ted-off-white sm:text-sm md:text-xl">
                {parseInt(circlesNum as string) - 1 > 0 && (
                    <div className="mr-auto hover:underline">
                        <Link href={`/circles/${parseInt(circlesNum as string) - 1}`}>
                            <FontAwesomeIcon icon={faLeftLong} className="mr-4" />
                            Previous Event
                        </Link>
                    </div>
                )}
                {!isLastEvent && (
                    <div className="ml-auto hover:underline">
                        <Link href={`/circles/${parseInt(circlesNum as string) + 1}`}>
                            Next Event
                            <FontAwesomeIcon icon={faRightLong} className="ml-4" />
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CirclesInfo;
