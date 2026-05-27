import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { mockInterviews } from "../../data/mockInterviewsData"
import {
  Clock,
  Video,
  Users,
  Bookmark,
  Share2,
  Zap,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Award,
  Target,
  ClipboardList,
  Copy,
  X,
  BarChart3,
  Calendar,
  MessageSquare,
} from "lucide-react"

const skillColors = [
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-indigo-50 text-indigo-700 border-indigo-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
]

function ContentCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-[15px] font-black text-slate-900" style={{ letterSpacing: "-0.01em" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

export default function MockInterviewDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const interview = mockInterviews.find(i => i.id === parseInt(id)) || mockInterviews[0]

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const features = [
    "Real-time AI feedback on your responses",
    "Performance analytics and improvement suggestions",
    "Industry-standard questions from top companies",
    "Practice with over 50+ interview scenarios",
    "Recording and playback for self-assessment",
  ]

  const interviewRounds = [
    { name: "Introduction & Background", questions: 5, time: 5 },
    { name: "Technical Questions", questions: 8, time: 15 },
    { name: "Problem Solving", questions: 5, time: 10 },
    { name: "Behavioral Round", questions: 5, time: 8 },
    { name: "Questions for Interviewer", questions: 2, time: 2 },
  ]

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
          <button onClick={() => navigate("/mockinterview")} className="hover:text-indigo-600 transition-colors">Mock Interviews</button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-semibold truncate max-w-[200px]">{interview.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Back button */}
        <button
          onClick={() => navigate("/mockinterview")}
          className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors w-fit"
        >
          <ArrowLeft size={15} /> Back to Mock Interviews
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className={`h-1.5 bg-gradient-to-r ${interview.color}`} />
          <div className="p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              {/* Logo + Title */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm p-2">
                  <img src={interview.companyLogo} alt={interview.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-[22px] sm:text-[24px] font-black text-slate-900 leading-tight" style={{ letterSpacing: "-0.025em" }}>
                    {interview.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[14px] font-bold text-indigo-600">{interview.company}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                      <Video size={12} className="text-slate-400" />{interview.format}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
                  {interview.difficulty}
                </span>
                {interview.featured && (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                    <Zap size={11} /> Featured
                  </span>
                )}
              </div>
            </div>

            {/* Meta Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 pt-5 border-t border-slate-100">
              {[
                { icon: <Clock size={13} />, label: "Duration", value: interview.duration, color: "text-violet-500" },
                { icon: <ClipboardList size={13} />, label: "Format", value: interview.format, color: "text-blue-500" },
                { icon: <BarChart3 size={13} />, label: "Avg. Rating", value: `⭐ ${interview.avgRating}`, color: "text-amber-500" },
                { icon: <Users size={13} />, label: "Attempts", value: interview.attempts.toLocaleString(), color: "text-emerald-500" },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className={`flex items-center gap-1 ${m.color}`}>
                    {m.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{m.label}</span>
                  </div>
                  <p className="text-[13px] font-bold text-slate-800">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <ContentCard title="About this interview" icon={<Video size={15} className="text-indigo-500" />}>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                {interview.description}
              </p>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                This AI-powered mock interview simulates real interview scenarios with top companies. 
                Get instant feedback on your answers, body language, and communication skills.
              </p>
            </ContentCard>

            <ContentCard title="Interview Structure" icon={<Target size={15} className="text-emerald-500" />}>
              <div className="flex flex-col gap-3">
                {interviewRounds.map((round, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">{round.name}</p>
                      <p className="text-[11px] text-slate-500">{round.questions} questions</p>
                    </div>
                    <div className="text-[12px] font-semibold text-slate-600 bg-white px-3 py-1 rounded-full">
                      {round.time} mins
                    </div>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Skills Covered" icon={<Award size={15} className="text-violet-500" />}>
              <div className="flex flex-wrap gap-2">
                {interview.skills.map((s, i) => (
                  <span key={i} className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${skillColors[i % skillColors.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="What you'll get" icon={<CheckCircle2 size={15} className="text-blue-500" />}>
              <div className="flex flex-col gap-2.5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-emerald-600">✓</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-snug font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Preparation Tips" icon={<MessageSquare size={15} className="text-amber-500" />}>
              <div className="flex flex-col gap-3">
                {[
                  "Research the company thoroughly before the interview",
                  "Practice answering common behavioral questions",
                  "Prepare examples that demonstrate your skills",
                  "Test your camera and microphone setup in advance",
                  "Dress professionally and choose a quiet, well-lit environment",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-amber-600">{i + 1}</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-snug">{tip}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            {/* Bottom Action */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold text-slate-800">Ready to practice?</p>
                <p className="text-[12px] text-slate-400 mt-0.5">No prerequisites required</p>
              </div>
              <button
                onClick={() => setRegistered(true)}
                className={`flex items-center gap-2 text-[14px] font-bold px-7 py-3 rounded-2xl transition-all shadow-sm ${registered ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}
              >
                {registered ? "✓ Started" : "Start Interview"}
              </button>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="hidden lg:flex flex-col gap-4 w-[268px] flex-shrink-0 sticky top-6">
            {/* Take Interview CTA */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${interview.color}`} />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-2xl">
                  <Zap size={13} className="text-amber-500 flex-shrink-0" />
                  <p className="text-[12px] font-bold text-amber-700">AI-powered feedback</p>
                </div>
                <button
                  onClick={() => setRegistered(true)}
                  className={`w-full text-[14px] font-bold py-3 rounded-2xl transition-all shadow-sm ${registered ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"}`}
                >
                  {registered ? "✓ Started" : "Start Interview"}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSaved(s => !s)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[12px] font-semibold transition-all ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500"}`}
                  >
                    <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <div className="relative flex-1">
                    <button
                      onClick={() => setShareOpen(s => !s)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 text-[12px] font-semibold transition-all"
                    >
                      <Share2 size={13} /> Share
                    </button>
                    {shareOpen && (
                      <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl z-30 overflow-hidden w-48">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                          <span className="text-[12px] font-bold text-slate-700">Share via</span>
                          <button onClick={() => setShareOpen(false)}><X size={13} className="text-slate-400" /></button>
                        </div>
                        {["WhatsApp", "LinkedIn", "Twitter / X"].map((label, i) => (
                          <button key={i} className="w-full text-left px-4 py-2.5 text-[12px] font-semibold hover:bg-slate-50 transition-colors text-slate-700">
                            {label}
                          </button>
                        ))}
                        <button onClick={handleCopy} className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 border-t border-slate-100">
                          <Copy size={12} /> {copied ? "Copied!" : "Copy link"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Info</p>
              <div className="flex flex-col gap-3.5">
                {[
                  { icon: <Clock size={13} />, label: "Duration", value: interview.duration, color: "text-blue-400" },
                  { icon: <ClipboardList size={13} />, label: "Format", value: interview.format, color: "text-violet-400" },
                  { icon: <BarChart3 size={13} />, label: "Rating", value: interview.avgRating, color: "text-amber-400" },
                  { icon: <Users size={13} />, label: "Attempts", value: interview.attempts.toLocaleString(), color: "text-emerald-400" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className={`flex items-center gap-1.5 ${row.color} flex-shrink-0`}>
                      {row.icon}
                      <span className="text-[11px] font-semibold text-slate-400">{row.label}</span>
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {interview.skills.map((s, i) => (
                  <span key={i} className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${skillColors[i % skillColors.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800 truncate">{interview.title}</p>
          <p className="text-[11px] text-slate-400">{interview.duration} · {interview.format}</p>
        </div>
        <button
          onClick={() => setSaved(s => !s)}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-[12px] font-semibold transition-all flex-shrink-0 ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500"}`}
        >
          <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
        <button
          onClick={() => setRegistered(true)}
          className={`text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex-shrink-0 ${registered ? "bg-emerald-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
        >
          {registered ? "✓ Started" : "Start"}
        </button>
      </div>
    </div>
  )
}