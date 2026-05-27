import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Star } from "lucide-react";

const CARD_W = 395 + 16;

const reviews = [
    {
        mentorId: 1,
        mentorName: "Vedansh Dubey",
        mentorPhoto:
            "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/66e689b11a7f1.webp",
        mentorOrg: "Xavier Institute of Management (XIMB), Bhubaneswar",
        isTopMentor: true,
        reviewText:
            "I recently had the opportunity to attend a mentoring session with Vedansh, and it was extremely insightful and helpful.",
        menteeName: "Oktrido Asrialdi",
        menteePhoto:
            "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/33.png",
        stars: 5,
    },
    {
        mentorId: 3,
        mentorName: "Chirag Chaudhari",
        mentorPhoto:
            "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/63dd342995273.jpg",
        mentorOrg: "Edelweiss Life Insurance",
        isTopMentor: false,
        reviewText:
            "I recently attended an MBA CET preparation session, and it was definitely worth it.",
        menteeName: "Jayesh Vispute",
        menteePhoto:
            "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/2.png",
        stars: 5,
    },
    {
        mentorId: 4,
        mentorName: "Palak Gupta",
        mentorPhoto:
            "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65e2d4ade1037.webp",
        mentorOrg: "Accenture Strategy",
        isTopMentor: true,
        reviewText:
            "Palak is an amazing mentor! She really helped me with my interview prep.",
        menteeName: "Aparna Suresh",
        menteePhoto:
            "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/22.png",
        stars: 5,
    },
];

function ReviewCard({ review }) {
    return (
        <div className="flex-shrink-0 w-[395px] bg-[#f5f6f8] rounded-3xl border border-gray-200 p-5 shadow-sm ">
            <div className="flex items-start justify-between mb-9">
                <div className="flex items-center gap-3 min-w-0">
                    <img
                        src={review.mentorPhoto}
                        alt={review.mentorName}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                                {review.mentorName}
                            </h3>
                            {review.isTopMentor && (
                                <span className=" text-black text-xs px-1.5 py-0.5 rounded-md">
                                    🏆
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                            {review.mentorOrg}
                        </p>
                    </div>
                </div>
                <ArrowUpRight size={18} className="text-gray-400" />
            </div>

            <div className="bg-white p-4 rounded-3xl">
                <div className="flex justify-end mt-4">
                    {Array.from({ length: review.stars }).map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            className="fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 select-none">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {review.reviewText}
                    </p>
                </div>

                <div className="flex items-center justify-end gap-4 mt-5 select-none">
                    <span className="text-base font-semibold text-gray-800">
                        {review.menteeName}
                    </span>
                    <img
                        src={review.menteePhoto}
                        alt={review.menteeName}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default function MenteeReviews() {
    const containerRef = useRef(null);
    const [index, setIndex] = useState(0);

    const canScrollNext = () => {
        if (!containerRef.current) return false;

        const container = containerRef.current;
        const track = container.firstElementChild;

        if (!track) return false;

        const maxScroll = track.scrollWidth - container.clientWidth;

        return index * CARD_W < maxScroll;
    };

    const prev = () => {
        setIndex((i) => Math.max(0, i - 1));
    };

    const next = () => {
        if (canScrollNext()) {
            setIndex((i) => i + 1);
        }
    };

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        That's what mentees said!
                    </h2>
                </div>

                <div className="relative">

                    {index > 0 && (
                        <button
                            onClick={prev}
                            className="absolute -left-10 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-indigo-600 hover:text-white transition"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}

                    <div ref={containerRef} className="overflow-hidden">
                        <div
                            className="flex gap-4 transition-transform duration-300 ease-out"
                            style={{
                                transform: `translateX(-${index * CARD_W}px)`,
                            }}
                        >
                            {reviews.map((review, i) => (
                                <ReviewCard key={i} review={review} />
                            ))}
                        </div>
                    </div>

                    {canScrollNext() && (
                        <button
                            onClick={next}
                            className="absolute -right-10 translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-indigo-600 hover:text-white transition"
                        >
                            <ChevronRight size={18} />
                        </button>
                    )}

                </div>
            </div>
        </section>
    );
}