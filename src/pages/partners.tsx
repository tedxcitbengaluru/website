import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSheetData } from '../context/SheetDataContext';

const transformPartnersData = (data: any[]) => {    
    const partnersStructure: any = {};

    data.slice(1).forEach(([name, category]) => {
        if (!partnersStructure[category]) {
            partnersStructure[category] = {
                category_title: category,
                brands: []
            };
        }

        partnersStructure[category].brands.push({
            name,
            logo: `/partners/${name}.jpg`,
            logo_width: 200, // Assuming a default width
            logo_height: 200 // Assuming a default height
        });
    });

    return partnersStructure;
};

export default function Partners() {
    const { data, error } = useSheetData();
    const [transformedData, setTransformedData] = useState<any>(null);

    useEffect(() => {
        if (data?.sponsors) {
            const structuredData = transformPartnersData(data.sponsors);
            setTransformedData(structuredData);
        }
    }, [data]);

    if (error) return <div>Error loading partners data.</div>;
    if (!data || !transformedData) return <div>Loading...</div>;

    const sortedOrder = Object.keys(transformedData).sort((a: string, b: string) => parseInt(a) - parseInt(b));

    return (
        <main className="py-24 px-8">
            {sortedOrder?.map((order) => (
                <div key={order} className="my-16 text-center text-5xl font-bold text-ted-red-100">
                    {transformedData[order]?.category_title}
                    <div className="mx-16 mt-8 flex flex-wrap items-center justify-center gap-16">
                        {transformedData[order]?.brands?.map((brand: any, idx: number) => (
                            <div className="relative flex w-[200px] flex-col" key={idx}>
                                <Image
                                    src={brand.logo}
                                    width={brand.logo_width}
                                    height={brand.logo_height}
                                    alt={brand.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
