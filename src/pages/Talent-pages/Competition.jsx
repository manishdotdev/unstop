import { useState } from "react";
import {
    Search, MapPin, Clock, Banknote, Flame, Sparkles, ArrowRight,
    Star, Info, ChevronDown, SlidersHorizontal, X, Bookmark, Trophy
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const competitions = [
    { id: 1, title: "Industrial AI Summit 2026 - Startup Challenge", company: "IIM Mumbai", location: "Online", duration: "1 - 4 Members", stipend: "₹50,000 Prize Pool", rating: 4.8, match: 92, skills: ["AI", "Supply Chain", "Innovation"], logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/699dea7e1a656_SCIE__IIM_Mumbai_IIMM_Standard_1.png", posted: "2 days ago", trending: true, type: "Competition" },
    { id: 2, title: "National Hackathon 2026", company: "Google Developers", location: "Online", duration: "1 - 3 Members", stipend: "₹1,00,000 Prize Pool", rating: 4.9, match: 95, skills: ["React", "Cloud", "AI"], logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg", posted: "1 day ago", trending: true, type: "Hackathon" },
    { id: 3, title: "Design Sprint Challenge 2026", company: "Adobe", location: "Hybrid", duration: "1 - 2 Members", stipend: "₹25,000 Prize Pool", rating: 4.6, match: 80, skills: ["Figma", "UI", "UX"], logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg", posted: "3 days ago", trending: false, type: "Competition" },
    { id: 4, title: "Data Science Olympiad", company: "Microsoft", location: "Online", duration: "Solo", stipend: "₹75,000 Prize Pool", rating: 4.7, match: 87, skills: ["Python", "SQL", "ML"], logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", posted: "Today", trending: true, type: "Quiz" },
    { id: 5, title: "Marketing Case Competition", company: "Meta", location: "Online", duration: "1 - 3 Members", stipend: "₹15,000 Prize Pool", rating: 4.4, match: 74, skills: ["Marketing", "Analytics", "Strategy"], logo: "https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg", posted: "5 days ago", trending: false, type: "Competition" },
    { id: 6, title: "Open Source Hackathon", company: "GitHub", location: "Online", duration: "1 - 4 Members", stipend: "₹2,00,000 Prize Pool", rating: 4.8, match: 89, skills: ["Node.js", "API", "Open Source"], logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", posted: "2 days ago", trending: true, type: "Hackathon" },
];

const companies = ["Google", "Microsoft", "Adobe", "IIM Mumbai", "OpenAI", "Meta", "GitHub"];
const filterOptions = ["Competition", "Hackathon", "Quiz", "Workshop", "Scholarship"];
const highlightSkills = ["AI", "React", "Cloud", "Innovation", "Python", "Figma"];

const matchColor = (score) => {
    if (score >= 90) return { bar: "from-emerald-400 to-teal-500", text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
    if (score >= 80) return { bar: "from-indigo-400 to-violet-500", text: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" };
    return { bar: "from-amber-400 to-orange-400", text: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
};

const typeColors = {
    Competition: "bg-violet-50 text-violet-600 border-violet-200",
    Hackathon: "bg-rose-50 text-rose-600 border-rose-200",
    Quiz: "bg-sky-50 text-sky-600 border-sky-200",
    Workshop: "bg-amber-50 text-amber-600 border-amber-200",
    Scholarship: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

function CompetitionCard({ job }) {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const mc = matchColor(job.match);

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition flex flex-col gap-4">

            <div className="flex justify-between items-start">

                <div className="flex gap-3">

                    <img
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg border border-slate-200 object-contain p-1 bg-white"
                        onError={(e) => (e.target.style.display = "none")}
                    />

                    <div>

                        <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">
                            {job.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">

                            <span className="text-[13px] text-slate-600">
                                {job.company}
                            </span>

                            <span className="flex items-center gap-1 text-[12px] text-slate-500">
                                <Star size={12} />
                                {job.rating}
                            </span>

                            {job.trending && (
                                <span className="text-[11px] text-slate-500">
                                    • Trending
                                </span>
                            )}

                        </div>

                    </div>

                </div>


                <button
                    onClick={() => setSaved(!saved)}
                    className="
          w-8 h-8
          rounded-md
          border border-slate-200
          flex items-center justify-center
          text-slate-500
          hover:bg-slate-50
          "
                >
                    <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
                </button>

            </div>


            <div className="flex flex-wrap gap-4 text-[12px] text-slate-600">

                <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {job.location}
                </span>

                <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {job.duration}
                </span>

                <span className="flex items-center gap-1">
                    <Trophy size={13} />
                    {job.stipend}
                </span>

            </div>


            <div className="flex flex-wrap gap-2">

                {job.skills.map((skill, i) => (

                    <span
                        key={i}
                        className="
            text-[11px]
            px-2.5
            py-1
            rounded-md
            bg-slate-100
            text-slate-600
            "
                    >
                        {skill}
                    </span>

                ))}

            </div>


            <div className="flex items-center gap-2">

                <Sparkles size={14} className="text-slate-500" />

                <span className="text-[12px] text-slate-600 font-medium">
                    Match
                </span>

                <div className="flex-1 h-2 bg-slate-100 rounded-full">

                    <div
                        className="h-full rounded-full bg-slate-400"
                        style={{ width: `${job.match}%` }}
                    />

                </div>

                <span className="text-[12px] text-slate-600 font-medium">
                    {job.match}%
                </span>


                <div
                    className="relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >

                    <Info size={12} className="text-slate-400 cursor-pointer" />

                    {showTooltip && (
                        <div
                            className="
              absolute bottom-6 right-0
              bg-slate-900 text-white
              text-[11px]
              rounded-md
              px-3 py-2
              w-48
              shadow-lg
              "
                        >
                            Match score based on competition requirements.
                        </div>
                    )}

                </div>

            </div>


            <div className="flex items-center justify-between pt-2 border-t border-slate-100">

                <span className="text-[11px] text-slate-400">
                    Posted {job.posted}
                </span>

                <button
                    onClick={() => navigate(`/competitiondetail/${job.id}`)}
                    className="
          flex items-center gap-1
          text-[13px]
          font-semibold
          text-slate-700
          hover:text-slate-900
          transition
          "
                >
                    View
                    <ArrowRight size={14} />
                </button>

            </div>

        </div>
    );
}

function SidebarContent({ checkedFilters, setCheckedFilters, checkedCompanies, setCheckedCompanies, onClear }) {
    const toggle = (val, set, list) => set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
    const activeCount = checkedFilters.length + checkedCompanies.length;

    const CheckRow = ({ label, checked, onChange }) => (
        <label className="flex items-center gap-2.5 cursor-pointer group/item py-1">
            <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${checked ? "bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-200" : "border-slate-300 group-hover/item:border-indigo-400 bg-white"}`}>
                {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className={`text-[13px] transition-colors font-medium ${checked ? "text-indigo-600" : "text-slate-600 group-hover/item:text-slate-900"}`}>{label}</span>
        </label>
    );

    return (
        <div className="flex flex-col gap-5" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={15} className="text-indigo-500" />
                    <span className="font-bold text-slate-900 text-[14px]" style={{ letterSpacing: "-0.01em" }}>Filters</span>
                    {activeCount > 0 && <span className="text-[11px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">{activeCount}</span>}
                </div>
                {activeCount > 0 && (
                    <button onClick={onClear} className="text-[12px] text-indigo-500 hover:text-indigo-700 font-semibold flex items-center gap-1">
                        <X size={11} /> Clear
                    </button>
                )}
            </div>

            <div className="border-t border-slate-100" />

            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Type</p>
                {filterOptions.map((f, i) => (
                    <CheckRow key={i} label={f} checked={checkedFilters.includes(f)} onChange={() => toggle(f, setCheckedFilters, checkedFilters)} />
                ))}
            </div>

            <div className="border-t border-slate-100" />

            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Organisers</p>
                {companies.map((c, i) => (
                    <CheckRow key={i} label={c} checked={checkedCompanies.includes(c)} onChange={() => toggle(c, setCheckedCompanies, checkedCompanies)} />
                ))}
            </div>

        </div>
    );
}

export default function CompetitionsPage() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("relevance");
    const [checkedFilters, setCheckedFilters] = useState([]);
    const [checkedCompanies, setCheckedCompanies] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const clearAll = () => { setSearch(""); setCheckedFilters([]); setCheckedCompanies([]); };

    const filtered = competitions
        .filter(j => {
            const q = search.toLowerCase();
            const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q));
            const matchType = checkedFilters.length === 0 || checkedFilters.includes(j.type);
            const matchCompany = checkedCompanies.length === 0 || checkedCompanies.includes(j.company);
            return matchSearch && matchType && matchCompany;
        })
        .sort((a, b) => {
            if (sort === "newest") return a.posted.localeCompare(b.posted);
            return b.match - a.match;
        });

    const sidebarProps = { checkedFilters, setCheckedFilters, checkedCompanies, setCheckedCompanies, onClear: clearAll };

    return (
        <div className="min-h-screen bg-white pb-20 lg:pb-0" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            <div className="bg-gradient-to-br from-[#dce8f8] via-[#eef1fb] to-[#dde8f5] px-6 pt-8 pb-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Competitions</p>
                    <h1 className="text-[28px] sm:text-[36px] font-black text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>
                        Find Student <span className="text-indigo-500">Competitions</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-[14px]">Hackathons, quizzes & challenges — win prizes & recognition</p>

                    <div className="mt-5 relative max-w-2xl flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search competitions, organisers, skills..."
                                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none text-[13px] text-slate-700 font-medium"
                            />
                        </div>
                        <button className="h-11 px-5 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-bold rounded-2xl shadow-sm shadow-indigo-200 transition-colors flex-shrink-0">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex gap-6 items-start">

                    <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-6">
                        <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-3xl p-5 shadow-sm">
                            <SidebarContent {...sidebarProps} />
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">

                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMobileOpen(true)}
                                    className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-600 shadow-sm"
                                >
                                    <SlidersHorizontal size={13} /> Filters
                                    {(checkedFilters.length + checkedCompanies.length) > 0 && (
                                        <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                            {checkedFilters.length + checkedCompanies.length}
                                        </span>
                                    )}
                                </button>
                                <p className="text-[13px] text-slate-500 font-medium">
                                    <span className="text-slate-900 font-bold">{filtered.length}</span> competitions found
                                </p>
                            </div>
                            <div className="relative">
                                <select
                                    value={sort}
                                    onChange={e => setSort(e.target.value)}
                                    className="appearance-none border border-slate-200 bg-white rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-700 shadow-sm pr-7 focus:ring-2 focus:ring-indigo-400 outline-none cursor-pointer"
                                >
                                    <option value="relevance">Best Match</option>
                                    <option value="newest">Newest</option>
                                </select>
                                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <Search size={20} className="text-slate-400" />
                                </div>
                                <p className="text-slate-600 font-semibold text-[14px]">No competitions found</p>
                                <p className="text-slate-400 text-[12px] mt-1">Try adjusting your filters</p>
                                <button onClick={clearAll} className="mt-4 text-indigo-500 text-[13px] font-semibold hover:underline">Clear all filters</button>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
                                {filtered.map(job => <CompetitionCard key={job.id} job={job} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-[14px]">Filters</span>
                            <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500">
                                <X size={15} />
                            </button>
                        </div>
                        <div className="p-5"><SidebarContent {...sidebarProps} /></div>
                        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4">
                            <button onClick={() => setMobileOpen(false)} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[13px] py-3 rounded-2xl transition-colors">
                                Show {filtered.length} Results
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}