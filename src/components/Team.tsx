import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSheetData } from '../context/SheetDataContext';

const transformTeamData = (data: any[]) => {
    const teamStructure: any = {};

    data.slice(1).forEach(([event, name, category, title, about]) => {
        if (!teamStructure[event]) {
            teamStructure[event] = {
                event_title: event,
                team: {}
            };
        }

        if (!teamStructure[event].team[category]) {
            teamStructure[event].team[category] = {
                category_title: category || "Others",
                people: []
            };
        }

        teamStructure[event].team[category].people.push({
            name,
            title,
            about,
            photo: `/team/${name}.jpg` 
        });
    });

    return teamStructure;
};

const Team: React.FC = () => {
    const { data, error } = useSheetData();
    const [transformedData, setTransformedData] = useState<any>(null);
    const [selectedKey, setSelectedKey] = useState<string>('');

    useEffect(() => {
        if (data?.team) {
            const structuredData = transformTeamData(data.team);
            setTransformedData(structuredData);
            setSelectedKey(Object.keys(structuredData)[0]); // Select the first event by default
        }
    }, [data]);

    if (error) return <div>Error loading team data.</div>;
    if (!data || !transformedData) return <div>Loading...</div>;

    const sortedKeys = Object.keys(transformedData).sort();

    return (
        <>
            <div className="my-16 text-center text-3xl font-bold text-ted-red-100 md:text-5xl">
                Meet our Core Team
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-16">
                {sortedKeys.map((key, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedKey(key)}
                        style={
                            selectedKey === key
                                ? { borderColor: '#e62b1e', color: 'gray' }
                                : undefined
                        }
                        className="rounded-2xl border-2 border-ted-white-100 bg-ted-dark-gray px-16 py-4 text-lg font-semibold text-ted-black-200 shadow-[2px_10px_60px_#e62b1e33] duration-150 hover:border-ted-red-100 hover:text-ted-red-100 md:text-2xl"
                    >
                        {transformedData[key].event_title}
                    </button>
                ))}
            </div>
            {(() => {
                const eventTeam = transformedData[selectedKey]?.team;
                const sortedCategoryKeys = Object.keys(eventTeam).sort();

                return (
                    <>
                        {sortedCategoryKeys.map((cat) => (
                            <div key={cat}>
                                <div className="my-16 text-center text-3xl font-bold text-ted-black-100 md:text-5xl">
                                    {eventTeam[cat].category_title}
                                </div>
                                <div className="relative mx-auto flex w-[80vw] flex-row flex-wrap justify-evenly gap-16">
                                    {eventTeam[cat].people.map((person: any, i: number) => (
                                        <div key={i} className="relative flex flex-col items-center">
                                            <div className="relative h-[200px] w-[200px] overflow-clip rounded-[3rem] border-4 border-ted-red-100 md:h-[300px] md:w-[300px]">
                                                <Image
                                                    src={person.photo}
                                                    fill
                                                    alt={person.name}
                                                    className=""
                                                />
                                            </div>
                                            <div className="mt-4 text-xl font-semibold text-ted-black-100 md:text-3xl">
                                                {person.name}
                                            </div>
                                            <div className="text-sm font-semibold text-ted-red-100 md:text-xl">
                                                {person.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mx-auto mt-16 h-[1px] w-[50%] bg-ted-red-200"></div>
                            </div>
                        ))}
                    </>
                );
            })()}
        </>
    );
};

export default Team;
