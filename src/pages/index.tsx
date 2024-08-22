import { useMediaQuery } from '@mui/material';
import { useSheetData } from '../context/SheetDataContext';
import { convertDate } from '@/utils/date';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faArrowTrendUp,
    faLightbulb,
    faCertificate
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const { data, error } = useSheetData();
  const isMobile = useMediaQuery('(max-width:900px)');

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
    <div className="overflow-x-hidden bg-[#121212] text-[#E0E0E0]">
      <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
        <img
          src={isMobile ? "/slideshow/Aether_Banner_Mobile.png" : "/slideshow/Aether_Banner.png"}
          alt="Banner slide"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {error ? (
        <p className="text-[#E62B1E]">Error loading data. Please try again later.</p>
      ) : (
        homeData && (
          <div>
            <div className="flex w-full flex-col items-center justify-between gap-16 bg-[#1E1E1E] px-16 py-48 lg:flex-row lg:items-start lg:gap-48 xl:px-48">
              <div className="flex flex-col items-center gap-16 lg:items-start">
                <div className="text-center text-5xl font-semibold text-[#E0E0E0]">
                  {homeData[1]}
                </div>
                <div className="text-justify text-lg text-[#B0B0B0]">{homeData[3]}</div>
                <Link href="/ticket">
                  <div className="rounded-2xl border-2 border-[#E0E0E0] bg-[#E62B1E] px-8 py-4 text-center text-2xl font-semibold text-[#E0E0E0] hover:bg-[#BF1F1F]">
                    Register Now!
                  </div>
                </Link>
              </div>
              <div className="text-center text-5xl font-bold text-[#E0E0E0]">
                <div className="text-[15rem]">{date.date}</div>
                <div>{date.month}</div>
                <div>{date.year}</div>
              </div>
            </div>

            <div className=" flex flex-col items-center gap-8 bg-[#121212] py-24">
              <div className="mx-[30vw] text-center text-3xl mb-5 font-bold leading-normal text-[#E62B1E] sm:text-5xl">
                Why should you attend TEDxCITBengaluru?
              </div>
              <div className="flex w-[80%] flex-col gap-8">
                {[
                  'We believe a TEDx Talk is a journey, With the Idea being the destination.',
                  'We find the most unique, thought-provoking and impactful ideas within our local community and provide a platform for it to spread far and wide.',
                  'Connect with like-minded individuals and build your network.',
                  'Watch mesmerizing performances by our Entertainers that leave you spell-bound.'
                ].map((point, i) => {
                  return (
                    <div
                      key={i}
                      className="flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-[#2D2D2D] text-[#E0E0E0] py-8 px-8 text-sm font-semibold shadow-[1px_5px_30px_rgba(255,43,30,0.3)] sm:text-xl md:gap-8 md:px-16 md:text-2xl"
                    >
                      <span className="text-xs text-[#E62B1E] md:text-lg">X</span>
                      {point}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What Do You Gain Section */}
            <div className=" flex flex-col items-center bg-[#1E1E1E] py-24">
              <div className="mx-[30vw] text-center text-3xl  mb-5 font-bold leading-normal text-[#E62B1E] sm:text-5xl">
                What do you gain out of TEDxCITBengaluru?
              </div>
              <div className="grid grid-cols-1 gap-12 py-8 md:grid-cols-2 pb-24">
                {[
                  {
                    title: 'Certificate',
                    subtitle: 'A Certificate for you to be proud of.',
                    icon: faCertificate
                  },
                  {
                    title: 'Memorabilia',
                    subtitle: 'Memorabilia for you to cherish.',
                    icon: faHeart
                  },
                  {
                    title: 'Experience',
                    subtitle: 'An Experience for you to learn from.',
                    icon: faArrowTrendUp
                  },
                  {
                    title: 'Ideas',
                    subtitle: 'And of course, Ideas for you to reflect on.',
                    icon: faLightbulb
                  }
                ].map((card, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center rounded-2xl bg-[#2D2D2D] py-8 px-4 shadow-[2px_10px_40px_rgba(255,43,30,0.3)]"
                    >
                      <div className="flex flex-row items-center justify-center gap-4 text-2xl font-bold text-[#E62B1E] lg:text-3xl">
                        <FontAwesomeIcon
                          style={{ width: '1em', height: '1em' }}
                          icon={card.icon}
                        />
                        {card.title}
                      </div>
                      <div className="my-2 h-[1px] w-[15%] bg-[#E62B1E]"></div>
                      <div className="text-md font-semibold text-[#E0E0E0] lg:text-lg ">
                        {card.subtitle}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex w-full flex-col items-center gap-8 bg-[#E62B1E] py-24">
                <div className="text-lg font-semibold text-[#E0E0E0] md:text-2xl">
                  What are you waiting for?
                </div>
                <div className="mx-16 text-center text-2xl font-bold leading-loose text-[#E0E0E0] md:text-3xl lg:mx-64">
                  Be a part of the upcoming event at TEDxCITBengaluru
                </div>
                <Link href="/ticket">
                  <div className="rounded-2xl border-2 border-[#E0E0E0] bg-[#E0E0E0] px-8 py-4 text-center text-2xl font-semibold text-[#121212] hover:bg-[#121212] hover:text-[#E0E0E0]">
                    Register Now!
                  </div>
                </Link>
              </div>
              <div  className="flex w-full flex-col items-center gap-8 bg-ted-black py-20">
                <h1 className="text-4xl mb-4 text-center text-ted-off-white"> Get in touch with us</h1>
              <div id="social-media-footer">
          <ul>
            <li>
              <a href="https://www.instagram.com/tedxcitbengaluru/">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/tedxcitbengaluru/">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="mailto:tedxcitbengaluru@cambridge.edu.in/">
                <i className="fa fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
            </div>
          </div>
          </div>
        )
      )}
    </div>
  );
}
