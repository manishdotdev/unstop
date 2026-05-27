import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Clock, Users, Bookmark, Share2, Trophy,
  CheckCircle2, Award, Zap, ChevronRight, ArrowLeft,
  ExternalLink, Copy, X, Star, Sparkles, Building2, Calendar
} from "lucide-react";

const competitionsData = [
  {
    id: 1,
    title: "Industrial AI Summit 2026 - Startup Challenge",
    company: "IIM Mumbai",
    location: "Online",
    duration: "1 - 4 Members",
    prize: "₹50,000 Prize Pool",
    rating: 4.8,
    match: 92,
    skills: ["AI", "Supply Chain", "Innovation", "Business Strategy", "Presentation"],
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/699dea7e1a656_SCIE__IIM_Mumbai_IIMM_Standard_1.png",
    posted: "2 days ago",
    trending: true,
    type: "Competition",
    registrationDeadline: "30 Jun 2026",
    eventDate: "15 Jul 2026",
    openings: "500+ registrations",
    about: "The Industrial AI Summit 2026 Startup Challenge invites student teams to develop AI-driven solutions for real-world supply chain and industrial problems. Present your idea to a panel of industry experts and IIM faculty.",
    rounds: [
      "Round 1 — Idea Submission (online): Submit a 2-page concept note",
      "Round 2 — Shortlisted teams present a 10-minute pitch deck",
      "Grand Finale — Top 10 teams present live at IIM Mumbai campus",
    ],
    eligibility: [
      "Open to undergraduate and postgraduate students across India",
      "Teams of 1 to 4 members",
      "At least one team member must be currently enrolled",
      "No prior startup experience required",
    ],
    prizes: ["₹30,000 — 1st Place", "₹15,000 — 2nd Place", "₹5,000 — 3rd Place", "Certificates for all finalists"],
    perks: ["IIM Mumbai Certificate", "Mentorship sessions", "Networking with industry leaders", "PPT feedback from judges"],
    aboutOrg: "IIM Mumbai (Indian Institute of Management Mumbai) is one of India's premier management institutions, known for its rigorous academic programs and industry connections.",
    activity: ["Hosting since 2022", "12 competitions organised"],
  },
  {
    id: 2,
    title: "National Hackathon 2026",
    company: "Google Developers",
    location: "Online",
    duration: "1 - 3 Members",
    prize: "₹1,00,000 Prize Pool",
    rating: 4.9,
    match: 95,
    skills: ["React", "Cloud", "AI", "Node.js", "Firebase"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    posted: "1 day ago",
    trending: true,
    type: "Hackathon",
    registrationDeadline: "25 Jun 2026",
    eventDate: "5–6 Jul 2026",
    openings: "1000+ registrations",
    about: "Google Developers' National Hackathon 2026 is a 48-hour online hackathon where teams build innovative solutions using Google Cloud, Firebase, and AI/ML tools. Open to all college students across India.",
    rounds: [
      "Registration & Team Formation",
      "48-hour Build Sprint — build and deploy your project",
      "Project Submission with demo video and GitHub link",
      "Top 20 teams present to Google engineers",
    ],
    eligibility: [
      "Open to all college students (UG/PG)",
      "Teams of 1 to 3 members",
      "Must use at least one Google technology",
      "Project must be built during the hackathon window",
    ],
    prizes: ["₹60,000 — 1st Place", "₹30,000 — 2nd Place", "₹10,000 — 3rd Place", "Google swag for all finalists"],
    perks: ["Google Developer certificate", "Cloud credits worth ₹50,000", "Fast-track interview opportunity", "Mentorship from Googlers"],
    aboutOrg: "Google Developers is Google's global program for developers, offering tools, resources, and community events to help build with Google technologies.",
    activity: ["Hosting since 2019", "8 hackathons organised"],
  },
  {
    id: 3,
    title: "Design Sprint Challenge 2026",
    company: "Adobe",
    location: "Hybrid",
    duration: "1 - 2 Members",
    prize: "₹25,000 Prize Pool",
    rating: 4.6,
    match: 80,
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Adobe XD"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
    posted: "3 days ago",
    trending: false,
    type: "Competition",
    registrationDeadline: "20 Jun 2026",
    eventDate: "10 Jul 2026",
    openings: "300+ registrations",
    about: "Adobe's Design Sprint Challenge invites student designers to solve a real UX problem in 72 hours. Participants will receive a design brief and must submit a fully prototyped solution using Figma or Adobe XD.",
    rounds: [
      "Brief Release — design problem shared with all registered teams",
      "72-hour Design Sprint — research, wireframe, and prototype",
      "Submission — Figma/XD file + 3-minute walkthrough video",
      "Top 5 teams present to Adobe design leads",
    ],
    eligibility: [
      "Open to design students and enthusiasts",
      "Solo or teams of 2",
      "Must use Figma or Adobe XD for the final prototype",
      "No prior professional experience required",
    ],
    prizes: ["₹15,000 — 1st Place", "₹7,000 — 2nd Place", "₹3,000 — 3rd Place"],
    perks: ["Adobe Creative Cloud 1-year license", "Certificate of Excellence", "Portfolio review by Adobe designers", "Featured on Adobe's social channels"],
    aboutOrg: "Adobe Inc. is the global leader in creative software, empowering millions of designers, photographers, and video editors worldwide with tools like Photoshop, Illustrator, and Figma.",
    activity: ["Hosting since 2021", "5 design challenges organised"],
  },
  {
    id: 4,
    title: "Data Science Olympiad",
    company: "Microsoft",
    location: "Online",
    duration: "Solo",
    prize: "₹75,000 Prize Pool",
    rating: 4.7,
    match: 87,
    skills: ["Python", "SQL", "Machine Learning", "Power BI", "Azure ML"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    posted: "Today",
    trending: true,
    type: "Quiz",
    registrationDeadline: "28 Jun 2026",
    eventDate: "20 Jul 2026",
    openings: "2000+ registrations",
    about: "Microsoft's Data Science Olympiad is a solo online competition testing your skills in data analysis, machine learning, and business intelligence. Solve real-world datasets using Python, SQL, and Azure ML.",
    rounds: [
      "Qualifier — 60-minute MCQ test on DS fundamentals",
      "Semi-Final — solve a data analysis problem on a provided dataset",
      "Final — end-to-end ML pipeline challenge with Azure ML",
    ],
    eligibility: [
      "Open to all students and recent graduates (within 2 years)",
      "Solo participation only",
      "Basic Python and SQL knowledge required",
      "Azure free account needed for the final round",
    ],
    prizes: ["₹40,000 — 1st Place", "₹25,000 — 2nd Place", "₹10,000 — 3rd Place", "Azure certifications for top 50"],
    perks: ["Microsoft Azure certification voucher", "LinkedIn badge", "Internship fast-track at Microsoft", "Certificate of participation"],
    aboutOrg: "Microsoft Corporation is a global technology leader building cloud, AI, and productivity solutions used by billions of people and organisations worldwide.",
    activity: ["Hosting since 2020", "6 olympiads organised"],
  },
  {
    id: 5,
    title: "Marketing Case Competition",
    company: "Meta",
    location: "Online",
    duration: "1 - 3 Members",
    prize: "₹15,000 Prize Pool",
    rating: 4.4,
    match: 74,
    skills: ["Marketing Strategy", "Analytics", "Consumer Insights", "Presentation", "Social Media"],
    logo: "https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg",
    posted: "5 days ago",
    trending: false,
    type: "Competition",
    registrationDeadline: "15 Jun 2026",
    eventDate: "5 Jul 2026",
    openings: "400+ registrations",
    about: "Meta's Marketing Case Competition challenges student teams to develop a go-to-market strategy for a new Meta product feature. Teams will analyse consumer data, define target segments, and present a full campaign plan.",
    rounds: [
      "Case Release — marketing brief shared with registered teams",
      "Submission — 10-slide deck with strategy and campaign plan",
      "Top 8 teams present live to Meta marketing managers",
    ],
    eligibility: [
      "Open to MBA and undergraduate business/marketing students",
      "Teams of 1 to 3 members",
      "Strong analytical and communication skills preferred",
    ],
    prizes: ["₹8,000 — 1st Place", "₹5,000 — 2nd Place", "₹2,000 — 3rd Place"],
    perks: ["Meta certificate", "Feedback from Meta marketing team", "Networking session with Meta employees"],
    aboutOrg: "Meta Platforms builds technologies that help people connect and grow businesses. Meta's family of apps includes Facebook, Instagram, WhatsApp, and Messenger.",
    activity: ["Hosting since 2023", "3 case competitions organised"],
  },
  {
    id: 6,
    title: "Open Source Hackathon",
    company: "GitHub",
    location: "Online",
    duration: "1 - 4 Members",
    prize: "₹2,00,000 Prize Pool",
    rating: 4.8,
    match: 89,
    skills: ["Open Source", "Node.js", "REST APIs", "Git", "Documentation"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    posted: "2 days ago",
    trending: true,
    type: "Hackathon",
    registrationDeadline: "2 Jul 2026",
    eventDate: "18–20 Jul 2026",
    openings: "800+ registrations",
    about: "GitHub's Open Source Hackathon is a 72-hour event celebrating open source development. Teams must contribute to an existing open source project or build a new one from scratch, with a focus on documentation, accessibility, and community impact.",
    rounds: [
      "Team Registration & Project Selection",
      "72-hour Build & Contribute Sprint",
      "Pull Request Submission with project README",
      "Top 15 projects reviewed by GitHub engineers",
    ],
    eligibility: [
      "Open to all developers — students and professionals",
      "Teams of 1 to 4 members",
      "Project must be publicly hosted on GitHub",
      "Must include a meaningful README and contribution guide",
    ],
    prizes: ["₹1,00,000 — 1st Place", "₹60,000 — 2nd Place", "₹40,000 — 3rd Place", "GitHub Pro for all finalists"],
    perks: ["GitHub Pro subscription (1 year)", "Featured on GitHub's official blog", "Octocat swag kit", "Certificate of contribution"],
    aboutOrg: "GitHub is the world's leading platform for software development and open source collaboration, used by over 100 million developers globally.",
    activity: ["Hosting since 2018", "10 hackathons organised"],
  },
];

const skillColors = [
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-indigo-50 text-indigo-700 border-indigo-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
];
const perkColors = [
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-teal-50 text-teal-700 border-teal-200",
  "bg-cyan-50 text-cyan-700 border-cyan-200",
  "bg-sky-50 text-sky-700 border-sky-200",
];

function ContentCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-[15px] font-black text-slate-900" style={{ letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function CompetitionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const comp = competitionsData.find(c => c.id === parseInt(id)) || competitionsData[0];

  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="min-h-screen pb-20 lg:pb-0"
      style={{ background: "linear-gradient(135deg, #dce8f8 0%, #eef1fb 60%, #dde8f5 100%)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-slate-400 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-indigo-600 transition-colors">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate("/competition")} className="hover:text-indigo-600 transition-colors">Competitions</button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-semibold truncate max-w-[200px]">{comp.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Back */}
        <button onClick={() => navigate("/competition")}
          className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors w-fit">
          <ArrowLeft size={15} /> Back to Competitions
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400" />
          <div className="p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm p-2">
                  <img src={comp.logo} alt={comp.company} className="w-full h-full object-contain"
                    onError={e => { e.target.style.display = "none"; }} />
                </div>
                <div>
                  <h1 className="text-[22px] sm:text-[24px] font-black text-slate-900 leading-tight" style={{ letterSpacing: "-0.025em" }}>
                    {comp.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[14px] font-bold text-indigo-600">{comp.company}</span>
                    <ExternalLink size={12} className="text-indigo-400" />
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                      <MapPin size={12} className="text-slate-400" />{comp.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {comp.trending && (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                    <Sparkles size={11} /> Trending
                  </span>
                )}
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
                  {comp.type}
                </span>
              </div>
            </div>

            {/* Meta Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-100">
              {[
                { icon: <Users size={13} />,    label: "Team Size",    value: comp.duration,              color: "text-violet-500" },
                { icon: <Trophy size={13} />,   label: "Prize Pool",   value: comp.prize,                 color: "text-amber-500"  },
                { icon: <Calendar size={13} />, label: "Event Date",   value: comp.eventDate,             color: "text-blue-500"   },
                { icon: <Clock size={13} />,    label: "Register By",  value: comp.registrationDeadline,  color: "text-rose-500"   },
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

            <ContentCard title="About the competition" icon={<Trophy size={15} className="text-indigo-500" />}>
              <p className="text-[14px] text-slate-600 leading-relaxed">{comp.about}</p>
            </ContentCard>

            <ContentCard title="Competition rounds" icon={<CheckCircle2 size={15} className="text-emerald-500" />}>
              <div className="flex flex-col gap-2.5">
                {comp.rounds.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-indigo-600">{i + 1}</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-snug font-medium">{r}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Eligibility" icon={<Users size={15} className="text-blue-500" />}>
              <div className="flex flex-col gap-2.5">
                {comp.eligibility.map((e, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <p className="text-[13px] text-slate-700 leading-snug font-medium">{e}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Prizes" icon={<Trophy size={15} className="text-amber-500" />}>
              <div className="flex flex-col gap-2.5">
                {comp.prizes.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black
                      ${i === 0 ? "bg-amber-100 text-amber-600 border border-amber-200" :
                        i === 1 ? "bg-slate-100 text-slate-500 border border-slate-200" :
                        i === 2 ? "bg-orange-50 text-orange-500 border border-orange-200" :
                        "bg-slate-50 text-slate-400 border border-slate-100"}`}>
                      {i < 3 ? i + 1 : "✓"}
                    </div>
                    <p className="text-[13px] text-slate-700 font-medium">{p}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Skills required" icon={<Award size={15} className="text-violet-500" />}>
              <div className="flex flex-wrap gap-2">
                {comp.skills.map((s, i) => (
                  <span key={i} className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${skillColors[i % skillColors.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Perks & Benefits" icon={<Zap size={15} className="text-teal-500" />}>
              <div className="flex flex-wrap gap-2">
                {comp.perks.map((p, i) => (
                  <span key={i} className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${perkColors[i % perkColors.length]}`}>
                    {p}
                  </span>
                ))}
              </div>
            </ContentCard>

            <ContentCard title={`About ${comp.company}`} icon={<Building2 size={15} className="text-blue-500" />}>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-5">{comp.aboutOrg}</p>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Activity on platform</p>
                {comp.activity.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-slate-600 font-medium mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />{a}
                  </div>
                ))}
              </div>
            </ContentCard>

            {/* Bottom CTA */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold text-slate-800">Ready to register?</p>
                <p className="text-[12px] text-slate-400 mt-0.5">Deadline: {comp.registrationDeadline}</p>
              </div>
              <button onClick={() => setRegistered(true)}
                className={`text-[14px] font-bold px-7 py-3 rounded-2xl transition-all shadow-sm ${registered ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-200"}`}>
                {registered ? "✓ Registered" : "Register Now"}
              </button>
            </div>

            {/* Similar */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <p className="text-[15px] font-black text-slate-900 mb-4" style={{ letterSpacing: "-0.01em" }}>Similar Competitions</p>
              <div className="flex flex-col gap-3">
                {competitionsData.filter(c => c.id !== comp.id).slice(0, 3).map(item => (
                  <button key={item.id} onClick={() => navigate(`/competitiondetail/${item.id}`)}
                    className="flex items-center gap-3 text-left hover:bg-slate-50 rounded-xl p-2.5 transition-colors group">
                    <div className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center bg-white flex-shrink-0 p-1">
                      <img src={item.logo} alt={item.company} className="w-full h-full object-contain"
                        onError={e => { e.target.style.display = "none"; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{item.title}</p>
                      <p className="text-[11px] text-slate-400">{item.company} · {item.prize}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="hidden lg:flex flex-col gap-4 w-[268px] flex-shrink-0 sticky top-6">

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-2xl">
                  <Zap size={13} className="text-amber-500 flex-shrink-0" />
                  <p className="text-[12px] font-bold text-amber-700">Registrations closing soon</p>
                </div>
                <button onClick={() => setRegistered(true)}
                  className={`w-full text-[14px] font-bold py-3 rounded-2xl transition-all shadow-sm ${registered ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-200"}`}>
                  {registered ? "✓ Registered" : "Register Now"}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setSaved(s => !s)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[12px] font-semibold transition-all ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500"}`}>
                    <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <div className="relative flex-1">
                    <button onClick={() => setShareOpen(s => !s)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 text-[12px] font-semibold transition-all">
                      <Share2 size={13} /> Share
                    </button>
                    {shareOpen && (
                      <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl z-30 overflow-hidden w-48">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                          <span className="text-[12px] font-bold text-slate-700">Share via</span>
                          <button onClick={() => setShareOpen(false)}><X size={13} className="text-slate-400" /></button>
                        </div>
                        {["WhatsApp", "LinkedIn", "Twitter / X"].map((label, i) => (
                          <button key={i} className="w-full text-left px-4 py-2.5 text-[12px] font-semibold hover:bg-slate-50 transition-colors text-slate-700">{label}</button>
                        ))}
                        <button onClick={handleCopy} className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 border-t border-slate-100">
                          <Copy size={12} /> {copied ? "Copied!" : "Copy link"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 text-center">Register before <span className="font-bold text-slate-600">{comp.registrationDeadline}</span></p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Info</p>
              <div className="flex flex-col gap-3.5">
                {[
                  { icon: <MapPin size={13} />,    label: "Location",    value: comp.location,             color: "text-blue-400"   },
                  { icon: <Users size={13} />,     label: "Team Size",   value: comp.duration,             color: "text-violet-400" },
                  { icon: <Trophy size={13} />,    label: "Prize",       value: comp.prize,                color: "text-amber-400"  },
                  { icon: <Calendar size={13} />,  label: "Event Date",  value: comp.eventDate,            color: "text-indigo-400" },
                  { icon: <Clock size={13} />,     label: "Deadline",    value: comp.registrationDeadline, color: "text-rose-400"   },
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

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {comp.skills.map((s, i) => (
                  <span key={i} className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${skillColors[i % skillColors.length]}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800 truncate">{comp.title}</p>
          <p className="text-[11px] text-slate-400">Deadline: {comp.registrationDeadline}</p>
        </div>
        <button onClick={() => setSaved(s => !s)}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-[12px] font-semibold transition-all flex-shrink-0 ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
          <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
        <button onClick={() => setRegistered(true)}
          className={`text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex-shrink-0 ${registered ? "bg-emerald-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}>
          {registered ? "✓ Registered" : "Register"}
        </button>
      </div>
    </div>
  );
}
