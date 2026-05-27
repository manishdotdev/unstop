import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { mentors as mentorsData } from "../../data/mentorsData";

const colorThemes = {
  green: {
    banner: "from-green-100 to-green-300",
    border: "border-green-600",
    btn: "border-green-600 text-green-700 hover:bg-green-50",
  },
  blue: {
    banner: "from-blue-100 to-blue-300",
    border: "border-blue-600",
    btn: "border-blue-600 text-blue-700 hover:bg-blue-50",
  },
  purple: {
    banner: "from-purple-100 to-purple-300",
    border: "border-purple-600",
    btn: "border-purple-600 text-purple-700 hover:bg-purple-50",
  },
  pink: {
    banner: "from-pink-100 to-pink-300",
    border: "border-pink-600",
    btn: "border-pink-600 text-pink-700 hover:bg-pink-50",
  },
};

const mentors = mentorsData.map((m, i) => ({
    id: m.id,
    name: m.name,
    rating: m.rating.toString(),
    reviews: m.reviews.toString(),
    description: m.experience.split("|")[0]?.trim() || m.about || "",
    photo: m.photo,
    isTop: m.isTopMentor,
    color: ["green", "blue", "purple", "pink"][i % 4],
  }));

const CARD_WIDTH = 305 + 16;

function MentorCard({ mentor }) {
  const theme = colorThemes[mentor.color];
  const navigate = useNavigate();
  return (
    <div
      className={`flex-shrink-0 w-[305px] bg-white rounded-2xl border-t-4 ${theme.border} shadow-sm overflow-hidden flex justify-center items-center flex-col `}
      style={{ minHeight: 300 }}
    >
      <div className={`h-14 bg-gradient-to-br ${theme.banner} w-full`} />

      <div className="px-3 pb-4 flex flex-col flex-1 -mt-8">
        <div className="relative w-fit mb-2">
          <img
            src={mentor.photo}
            alt={mentor.name}
            width={80}
            height={80}
            className="w-16 h-16 rounded-full border-2 border-white object-cover shadow"
          />
          {mentor.isTop && (
            <img
              src="https://d8it4huxumps7.cloudfront.net/uploads/images/avif/top_mentor_info_icon.png"
              alt="Top Mentor"
              width={30}
              height={30}
              className="absolute -bottom-1 -right-1 w-7 h-7"
            />
          )}
        </div>

        <div className="font-semibold text-sm text-gray-900 truncate leading-tight mb-1">
          {mentor.name}
        </div>

        <div className="flex items-center gap-1 mb-2">
          <img
            src="https://cdn.unstop.com/assets/icons/star.svg"
            alt="star"
            width={14}
            height={14}
            className="w-3.5 h-3.5"
          />
          <span className="text-xs text-gray-700">
            {mentor.rating}{" "}
            <strong className="font-semibold">({mentor.reviews} Reviews)</strong>
          </span>
        </div>

        <p className="text-xs text-gray-600 leading-snug line-clamp-2 flex-1 mb-3">
          {mentor.description}
        </p>

        <button
          onClick={() => navigate(`/mentordetail/${mentor.id}`)}
          className={`w-full border rounded-full py-1.5 text-xs font-semibold transition-colors duration-150 ${theme.btn}`}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}



export default function TopMentors() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const calculateMaxIndex = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const track = container.firstElementChild;

      if (!track) return;

      const maxScrollable =
        track.scrollWidth - container.clientWidth;

      const cardWidth = 305 + 16;

      const newMax = Math.ceil(maxScrollable / cardWidth);
      setMaxIndex(newMax > 0 ? newMax : 0);
    };

    calculateMaxIndex();
    window.addEventListener("resize", calculateMaxIndex);

    return () =>
      window.removeEventListener("resize", calculateMaxIndex);
  }, []);
  useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [maxIndex]);

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const next = () => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-7xl ">

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-12 bg-indigo-600 rounded-full mt-1"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Top Mentors
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-md">
                In search of excellence? Explore the highest-rated mentors as
                recognized by the learner community.
              </p>
            </div>
          </div>

          <Link
            to="/mentorship"
            className="flex items-center gap-1.5 px-4 py-1.5 border border-blue-300 rounded-full text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition whitespace-nowrap"
          >
            View All
            <span className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center">
              <ArrowRight size={10} className="text-white" />
            </span>
          </Link>
        </div>

        <div className="relative ">

          {index > 0 && (
            <button
              onClick={prev}
              className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition group"
            >
              <ChevronLeft size={16} className="text-gray-600 group-hover:text-white" />
            </button>
          )}

          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${index * CARD_WIDTH}px)`,
              }}
            >
              {mentors.map((mentor) => (
                <MentorCard key={mentor.name} mentor={mentor} />
              ))}
            </div>
          </div>

          {index < maxIndex && (
            <button
              onClick={next}
              className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition group"
            >
              <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}