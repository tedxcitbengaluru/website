"use client";

import Image from "next/image";
import { useSheetData } from '../context/SheetDataContext';
import { convertDate } from '@/utils/date';

export default function Home(): JSX.Element {
  const { data, error } = useSheetData();
  const homeData = data?.home as string[] | undefined;

  // Initialize date as undefined
  const date = homeData && homeData[2] ? convertDate(homeData[2]) : {
    year: '',
    month: '',
    date: '',
    day: '',
    hours: '',
    minutes: ''
  };

  return (
    <div className="bg-white text-white">
      <div className="relative">
        {/* Image with grayscale class */}
        <div className="relative">
          <Image
            className="grayscale object-cover backdrop-blur-sm"
            src="/images/mountains.png"
            alt="Mountains"
            width={1920}
            height={1080}
            priority
          />
          <Image
            className="absolute left-0 top-16 w-1/3 h-auto object-contain"
            src="/images/birds.png"
            alt="Birds"
            width={1920}
            height={1080}
          />
        </div>
        {/* Gradient for blending the bottom of the image */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-[#1f1f1f] opacity-90"></div>
      </div>
      {/* Section below with smooth gradient transition */}
      <div className="bg-[#1f1f1f]">
        <div className="container pt-20 pb-20 text-left">
          <h1 className="text-8xl font-bold leading-tight">
            <span className="text-[#EB0028]">EMPOWERING</span>
            <span className="text-[#9D9D9D]"> MINDS TO</span>
          </h1>
          <h1 className="text-8xl font-bold leading-tight">
            <span className="text-[#EB0028]"> SHAPE</span>
            <span className="text-[#9D9D9D]"> TOMORROW</span>
          </h1>
        </div>
      </div>
      <div>
        {/* Check for errors or loading state */}
        {error ? (
          <p className="text-[#E62B1E]">Error loading data. Please try again later.</p>
        ) : (
          homeData && (
            <>
              {/* Intro Section */}
              <div className="bg-[#1f1f1f] pl-10 intro m-auto text-white grid grid-cols-2 items-center gap-10">
                <div className="info text-left p-10">
                  <h1 className="text-7xl font-bold p-2">
                    <span className="text-[#9D9D9D]">WHO</span>
                    <span className="text-[#EB0028]"> WE</span>
                    <span className="text-[#9D9D9D]"> ARE?</span>
                  </h1>
                  <div className="bg-red-700 w-2/4 rounded-lg h-1 mb-4"></div>
                  <p className="text-lg mt-4 text-[#F5F5F5]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quidem repellat mollitia necessitatibus, laboriosam nam nostrum ducimus sint libero exercitationem. Consequuntur distinctio a dolore vitae accusantium vel pariatur asperiores illum, fuga, nulla quis, nisi fugiat! Quisquam, quidem. Quisquam, quidem.
                  </p>
                  <div className="points flex flex-row mt-4">
                    <div className="bg-[#EB0028] w-1 rounded-lg h-8"></div>
                    <p className="mx-2 text-lg">We believe a TEDx Talk is a journey with the idea being the destination.</p>
                  </div>
                  <div className="points flex flex-row mt-4">
                    <div className="bg-[#EB0028] w-2 rounded-lg h-14"></div>
                    <p className="mx-2 text-lg">
                      We find the most unique, thought-provoking and impactful ideas within our local community and provide a platform for it to spread far and wide.
                    </p>
                  </div>
                  <div className="points flex flex-row mt-4">
                    <div className="bg-[#EB0028] w-1 rounded-lg h-8"></div>
                    <p className="mx-2 text-lg">We connect with like-minded individuals and build your network.</p>
                  </div>
                </div>

                <div className="relative flex justify-end">
                  <Image
                    className="object-cover"
                    src="/images/x factor.png"
                    alt="X"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>

              {/* Next Event Section */}
              <div className="bg-[#1f1f1f] next-event grid grid-cols-2 items-center gap-10 m-auto">
                <div className="relative flex justify-center img">
                  <Image
                    className="object-cover rounded-lg"
                    src="/events/Aether.jpg"
                    alt="Next Event"
                    width={600}
                    height={400}
                  />
                </div>

                <div className="info text-left p-10">
                  <h1 className="text-6xl font-extrabold p-2">
                    <span className="text-[#9D9D9D]">OUR</span>
                    <span className="text-[#EB0028]"> NEXT</span>
                    <span className="text-[#9D9D9D]"> EVENT</span>
                  </h1>
                  <div className="bg-[#EB0028] w-1/2 rounded-lg h-1 mb-4"></div>
                  <p className="text-lg mt-4">
                    {homeData[3]}
                  </p>
                  <div className="flex space-x-4 mt-6">
                    <button className="bg-[#EB0028] text-white rounded-xl px-6 py-3 text-lg hover:bg-[#9D9D9D] transition duration-300">
                      Join Us
                    </button>
                    <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl text-lg hover:bg-white hover:text-red-700 transition duration-300">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* What You Get Section */}
              <div className="bg-[#1f1f1f] text-left p-10">
                <h1 className="text-6xl font-extrabold p-2">
                  <span className="text-[#9D9D9D]">WHAT</span>
                  <span className="text-[#EB0028]"> YOU</span>
                  <span className="text-[#9D9D9D]"> GET FROM US?</span>
                </h1>
                <div className="bg-[#EB0028] w-1/2 rounded-lg h-1 mb-4"></div>
              </div>

              <div className="bg-[#1f1f1f] grid grid-cols-2 p-10 gap-10 m-auto">
                <div className="points flex flex-row items-center mt-4">
                  <div className="bg-[#EB0028] w-1 rounded-lg h-14"></div>
                  <p className="mx-2 text-lg">Watch mesmerizing performances by our Entertainers that leave you spell bound.</p>
                </div>
                <div className="points flex flex-row mt-4">
                  <div className="bg-[#EB0028] w-1 rounded-lg h-8"></div>
                  <p className="mx-2 text-lg">An experience for you to learn from.</p>
                </div>
                <div className="points flex flex-row mt-4">
                  <div className="bg-[#EB0028] w-1 rounded-lg h-8"></div>
                  <p className="mx-2 text-lg">A certificate for you to be proud of.</p>
                </div>
                <div className="points flex flex-row mt-4">
                  <div className="bg-[#EB0028] w-1 rounded-lg h-8"></div>
                  <p className="mx-2 text-lg">And of course, Ideas for you to reflect on.</p>
                </div>
                <div className="points flex flex-row mt-4">
                  <div className="bg-[#EB0028] w-1 rounded-lg h-8"></div>
                  <p className="mx-2 text-lg">Memorabilia for you to cherish.</p>
                </div>
              </div>
              <div className="bg-[#1f1f1f] relative w-full h-auto m-auto p-10 ">
                <div className="relative z-10 mx-8">
                  <div>
                    <h2 className="text-[#1f1f1f] text-[64px] font-bold">Be a part of our</h2>
                    <h2 className="text-[#1f1f1f] text-[64px] font-bold">upcoming event at</h2>
                    <h2 className="text-[#1f1f1f] text-[64px] font-bold">TEDxCITBengaluru</h2>
                  </div>
                  <div className="pt-10">
                    <button className="bg-[#1f1f1f] text-[#9e9395] rounded-xl px-6 py-3 text-lg hover:bg-white hover:text-black transition duration-300">
                      Register Now!
                    </button>
                  </div>
                </div>
                {/* Replace SVG with an image from the public folder */}
                <div className="absolute bottom-0 left-0 w-full">
                  <Image
                    src="/images/footer design.png"  
                    alt="Event Banner"
                    layout="responsive" 
                    width={1440}  
                    height={320}  
                  />
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
