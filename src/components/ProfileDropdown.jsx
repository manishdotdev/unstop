import { ChevronRight, LogOut, Pencil } from "lucide-react"
import { useNavigate } from "react-router-dom"
const ProfileDropdown = ({ onProfileSelect, onLogoutSelect }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[999]">

      <div className="max-h-[420px] overflow-y-auto p-4 space-y-4">

        <div className="bg-gray-50 rounded-2xl p-4">

          <div className="flex items-start justify-between">

            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                <img
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/35.png?d=70x70"
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-yellow-600">
                17%
              </span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition">
              <Pencil size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-800" onClick={onProfileSelect}>
                Edit Profile
              </span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-lg font-bold text-gray-900">
              Divyansh Choudhary
            </div>
            <div className="text-sm text-gray-500">
              user@gmail.com
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 space-y-3">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.unstop.com/assets/icons/dualtone-award.svg"
                className="w-5 h-5"
                alt=""
              />
              <span className="text-sm font-medium text-gray-800">
                Your Global Rank
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              NA
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.unstop.com/assets/icons/star.svg"
                className="w-5 h-5"
                alt=""
              />
              <span className="text-sm font-medium text-gray-800">
                Your Points
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              —
            </span>
          </div>

        </div>

      </div>

      <div className="border-t border-gray-200 p-3">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition" onClick={onLogoutSelect}>
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </div>
  )
}

export default ProfileDropdown