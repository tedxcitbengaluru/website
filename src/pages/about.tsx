import Image from 'next/image';
import { useSheetData } from '../context/SheetDataContext';
import Team from '@/components/Team';
export default function About() {
    const { data, error } = useSheetData();
    const heroText = data?.about[1][1]; // "TEDxCITBengaluru is an independently organized TED event..."
    const minutes = data?.about[1][2]; // "300"
    const speakers = data?.about[1][3]; // "30"
    const circles = data?.about[1][4]; // "12"
    const followers = data?.about[1][5]; // "850"
    return (
        <main className='py-24'>
            <div className="text-center text-3xl font-bold text-ted-off-white md:text-5xl">
                About Us
            </div>
            <div className="mx-auto my-6 h-[2px] w-[100px] bg-ted-off-white"></div>
            <div className="mb-16 text-center text-3xl font-bold text-ted-off-white md:text-5xl">
                Who we are
            </div>
            <div
                className={`relative mx-auto flex h-[calc(${3462 / 5198}*40vw)] w-[40vw] justify-center`}
            >
                <Image
                    src="/about/MG_0472.jpg"
                    width={5198}
                    height={3462}
                    alt="banner"
                    className="relative rounded-2xl border-4 border-ted-off-white md:rounded-[4rem]"
                    priority
                />
            </div>
            <div className="mt-8 px-16 text-justify text-xs font-semibold sm:text-sm md:px-32 md:text-lg lg:px-48">
                {heroText}
            </div>
            <div className="my-16 flex flex-col items-center gap-8 bg-ted-dark-gray py-8 md:my-24  md:py-16">
                <div className="mx-[30vw] text-center text-3xl font-bold leading-normal  text-ted-white-100 md:text-5xl">
                    Our Mission
                </div>
                <div className="flex w-[80%] flex-col gap-8">
                    {[
                        'To build a community of like-minded individuals who are eager to learn, share and grow.',
                        'To create a culture that can be carried forward and can continue inspiring the community.',
                        'To touch upon different aspects of life and society through our carefully crafted events. ',
                        'To create a culture that can be carried forward and can a continue inspiring the community.',
                        'To nurture and spread ideas on as large scale as possible.',
                        'To make every event, one worth remembering and looking up to.'
                    ].map((point, i) => (
                        <div
                            key={i}
                            className="flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-ted-white-100 py-8 px-8  text-xs font-semibold shadow-[2px_10px_60px_#e62b1e33] sm:text-xl md:gap-8 md:px-16 md:text-2xl"
                        >
                            <span className="text-xs text-ted-red-100 md:text-lg">X</span>
                            {point}
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-16 mx-auto grid w-[80vw] grid-cols-1 gap-y-8 rounded-3xl border-[1px] border-ted-red-100 py-16 px-8 shadow-[2px_10px_60px_#e62b1e33] sm:grid-cols-2 md:my-36 md:grid-cols-4">
                {[
                    { title: 'Minutes of talks', value: minutes },
                    { title: 'Speakers', value: speakers },
                    { title: 'Ted Circles', value: circles },
                    { title: 'Social followers', value: followers }
                ].map((item) => (
                    <div className="flex flex-col items-center gap-4" key={item.title}>
                        <div className="text-4xl font-bold text-ted-red-100 md:text-6xl">
                            {item.value}
                            <span className="text-ted-black-100">+</span>
                        </div>
                        <div className="text-lg font-semibold md:text-2xl">{item.title}</div>
                    </div>
                ))}
            </div>
            <Team/>
            <div className="flex w-screen flex-col bg-ted-dark-gray py-16 px-8 font-semibold text-ted-light-gray sm:px-16 md:px-24">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-3xl md:text-5xl">About TEDx</div>
                    <div className="mb-4 text-lg md:text-2xl">
                        x = indedpendently organized event
                    </div>
                    <div className="text-justify text-sm md:text-lg">
                        In the spirit of ideas worth spreading, TEDx is a program of local,
                        self-organized events that bring people together to share a TED-like
                        experience. At a TEDx event, TED Talks video and live speakers combine to
                        spark deep discussion and connection. These local, self-organized events are
                        branded TEDx, where x = independently organized TED event. The TED
                        Conference provides general guidance for the TEDx program, but individual
                        TEDx events are self-organized. (Subject to certain rules and regulations.)
                    </div>
                </div>
                <div className="mx-auto my-16 h-[1px] w-[50%] bg-ted-light-gray"></div>
                <div className="flex flex-col items-center gap-4">
                    <div className="text-3xl md:text-5xl">About TED</div>
                    <div className="text-justify text-sm md:text-lg">
                        TED is a nonprofit organization devoted to Ideas Worth Spreading. Started as
                        a four-day conference in California 30 years ago, TED has grown to support
                        its mission with multiple initiatives. The two annual TED Conferences invite
                        the world&apos;s leading thinkers and doers to speak for 18 minutes or less.
                        Many of these talks are then made available, free, at TED.com. TED speakers
                        have included Bill Gates, Jane Goodall, Elizabeth Gilbert, Sir Richard
                        Branson, Nandan Nilekani, Philippe Starck, Ngozi Okonjo-Iweala, Sal Khan and
                        Daniel Kahneman.The annual TED Conference takes place each spring in
                        Vancouver, British Columbia. TED&apos;s media initiatives include TED.com,
                        where new TED Talks are posted daily; TED Translators, which provides
                        subtitles and interactive transcripts as well as translations from
                        volunteers worldwide; the educational initiative TED-Ed. TED has established
                        The Audacious Project that takes a collaborative approach to funding ideas
                        with the potential to create change at thrilling scale; TEDx, which supports
                        individuals or groups in hosting local, self- organized TED-style events
                        around the world, and the TED Fellows program, helping world-changing
                        innovators from around the globe to amplify the impact of their remarkable
                        projects and activities.
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col items-center gap-8 bg-ted-black pt-20">
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
        </main>
    );
};