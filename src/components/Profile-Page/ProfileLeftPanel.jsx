import { FilePlus } from "lucide-react"

const ProfileLeftPanel = ({ activeSection, setActiveSection }) => {

  const sections = [
    { id: "basic", name: "Basic Details", required: true },
    { id: "resume", name: "Resume" },
    { id: "about", name: "About", required: true },
    { id: "skills", name: "Skills", required: true },
    { id: "education", name: "Education", required: true },
    { id: "experience", name: "Work Experience" },
    { id: "accomplishments", name: "Accomplishments & Initiatives" },
    { id: "personal", name: "Personal Details" },
    { id: "social", name: "Social Links" }
  ]

  const progress = 59

  return (
    <div className="w-[95%] h-full flex flex-col pl-5 pt-5 pb-5 gap-5">

      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-4 py-4 text-white hover:shadow-lg transition cursor-pointer overflow-hidden">
        <img
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/6759602d8aecd_resume_image.png"
          className="absolute right-3 top-2 w-16 opacity-90"
        />

        <div className="flex items-center gap-3 relative z-10">
          <FilePlus size={18} />
          <span className="text-sm font-semibold">
            Create your Resume
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4  shadow-sm flex flex-col flex-1">

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Complete your Profile
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Stay ahead of the competition by regularly updating your profile.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-[6px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-xs font-semibold text-gray-700">
            {progress}%
          </span>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1 mt-4 space-y-1 ">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                relative flex items-center justify-between
                text-sm px-3 py-2 rounded-lg
                cursor-pointer transition
                ${activeSection === section.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >

              <div className="flex items-center gap-2 py-2 ">
                <div
                  className={`w-3 h-3 rounded-full border
  ${activeSection === section.id
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                    }`}
                />                <span>{section.name}</span>
              </div>

              {section.required && (
                <span className="text-[10px] px-2 py-[2px] rounded bg-red-100 text-red-700 border border-red-300">
                  Required
                </span>
              )}

              {activeSection === section.id && (
                <div className="absolute right-0 top-0 h-full w-[3px] bg-blue-600 rounded-r-md" />
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default ProfileLeftPanel