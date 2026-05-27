import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mentors, mentorReviews, sessionTypes } from "../../data/mentorsData";
import {
  MapPin, Clock, Star, Bookmark, Share2, ChevronLeft, ChevronRight, ArrowRight,
  Calendar, Award, Languages, Users, MessageCircle, CheckCircle2,
  BookOpen, Briefcase, GraduationCap, Globe, Code, FileText
} from "lucide-react";

const skillColors = [
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-indigo-50 text-indigo-700 border-indigo-100",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
];

function DetailSection({ icon, title, children }) {
  const Icon = icon;
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          <Icon size={15} className="text-indigo-500" />
        </div>
        <h2 className="text-[15px] font-black text-slate-900" style={{ letterSpacing: "-0.01em" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default function MentorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [bookmarkedSession, setBookmarkedSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(sessionTypes[0]);

  const mentor = mentors.find(m => m.id === parseInt(id)) || mentors[0];
  const reviews = mentorReviews.filter(r => r.mentorId === mentor.id);

  const handleBookSession = () => {
    alert(`Booking ${selectedSession.title} with ${mentor.name}`);
  };

  return (
    <div
      className="min-h-screen pb-20 lg:pb-0"
      style={{
        background: "linear-gradient(135deg, #dce8f8 0%, #eef1fb 60%, #dde8f5 100%)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-slate-400 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-indigo-600 transition-colors">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate("/mentorship")} className="hover:text-indigo-600 transition-colors">Mentorship</button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-semibold truncate max-w-[200px]">{mentor.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Back button */}
        <button
          onClick={() => navigate("/mentorship")}
          className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors w-fit"
        >
          <ChevronLeft size={15} /> Back to Mentors
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400" />
          <div className="p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              {/* Mentor Info */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 p-2 shadow-sm">
                  <img src={mentor.photo} alt={mentor.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <h1 className="text-[24px] sm:text-[26px] font-black text-slate-900 leading-tight" style={{ letterSpacing: "-0.025em" }}>
                    {mentor.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[14px] font-bold text-indigo-600">{mentor.title}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[14px] text-slate-600">{mentor.company}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-[14px] font-semibold text-slate-900">{mentor.rating}</span>
                      <span className="text-[13px] text-slate-500">({mentor.reviews} reviews)</span>
                    </div>
                    {mentor.isTopMentor && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <Award size={12} /> Top Mentor
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-all ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300"}`}
                >
                  <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 transition-all">
                  <MessageCircle size={14} /> Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <DetailSection icon={Briefcase} title="About">
              <p className="text-[14px] text-slate-600 leading-relaxed">{mentor.about || mentor.experience}</p>
            </DetailSection>

            <DetailSection icon={Award} title="Skills & Expertise">
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((s, i) => (
                  <span key={i} className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${skillColors[i % skillColors.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </DetailSection>

            <DetailSection icon={GraduationCap} title="Domains">
              <div className="flex flex-wrap gap-2">
                {mentor.domains.map((d, i) => (
                  <span key={i} className="px-3 py-1.5 text-[12px] font-semibold rounded-xl border bg-slate-50 text-slate-600 border-slate-200">
                    {d}
                  </span>
                ))}
              </div>
            </DetailSection>

            <DetailSection icon={Calendar} title="Availability">
              <p className="text-[13px] text-slate-600">{mentor.availability || "Weekdays: 6-9 PM, Weekends: Flexible"}</p>
            </DetailSection>

            <DetailSection icon={Languages} title="Languages">
              <div className="flex flex-wrap gap-2">
                {mentor.languages?.map((lang, i) => (
                  <span key={i} className="px-3 py-1 text-[12px] font-medium rounded-full bg-slate-100 text-slate-600">
                    {lang}
                  </span>
                )) || <span className="text-[13px] text-slate-600">English, Hindi</span>}
              </div>
            </DetailSection>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <Star size={15} className="text-indigo-500" />
                </div>
                <h2 className="text-[15px] font-black text-slate-900">Reviews ({reviews.length})</h2>
              </div>
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <img src={review.menteePhoto} alt={review.menteeName} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-800 text-[13px]">{review.menteeName}</p>
                            <span className="text-[11px] text-slate-500">{review.date}</span>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} size={12} className={idx < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{review.review}</p>
                        <span className="inline-block mt-2 text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{review.sessionType}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <p className="text-[13px] text-slate-500 text-center py-4">No reviews yet. Be the first to book a session!</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="hidden lg:flex flex-col gap-4 w-[300px] flex-shrink-0 sticky top-6">
            {/* Book Session Card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Book a Session</p>
                
                {sessionTypes.map((session, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedSession(session)}
                    className={`p-3 rounded-2xl border mb-3 cursor-pointer transition-all ${selectedSession.title === session.title ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300"}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{session.title}</p>
                        <p className="text-[11px] text-slate-500">{session.duration}</p>
                      </div>
                      <span className="font-bold text-indigo-600 text-[14px]">{session.price}</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleBookSession}
                  className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[14px] py-3 rounded-2xl transition-all shadow-sm shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Book Now <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Stats</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500">Response Rate</span>
                  <span className="text-[13px] font-bold text-slate-800">{mentor.responseRate || "95%"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500">Sessions</span>
                  <span className="text-[13px] font-bold text-slate-800">{mentor.reviews * 2}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500">Experience</span>
                  <span className="text-[13px] font-bold text-slate-800">{mentor.experience.split("|")[0]?.trim()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Book Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800">From {selectedSession.price}</p>
          <p className="text-[11px] text-slate-400">{selectedSession.title}</p>
        </div>
        <button
          onClick={handleBookSession}
          className="text-[13px] font-bold px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}