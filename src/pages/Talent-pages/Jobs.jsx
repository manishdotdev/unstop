import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, Clock, Briefcase, SlidersHorizontal, ChevronDown,
  X, Bookmark, Share2, Heart, Star, Sparkles, ArrowRight, BookmarkX,
  SquareTerminal, ListTodo, Atom, Megaphone, Wrench, SwatchBook,
  ScrollText, UserSearch, Banknote, Building2, Info, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────
const jobsData = [
  {
    id: 1,
    title: "Digital Marketing Executive",
    company: "Morecare Mobility & Rehabilitation Solutions",
    experience: "No prior experience required",
    type: "Full Time",
    location: "In Office | Jaipur",
    skills: ["Marketing Analytics", "Pay-Per-Click (PPC) Advertising", "Social Media Management"],
    categories: ["Digital Marketing", "Fresher"],
    salary: "₹20K – 25K/Month",
    postedDate: "Feb 25, 2026",
    daysLeft: 13,
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/699e862e995ed_organisation_image-KkCndSDM55179984988E5XaVjnosS.png",
    trending: true, match: 88,
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Google",
    experience: "1–3 years",
    type: "Full Time",
    location: "Remote",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    categories: ["Developer", "Remote"],
    salary: "₹80K – 1.2L/Month",
    postedDate: "May 20, 2026",
    daysLeft: 20,
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    trending: true, match: 95,
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Microsoft",
    experience: "3–5 years",
    type: "Full Time",
    location: "Hybrid | Bengaluru",
    skills: ["Product Strategy", "Agile", "Roadmapping"],
    categories: ["Product", "Corporate"],
    salary: "₹1.5L – 2L/Month",
    postedDate: "May 18, 2026",
    daysLeft: 18,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    trending: false, match: 80,
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Stripe",
    experience: "0–2 years",
    type: "Full Time",
    location: "Remote",
    skills: ["Python", "SQL", "Power BI"],
    categories: ["Analytics", "Remote"],
    salary: "₹60K – 90K/Month",
    postedDate: "May 22, 2026",
    daysLeft: 25,
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    trending: true, match: 91,
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Adobe",
    experience: "2–4 years",
    type: "Full Time",
    location: "Hybrid | Mumbai",
    skills: ["Figma", "User Research", "Prototyping"],
    categories: ["Design", "Hybrid"],
    salary: "₹70K – 1L/Month",
    postedDate: "May 15, 2026",
    daysLeft: 10,
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
    trending: false, match: 76,
  },
  {
    id: 6,
    title: "Content Writer",
    company: "HubSpot",
    experience: "0–1 year",
    type: "Part Time",
    location: "Remote",
    skills: ["SEO Writing", "Copywriting", "WordPress"],
    categories: ["Content", "Fresher"],
    salary: "₹25K – 40K/Month",
    postedDate: "May 24, 2026",
    daysLeft: 30,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg",
    trending: false, match: 72,
  },
  {
    id: 7,
    title: "HR Business Partner",
    company: "Razorpay",
    experience: "2–5 years",
    type: "Full Time",
    location: "In Office | Bengaluru",
    skills: ["Talent Acquisition", "HRIS", "Employee Relations"],
    categories: ["HR", "Corporate"],
    salary: "₹80K – 1.1L/Month",
    postedDate: "May 19, 2026",
    daysLeft: 15,
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/699d3c32ed771_organisation_image-DUYCd15I1b1554843805KhnwAHNZIA.png",
    trending: true, match: 83,
  },
  {
    id: 8,
    title: "Sales Development Representative",
    company: "Salesforce",
    experience: "0–2 years",
    type: "Full Time",
    location: "In Office | Delhi",
    skills: ["CRM", "Cold Calling", "Lead Generation"],
    categories: ["Sales", "Fresher"],
    salary: "₹35K – 55K/Month",
    postedDate: "May 21, 2026",
    daysLeft: 22,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    trending: false, match: 68,
  },
];

const categories = [
  { title: "Developer", icon: SquareTerminal },
  { title: "Product", icon: ListTodo },
  { title: "Analytics", icon: Atom },
  { title: "Marketing", icon: Megaphone },
  { title: "Sales", icon: Briefcase },
  { title: "Ops", icon: Wrench },
  { title: "Design", icon: SwatchBook },
  { title: "Content", icon: ScrollText },
  { title: "HR", icon: UserSearch },
  { title: "Finance", icon: Banknote },
];

const workTypes = ["Full Time", "Part Time", "Remote", "Hybrid", "In Office"];
const experienceLevels = ["Fresher", "0–2 years", "2–5 years", "5+ years"];
const companyList = ["Google", "Microsoft", "Adobe", "Stripe", "Razorpay", "Salesforce", "HubSpot"];

const matchColor = (score) => {
  if (score >= 90) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (score >= 80) return { bar: "bg-indigo-500", text: "text-indigo-600" };
  return { bar: "bg-amber-400", text: "text-amber-600" };
};

// ─── JOB CARD ────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const mc = matchColor(job.match);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-3">
          <div className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center bg-white flex-shrink-0 p-1">
            <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">{job.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[13px] text-slate-600">{job.company}</span>
              {job.trending && (
                <span className="text-[11px] text-indigo-500 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">Trending</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 flex-shrink-0"
        >
          <Bookmark size={14} fill={saved ? "currentColor" : "none"} className={saved ? "text-indigo-500" : ""} />
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-[12px] text-slate-600">
        <span className="flex items-center gap-1"><Briefcase size={12} />{job.experience}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{job.type}</span>
        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((s, i) => (
          <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">{s}</span>
        ))}
      </div>

      {/* Categories + Salary */}
      <div className="flex flex-wrap items-center gap-2">
        {job.categories.map((c, i) => (
          <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{c}</span>
        ))}
        {job.salary && (
          <span className="ml-auto text-[12px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            {job.salary}
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </span>
        )}
      </div>

      {/* AI Match */}
      <div className="flex items-center gap-2">
        <Sparkles size={13} className="text-slate-400" />
        <span className="text-[12px] text-slate-500 font-medium">Match</span>
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
          <div className={`h-full rounded-full ${mc.bar}`} style={{ width: `${job.match}%` }} />
        </div>
        <span className={`text-[12px] font-semibold ${mc.text}`}>{job.match}%</span>
        <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <Info size={12} className="text-slate-400 cursor-pointer" />
          {showTooltip && (
            <div className="absolute bottom-6 right-0 bg-slate-900 text-white text-[11px] rounded-lg px-3 py-2 w-44 shadow-lg z-10">
              AI Match Score shows how well your profile fits this job.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3 text-[12px] text-slate-400">
          <span>Posted {job.postedDate}</span>
          <span className="flex items-center gap-1 text-blue-500 font-medium">
            <BookmarkX size={12} />{job.daysLeft} days left
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-1.5 rounded-lg transition ${liked ? "text-red-500" : "text-slate-400 hover:bg-slate-50"}`}
          >
            <Heart size={14} fill={liked ? "#EF4444" : "none"} />
          </button>
          <button
            onClick={() => navigate(`/jobdetail/${job.id}`)}
            className="flex items-center gap-1 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 transition ml-1"
          >
            Apply <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR FILTERS ─────────────────────────────────────────────────────────
function SidebarFilters({ workType, setWorkType, expLevel, setExpLevel, checkedCompanies, setCheckedCompanies, minSalary, setMinSalary, onClear }) {
  const toggle = (val, set, list) => set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  const activeCount = workType.length + expLevel.length + checkedCompanies.length + (minSalary > 0 ? 1 : 0);

  const CheckRow = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group/item py-1">
      <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked ? "bg-indigo-500 border-indigo-500" : "border-slate-300 group-hover/item:border-indigo-400 bg-white"}`}>
        {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-[13px] font-medium transition-colors ${checked ? "text-indigo-600" : "text-slate-600 group-hover/item:text-slate-900"}`}>{label}</span>
    </label>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-indigo-500" />
          <span className="font-bold text-slate-900 text-[14px]">Filters</span>
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
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Work Type</p>
        {workTypes.map((f, i) => (
          <CheckRow key={i} label={f} checked={workType.includes(f)} onChange={() => toggle(f, setWorkType, workType)} />
        ))}
      </div>
      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Experience</p>
        {experienceLevels.map((f, i) => (
          <CheckRow key={i} label={f} checked={expLevel.includes(f)} onChange={() => toggle(f, setExpLevel, expLevel)} />
        ))}
      </div>
      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Min. Salary</p>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[11px] text-slate-400">₹0</span>
          <span className="text-[15px] font-bold text-indigo-600">
            ₹{minSalary > 0 ? `${(minSalary / 1000).toFixed(0)}K` : "0"}<span className="text-[11px] font-medium text-slate-400">/mo</span>
          </span>
          <span className="text-[11px] text-slate-400">₹2L</span>
        </div>
        <input type="range" min={0} max={200000} step={5000} value={minSalary} onChange={e => setMinSalary(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
      </div>
      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Companies</p>
        {companyList.map((c, i) => (
          <CheckRow key={i} label={c} checked={checkedCompanies.includes(c)} onChange={() => toggle(c, setCheckedCompanies, checkedCompanies)} />
        ))}
      </div>
    </div>
  );
}

// ─── CATEGORY CARD ───────────────────────────────────────────────────────────
function CategoryCard({ title, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative min-w-[120px] h-[100px] rounded-3xl flex flex-col justify-between text-center p-[14px_10px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex-shrink-0 ${active ? "ring-2 ring-indigo-400 shadow-md" : ""}`}
      style={{ background: "linear-gradient(104.37deg, #E9F4FF 10%, #d8e3f1 100%)" }}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-no-repeat bg-bottom-right mix-blend-soft-light opacity-60 pointer-events-none"
          style={{ backgroundImage: "url(https://d8it4huxumps7.cloudfront.net/uploads/images/avif/home_page_card_bg_element_new.png)", backgroundSize: "100%" }} />
      </div>
      <div className="z-10 flex items-center justify-center">
        <Icon size={28} strokeWidth={1.6} className={active ? "text-indigo-600" : "text-[#00264D]"} />
      </div>
      <div className={`text-[12px] font-semibold z-10 ${active ? "text-indigo-600" : "text-[#00264D]"}`}>{title}</div>
    </button>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  const [activeCategory, setActiveCategory] = useState(null);
  const [workType, setWorkType] = useState([]);
  const [expLevel, setExpLevel] = useState([]);
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const parseSalary = (s) => {
    if (!s) return 0;
    const nums = s.replace(/[₹,]/g, "").match(/\d+/g);
    if (!nums) return 0;
    const val = parseInt(nums[0]);
    return s.includes("L") ? val * 100000 : val * 1000;
  };

  const clearAll = () => {
    setSearch(""); setWorkType([]); setExpLevel([]);
    setCheckedCompanies([]); setMinSalary(0); setActiveCategory(null);
  };

  const filtered = jobsData
    .filter(j => {
      const q = search.toLowerCase();
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q));
      const matchCategory = !activeCategory || j.categories.some(c => c.toLowerCase().includes(activeCategory.toLowerCase()));
      const matchWorkType = workType.length === 0 || workType.some(w => j.type.includes(w) || j.location.includes(w));
      const matchExp = expLevel.length === 0 || expLevel.some(e => j.experience.toLowerCase().includes(e.toLowerCase()) || j.categories.some(c => c.toLowerCase().includes(e.toLowerCase())));
      const matchCompany = checkedCompanies.length === 0 || checkedCompanies.includes(j.company);
      const matchSalary = parseSalary(j.salary) >= minSalary;
      return matchSearch && matchCategory && matchWorkType && matchExp && matchCompany && matchSalary;
    })
    .sort((a, b) => {
      if (sort === "salary") return parseSalary(b.salary) - parseSalary(a.salary);
      if (sort === "newest") return new Date(b.postedDate) - new Date(a.postedDate);
      return b.match - a.match;
    });

  const activeFilterCount = workType.length + expLevel.length + checkedCompanies.length + (minSalary > 0 ? 1 : 0);
  const sidebarProps = { workType, setWorkType, expLevel, setExpLevel, checkedCompanies, setCheckedCompanies, minSalary, setMinSalary, onClear: clearAll };

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-[#dce8f8] via-[#eef1fb] to-[#dde8f5] px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Opportunities</p>
          <h1 className="text-[34px] font-black text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>
            77,709+ <span className="text-indigo-500">Jobs</span> in India
          </h1>
          <p className="text-slate-500 mt-1.5 text-[14px]">Search & apply for freshers, remote and entry-level job vacancies.</p>

          {/* Search */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by role, company or skill..."
                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none text-[13px] text-slate-700 font-medium"
              />
            </div>
            <button className="h-11 px-5 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-bold rounded-2xl shadow-sm transition-colors flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── CATEGORY CHIPS ── */}
      <div className="border-b border-slate-100 bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat, i) => (
              <CategoryCard
                key={i}
                title={cat.title}
                icon={cat.icon}
                active={activeCategory === cat.title}
                onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex gap-6 items-start">

          {/* Left Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <SidebarFilters {...sidebarProps} />
            </div>
          </aside>

          {/* Cards Column */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-600 shadow-sm"
                >
                  <SlidersHorizontal size={13} /> Filters
                  {activeFilterCount > 0 && <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{activeFilterCount}</span>}
                </button>
                <p className="text-[13px] text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">{filtered.length}</span> jobs found
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
                  <option value="salary">Highest Salary</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Active filter chips */}
            {(activeCategory || activeFilterCount > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <span className="flex items-center gap-1.5 text-[12px] bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1 rounded-full font-semibold">
                    {activeCategory}
                    <button onClick={() => setActiveCategory(null)}><X size={11} /></button>
                  </span>
                )}
                {workType.map(w => (
                  <span key={w} className="flex items-center gap-1.5 text-[12px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
                    {w}<button onClick={() => setWorkType(workType.filter(x => x !== w))}><X size={11} /></button>
                  </span>
                ))}
                {checkedCompanies.map(c => (
                  <span key={c} className="flex items-center gap-1.5 text-[12px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
                    {c}<button onClick={() => setCheckedCompanies(checkedCompanies.filter(x => x !== c))}><X size={11} /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Cards or Empty State */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-slate-400" />
                </div>
                <p className="text-slate-600 font-semibold text-[14px]">No jobs found</p>
                <p className="text-slate-400 text-[12px] mt-1">Try adjusting your filters or search term</p>
                <button onClick={clearAll} className="mt-4 text-indigo-500 text-[13px] font-semibold hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
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
            <div className="p-5"><SidebarFilters {...sidebarProps} /></div>
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
