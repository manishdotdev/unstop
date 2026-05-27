import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TrustedCarousel from "../../components/Home-components/TrustedCarousel"
import CompetitionCarousel from "../../components/Home-components/competition"
import InternshipsSection from "../../components/Home-components/internship"
import Footer from "../../components/Home-components/footer"
import {
    GraduationCap, Briefcase, Trophy, ClipboardList,
    Video, Users, BookOpen
} from "lucide-react"
const FloatingOrb = ({ className, style }) => (
    <div
        className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${className}`}
        style={style}
    />
)

const AnimatedWord = ({ word, delay, gradient }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return (
        <span
            className={`inline-block transition-all duration-200 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${gradient
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    : ""
                }`}
        >
            {word}&nbsp;
        </span>
    )
}
const Home = () => {
    const [showHero, setShowHero] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setShowHero(true), 200)
        return () => clearTimeout(t)
    }, [])
    const categories = [
        { title: "Internships",    icon: GraduationCap, link: "/internship",    desc: "27K+ roles" },
        { title: "Jobs",           icon: Briefcase,     link: "/jobs",          desc: "77K+ openings" },
        { title: "Competitions",   icon: Trophy,        link: "/competition",   desc: "Win prizes" },
        { title: "Mock Tests",     icon: ClipboardList, link: "/mocktest",      desc: "Practice now" },
        { title: "Mock Interviews",icon: Video,         link: "/mockinterview", desc: "AI-powered" },
        { title: "Mentorships",    icon: Users,         link: "/mentorship",    desc: "1-on-1 sessions" },
        { title: "Courses",        icon: BookOpen,      link: "/courses",       desc: "Learn & grow" },
    ]
    const [showSub, setShowSub] = useState(false)
    const [showBtns, setShowBtns] = useState(false)
    const [showCards, setShowCards] = useState(false)

    const line1 = ["Discover", "Opportunities", "That"]
    const line2 = ["Accelerate", "Your", "Career"]

    useEffect(() => {
        const t1 = setTimeout(() => setShowSub(true), 3000)
        const t2 = setTimeout(() => setShowBtns(true), 100)
        const t3 = setTimeout(() => setShowCards(true), 100)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [])
    return (
        <div className="bg-slate-50 w-full flex justify-center flex-col">
            <div className="max-w-7xl mx-auto w-full flex flex-col">
                <section className="mx-auto px-4 sm:px-6 py-2 w-full">
                    <div className="relative flex flex-col justify-evenly overflow-hidden w-full">

                        <section className="w-full py-8 sm:py-12">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                <div
                                    className={`flex flex-col items-center text-center gap-6 sm:gap-8
  transition-all duration-1000 ease-out
  ${showHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}
`}
                                >

                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 max-w-5xl leading-tight px-2">
                                        Discover Opportunities That
                                        <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                                            Accelerate Your Career
                                        </span>
                                    </h1>

                                    <div
                                        className={`flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4 sm:mt-6 w-full sm:w-auto px-4 sm:px-0 transition-all duration-700 ease-out ${showBtns ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                            }`}
                                    >
                                        <Link
                                            to="/internship"
                                            className="px-7 py-3 text-base sm:text-lg rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-indigo-300 hover:shadow-xl transition-all duration-300 text-center"
                                        >
                                            Explore Opportunities
                                        </Link>

                                        <Link
                                            to="/jobs"
                                            className="px-7 py-3 text-base sm:text-lg rounded-xl border border-slate-300 font-semibold hover:border-indigo-400 hover:text-indigo-500 hover:scale-105 transition-all duration-300 text-center"
                                        >
                                            Find Jobs
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </section>

                        {/* Category Cards */}
                        <section
                            className={`w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 transition-all duration-700 ease-out ${showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                }`}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                                {categories.map((item, index) => (
                                    <CategoryCard key={index} {...item} />
                                ))}
                            </div>
                        </section>

                    </div>
                </section>
            </div>

            {/* <FeaturedCarousel /> */}

            <TrustedCarousel />

            <CompetitionCarousel />

            <InternshipsSection />

            {/* <JobsSection /> */}

            {/* <CompanyMockTestsSection /> */}

            {/* <CompanyMockInterviewSection /> */}

            {/* <CodingSprintSection /> */}

            {/* <PromoSection /> */}

            {/* <OurNumbers /> */}

            <Footer />

        </div>
    )
}



function CategoryCard({ title, icon: Icon, link, desc }) {
    return (
        <Link
            to={link}
            className="group flex flex-col items-center gap-3 px-3 py-6 rounded-2xl
      bg-white border border-slate-200 shadow-sm
      hover:border-indigo-200 hover:shadow-md hover:-translate-y-1
      transition-all duration-200 text-center"
        >
            {/* Icon container — uses sidebar bg colour */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center
        bg-[#E5EFFA] border border-[#ccddf0]
        group-hover:bg-indigo-100 group-hover:border-indigo-200
        transition-all duration-200 flex-shrink-0">
                <Icon
                    size={26}
                    strokeWidth={1.6}
                    className="text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200"
                />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-semibold text-slate-800 group-hover:text-indigo-700 leading-snug transition-colors duration-200">
                    {title}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                    {desc}
                </p>
            </div>
        </Link>
    )
}



function SectionTitle({ title, subtitle }) {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-20 mb-8">

            <h2 className="text-2xl font-semibold text-slate-900">
                {title}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
                {subtitle}
            </p>

        </div>
    )
}


// const AnimatedWord = ({ word, delay, gradient }) => {
//     const [visible, setVisible] = useState(false)

//     useEffect(() => {
//         const t = setTimeout(() => setVisible(true), delay)
//         return () => clearTimeout(t)
//     }, [delay])

//     return (
//         <span
//             className={`inline-block transition-all duration-200 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//                 } ${gradient
//                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
//                     : ""
//                 }`}
//         >
//             {word}&nbsp;
//         </span>
//     )
// }
export default Home