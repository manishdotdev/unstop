import { GraduationCap } from "lucide-react"
import ProfileCompletion from "./ProfileCompletion"
import { useState, useEffect } from "react"
import EditProfileHeader from "./Profile-Page/ProfileHeader"
import ProfileLeftPanel from "./Profile-Page/ProfileLeftPanel"
import BasicDetailsForm from "./Profile-Page/BasicDetailsForm"
import ResumeForm from "./Profile-Page/ResumeForm"
import SkillsForm from "./Profile-Page/SkillsForm"
import EducationForm from "./Profile-Page/EducationForm"
import WorkExperienceForm from "./Profile-Page/Workexperienceform"
import AccomplishmentsForm from "./Profile-Page/Accomplishmentsform"
import PersonalDetailsForm from "./Profile-Page/Personaldetailsform"
import SocialLinksForm from "./Profile-Page/Sociallinksform"
import AboutForm from "./Profile-Page/AboutForm"

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState("basic")
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    if (editOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [editOpen])

  const openEditSection = (section) => {
    setActiveSection(section)
    setEditOpen(true)
  }

  const forms = {
    basic: BasicDetailsForm,
    resume: ResumeForm,
    about: AboutForm,
    skills: SkillsForm,
    education: EducationForm,
    experience: WorkExperienceForm,
    accomplishments: AccomplishmentsForm,
    personal: PersonalDetailsForm,
    social: SocialLinksForm
  }

  const ActiveForm = forms[activeSection]

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-12">
      <div className="relative">
        <img
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/655b289aa0e26_property_1component_84.png"
          className="w-full h-[140px] sm:h-[220px] object-cover"
          alt="banner"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm: -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center text-center sm:text-left w-full">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-orange-200 flex items-center justify-center">
                <img
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/35.png"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  alt="avatar"
                />
              </div>
              <span className="absolute bottom-1 right-1 bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">
                59%
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
                Divyansh Choudhary
              </h1>
              <p className="text-sm text-gray-500 font-medium">@gpdfaqxk67258</p>
              <p className="text-xs sm:text-sm text-gray-700 flex items-center justify-center sm:justify-start gap-2 mt-1">
                <GraduationCap size={18} className="text-gray-500 shrink-0" /> 
                <span className="truncate">ICFAI University, Jaipur</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="w-full md:w-40 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition shadow-sm shadow-blue-200"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileCompletion openEditSection={openEditSection} />
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 h-fit">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Rankings</h3>
            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
              <span>Total Points</span>
              <strong className="text-gray-900 font-bold">0</strong>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total Badges</span>
              <strong className="text-gray-900 font-bold">3</strong>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Streak</h3>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 max-w-[240px] lg:max-w-none">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-sm border border-gray-200/50"
                />
              ))}
            </div>
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
              Current Streak: <strong className="text-gray-900 font-bold">9 Days</strong>
            </div>
          </div>
        </div>
      </div>

      {editOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 flex justify-end backdrop-blur-[2px]"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="w-full lg:max-w-[1200px] h-full bg-gray-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <EditProfileHeader setEditOpen={setEditOpen} />

            <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
              <div className="w-full md:w-[280px] lg:w-[320px] bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto shrink-0 max-h-[200px] md:max-h-none">
                <ProfileLeftPanel
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm min-h-full">
                  <ActiveForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileCard({ title, description, action }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 leading-relaxed">{description}</p>
      <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition hover:underline">
        {action}
      </button>
    </div>
  )
}