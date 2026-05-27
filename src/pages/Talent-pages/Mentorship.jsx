import CompanyCard from "../../components/Mentor-components/CompanyCard"
import Mentors from "../../components/Mentor-components/Mentors"
import MenteeReviews from "../../components/Mentor-components/ReviewCard"
import BrandsStats from "../../components/Mentor-components/BrandStats";
import ProCards from "../../components/Mentor-components/Procards"
import BecomeMentorCard from "../../components/Mentor-components/BecomeMentorCard";
import FAQSection from "../../components/Mentor-components/FAQSection"
import Footer from "../../components/Home-components/footer";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
    FaFileAlt,
    FaGraduationCap,
    FaTrophy,
    FaBriefcase,
    FaMicrophone,
    FaRocket,
    FaUserTie,
    FaGlobe,
    FaCode,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const categories = [
    { title: "CV Review", color: "blue", icon: <FaFileAlt /> },
    { title: "MBA Preparation", color: "purple", icon: <FaGraduationCap /> },
    { title: "Case Competition", color: "secondary", icon: <FaTrophy /> },
    { title: "Placement Support", color: "orange", icon: <FaBriefcase /> },
    { title: "Interview Preparation", color: "blue", icon: <FaMicrophone /> },
    { title: "Career Guidance", color: "purple", icon: <FaRocket /> },
    { title: "Personal Branding", color: "secondary", icon: <FaUserTie /> },
    { title: "Study Abroad", color: "orange", icon: <FaGlobe /> },
    { title: "Coding & Software", color: "blue", icon: <FaCode /> },
];

export default function MentorshipHero() {
    const trackRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const CARD_WIDTH = 146;
    const getMaxIndex = () => {
        const container = trackRef.current?.parentElement;
        if (!container) return 0;

        const visibleCards = Math.floor(
            container.clientWidth / CARD_WIDTH
        );

        return categories.length - visibleCards;
    };

    const updatePosition = () => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${currentIndex * CARD_WIDTH
                }px)`;
        }
    };

    useEffect(() => {
        updatePosition();
    }, [currentIndex]);

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const next = () => {
        const maxIndex = getMaxIndex();

        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    useEffect(() => {
        let startX = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (diff > 40 && currentIndex < maxIndex) setCurrentIndex((i) => i + 1);
            if (diff < -40 && currentIndex > 0) setCurrentIndex((i) => i - 1);
        };

        const track = trackRef.current;
        track.addEventListener("touchstart", handleTouchStart, { passive: true });
        track.addEventListener("touchend", handleTouchEnd);

        return () => {
            track.removeEventListener("touchstart", handleTouchStart);
            track.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentIndex]);

    const getColorClasses = (color) => {
        switch (color) {
            case "blue":
                return "bg-blue-100";
            case "purple":
                return "bg-purple-100";
            case "secondary":
                return "bg-green-100";
            case "orange":
                return "bg-orange-100";
            default:
                return "bg-blue-100";
        }
    };
    return (
        <section className="w-full flex  mx-auto   flex-col justify-center  ">

            <div className="w-full max-w-7xl m-auto">


                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10  md:px-5">

                    <div className="flex-1 flex flex-col gap-5 text-center md:text-left ">

                        <div className="inline-flex items-center gap-2 bg-[#ede9ff] text-[#6c47ff] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-[rgba(108,71,255,0.18)] w-fit mx-auto md:mx-0">
                            #BeUnstoppable
                        </div>

                        <h1 className="font-extrabold text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1a1a2e]">
                            1-on-1 Online <br />
                            <span className="bg-gradient-to-r from-[#6c47ff] to-[#ff6b35] bg-clip-text text-transparent">
                                Mentorship
                            </span>{" "}
                            in India
                        </h1>

                        <p className="text-gray-500 text-[1.05rem] max-w-xl mx-auto md:mx-0">
                            Get guidance from expert mentors and turn your career goals into reality.
                        </p>





                    </div>

                    <div className="relative group ">

                        <img
                            src="https://d8it4huxumps7.cloudfront.net/uploads/images/avif/Unlock_Guidance-home-page-header-image.png?d=898x773"
                            alt="Mentorship"
                            className="relative z-10 w-[260px] md:w-[320px] rounded-xl "
                        />
                    </div>

                </div>
            </div>
            <div className="py-8 max-w-7xl mx-auto">
                <div className="relative">

                    {currentIndex > 0 && (
                        <button
                            onClick={prev}
                            className="absolute -left-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-purple-200 shadow-md flex items-center justify-center transition cursor-pointer"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}

                    <div className="overflow-hidden rounded-xl">
                        <div
                            ref={trackRef}
                            className="flex gap-4 transition-transform duration-300 ease-out"
                        >
                            {categories.map((item, index) => (
                                <Link
                                    key={index}
                                    to="/mentorship"
                                    state={{ category: item.title }}
                                    className={`${getColorClasses(item.color)} min-w-[136px] min-h-[50px] rounded-2xl flex flex-col items-center justify-center gap-3 px-3 py-1 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-gray-200`}
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#00264d] text-lg">
                                        {item.icon}
                                    </div>
                                    <span className="text-[12px] font-bold text-[#00264d] text-center leading-snug">
                                        {item.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {currentIndex < getMaxIndex() && (
                        <button
                            onClick={next}
                            className="absolute -right-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-purple-200 shadow-md flex items-center justify-center transition cursor-pointer"
                        >
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
            <div>
                <CompanyCard />
            </div>
            <div>
                <Mentors />
            </div>
            <div>
                <MenteeReviews />
            </div>


            <div className="w-full pb-10">
                <div className="max-w-7xl mx-auto px-6">

                    <a
                        href="/unstop-masterclass"
                        target="_blank"
                        rel="noreferrer"
                        className="relative  overflow-hidden rounded-3xl bg-[#eaf1fb] px-10 flex  justify-between group"
                    >

                        <div className="absolute -left-20 top-0 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
                        <div className="absolute right-10 bottom-0 w-72 h-72 bg-indigo-200 rounded-full opacity-30 blur-2xl"></div>

                        <div className="relative z-10 max-w-3xl py-10 ">

                            <h2 className="text-5xl font-extrabold  text-black leading-tight">
                                Upskill with{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Masterclasses
                                </span>
                            </h2>

                            <p className="mt-2 text-gray-600 text-sm">
                                Webinars by the best in the industry!{" "}
                                <span className="text-blue-600 font-semibold group-hover:underline">
                                    Know more
                                </span>
                            </p>

                            <div className="mt-5 inline-flex items-center  gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-200">

                                <div className="flex -space-x-2">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/732/732228.png"
                                        className="w-6 h-6 rounded-full border border-white bg-white"
                                        alt=""
                                    />
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/270/270798.png"
                                        className="w-6 h-6 rounded-full border border-white bg-white"
                                        alt=""
                                    />
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
                                        className="w-6 h-6 rounded-full border border-white bg-white"
                                        alt=""
                                    />
                                </div>

                                <span className="text-sm font-medium text-gray-700">
                                    Speakers from Top Companies
                                </span>
                            </div>
                        </div>

                        <div className=" z-10   flex items-end">
                            <img
                                src="	https://d8it4huxumps7.cloudfront.net/uploads/images/68f8ac49f2fee_upsikill.png?d=592x276"
                                alt="Speakers"
                                className="h-42 object-contain "
                            />
                        </div>

                    </a>
                </div>
            </div>
            <div >
                <BrandsStats />
            </div>
            <div>
                <ProCards />
            </div>
            <div>
                <BecomeMentorCard />
            </div>
            <div>
                <FAQSection />
            </div>
            <div>
                <Footer />
            </div>

        </section>
    )
}