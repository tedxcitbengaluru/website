import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSheetData } from '../context/SheetDataContext';

const transformSpeakersData = (data: any[]) => {
    const speakersStructure: any = {};

    data.slice(1).forEach(([event, name, about, instagram, linkedin, title]) => {
        if (!speakersStructure[event]) {
            speakersStructure[event] = {
                event_title: event,
                people: []
            };
        }

        speakersStructure[event].people.push({
            name,
            about,
            instagram,
            linkedin,
            title,
            photo: `/speakers/${name}.jpg` 
        });
    });

    return speakersStructure;
};

export default function Speakers() {
    const { data, error } = useSheetData();
    const [transformedData, setTransformedData] = useState<any>(null);

    useEffect(() => {
        if (data?.speakersAndPerformers) {
            const structuredData = transformSpeakersData(data.speakersAndPerformers);
            setTransformedData(structuredData);
        }
    }, [data]);

    if (error) return <div>Error loading speakers data.</div>;
    if (!data || !transformedData) return <div>Loading...</div>;

    const sortedOrder = Object.keys(transformedData).sort((a: string, b: string) => parseInt(b) - parseInt(a));

    return (
        <main className="py-24 px-8">
            <div className="mt-8 text-center text-3xl font-bold text-ted-red md:text-5xl">
                Our Speakers & Performers
            </div>
            <div className="mt-8 text-center font-semibold text-ted-black-100 selection:text-lg md:text-2xl">
                Discover the amazing speakers & performers behind previous{' '}
                <span className="text-ted-red">TED</span>xCITBengaluru
            </div>
            {sortedOrder.map((order) => (
                <div key={order} className="mb-32 text-center text-5xl font-bold">
                    <div className="my-16">
                        <span className="text-ted-red">
                            {transformedData[order].event_title}
                        </span>{' '}
                        Event
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-16 px-8 md:px-32">
                        {transformedData[order].people.map((person: any) => (
                            <div key={person.name} className="relative flex flex-col items-center">
                                <div className="relative h-[200px] w-[200px] overflow-clip rounded-[3rem] border-4 border-ted-red-100 md:h-[300px] md:w-[300px]">
                                    <Image
                                        src={person.photo}
                                        fill
                                        alt={person.name}
                                        className=""
                                    />
                                </div>
                                <div className="mt-4 text-xl font-semibold text-ted-off-white md:text-3xl">
                                    {person.name}
                                </div>
                                <div className="text-sm font-semibold text-ted-red md:text-xl">
                                    {person.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
