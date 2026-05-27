import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Profile from "../assets/profile.webp"
import Logo from "../assets/logo.png"
import {
  Bell, House, GraduationCap, NotepadTextDashed,
  Briefcase, Search, Menu, X, ChevronRight, Sparkles
} from "lucide-react"
import { LuBriefcaseBusiness } from "react-icons/lu"
import { GoTrophy } from "react-icons/go"
import { LiaUserTieSolid } from "react-icons/lia"
import { TbUserScan } from "react-icons/tb"
import { FaBook, FaCode } from "react-icons/fa"
import ProfileDropdown from "./ProfileDropdown"

// ─── NAV CONFIG ──────────────────────────────────────────────────────────────
const navItems = [
  { icon: House, label: "Home", route: "/", badge: null },
  { icon: GraduationCap, label: "Internships", route: "/internship", badge: "27K+" },
  { icon: LuBriefcaseBusiness, label: "Jobs", route: "/jobs", badge: "77K+" },
  { icon: GoTrophy, label: "Competitions", route: "/competition", badge: null },
  { icon: LiaUserTieSolid, label: "Mentorship", route: "/mentorship", badge: null },
  { icon: FaBook, label: "Mock Tests", route: "/mocktest", badge: null },
  { icon: TbUserScan, label: "Mock Interview", route: "/mockinterview", badge: null },
  { icon: FaCode, label: "100 Days Code", route: "/code", badge: "New" },
  { icon: NotepadTextDashed, label: "Courses", route: "/courses", badge: null },
  { icon: Briefcase, label: "My Applications", route: "/my-applications", badge: null },
]

// ─── SIDEBAR BG ──────────────────────────────────────────────────────────────
const SIDEBAR_BG = "#E5EFFA"
const SIDEBAR_BORDER = "#ccddf0"

// ─── LAYOUT ──────────────────────────────────────────────────────────────
const Layout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleProfileSelect = () => {
    navigate("/user")
    setIsProfileMenuOpen(false)
  }

  const handleLogoutSelect = () => {
    // TODO: Implement actual logout logic (clear token, etc.)
    navigate("/")
    setIsProfileMenuOpen(false)
  }

  // ── Single nav item ──
  const NavItem = ({ icon: Icon, label, route, badge, onClick }) => {
    const active = location.pathname === route || (route !== "/" && location.pathname.startsWith(route))
    return (
      <button
        onClick={() => { navigate(route); onClick?.() }}
        className={`
          w-full group relative flex items-center gap-3 px-3 py-2.5
          rounded-xl cursor-pointer transition-all duration-150 text-left outline-none
          ${active
            ? "bg-white shadow-sm text-indigo-600"
            : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
          }
        `}
      >
        {/* Active left accent bar */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500" />
        )}

        {/* Icon */}
        <span className={`flex-shrink-0 transition-colors duration-150
          ${active ? "text-indigo-500" : "text-slate-400 group-hover:text-indigo-400"}`}>
          <Icon size={16} />
        </span>

        {/* Label */}
        <span className={`flex-1 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150
          ${active ? "text-indigo-700" : "text-slate-600 group-hover:text-slate-800"}`}>
          {label}
        </span>

        {/* Badge */}
        {badge && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0
            ${badge === "New"
              ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
              : active
                ? "bg-indigo-100 text-indigo-500"
                : "bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-400"
            }`}>
            {badge}
          </span>
        )}

        {/* Hover arrow */}
        {!active && (
          <ChevronRight
            size={12}
            className="flex-shrink-0 opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 text-slate-400"
          />
        )}
      </button>
    )
  }

  // ── Shared sidebar body ──
  const SidebarBody = ({ onItemClick }) => (
    <div className="flex flex-col h-full">

      {/* Section label */}
      <p className="px-4 pt-5 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
        Navigate
      </p>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-2 flex-1">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} onClick={onItemClick} />
        ))}
      </nav>

      {/* Bottom AI promo card */}
      <div className="mx-3 mb-4 mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={13} className="text-indigo-500" />
          <span className="text-[12px] font-semibold text-indigo-700">AI Match</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
          Get personalised job & internship recommendations based on your profile.
        </p>
        <button className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[11px] font-semibold transition-all shadow-sm shadow-indigo-200">
          Enable AI Match
        </button>
      </div>

    </div>
  )

  return (
    <div className="h-screen flex flex-col font-sans bg-slate-50">

      {/* ── TOP NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 h-14 flex items-center px-4 gap-3 z-50 bg-white border-b border-slate-200 shadow-sm"
      >
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition flex-shrink-0"
        >
          <Menu size={18} />
        </button>

        {/* Logo spacer on desktop (aligns with sidebar width) */}
        <div className="hidden lg:flex items-center gap-2.5 w-[230px] min-w-[230px] flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-transparent flex items-center justify-center overflow-hidden ">
            <img src={Logo} alt="logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[15px] font-bold text-slate-800 tracking-tight">SyncLyft</span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-[480px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search opportunities, companies, skills..."
            className="w-full h-9 pl-9 pr-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[13px] placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center text-[10px] text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md font-mono shadow-sm">
            ⌘K
          </kbd>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="hidden md:flex items-center gap-2 px-3.5 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[12px] font-medium hover:bg-slate-200 hover:text-slate-800 transition">
            <Briefcase size={13} />
            For Business
          </button>

          <div className="hidden md:block w-px h-5 bg-slate-200" />

<button 
            onClick={() => navigate("/notifications")}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 pl-1 pr-2.5 h-8 rounded-lg hover:bg-slate-100 transition group"
            >
              <img src={Profile} alt="profile" className="w-6 h-6 rounded-md object-cover ring-1 ring-slate-200" />
              <span className="hidden md:block text-[12px] font-medium text-slate-500 group-hover:text-slate-700 transition">Profile</span>
            </button>
            {isProfileMenuOpen && (
              <ProfileDropdown
                ref={profileMenuRef}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[999]"
                onProfileSelect={handleProfileSelect}
                onLogoutSelect={handleLogoutSelect}
              />
            )}
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 bottom-0 w-[260px] overflow-y-auto shadow-2xl"
            style={{ background: SIDEBAR_BG, borderRight: `1px solid ${SIDEBAR_BORDER}` }}
          >
            {/* Close row */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Menu</span>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white/60 transition"
              >
                <X size={15} />
              </button>
            </div>
            <SidebarBody onItemClick={() => setMobileNavOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="flex flex-1 pt-14 overflow-hidden">

        {/* Desktop sidebar */}
        <aside
          className="hidden lg:block w-[230px] min-w-[230px] overflow-y-auto flex-shrink-0"
          style={{ background: SIDEBAR_BG, borderRight: `1px solid ${SIDEBAR_BORDER}` }}
        >
          <SidebarBody />
        </aside>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  )
}

export default Layout
