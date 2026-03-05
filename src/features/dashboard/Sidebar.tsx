import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { UserRole } from "../../shared/types/user.Type";

const navConfig: Record<UserRole, { label: string; path: string }[]> = {
  student: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Learning", path: "/courses" },
    { label: "Progress", path: "/progress" },
  ],
  tutor: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Courses", path: "/my-courses" },
    { label: "Create Course", path: "/create-course" },
  ],
  premiumTutor: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Courses", path: "/my-courses" },
    { label: "Create Course", path: "/create-course" },
    { label: "Analytics", path: "/analytics" },
    { label: "Revenue", path: "/revenue" },
  ],
  admin: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
    { label: "Approvals", path: "/approvals" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ],
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  if (!user) return null;

  const items = navConfig[user.role];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">

      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-green-800 flex items-center justify-center text-base flex-shrink-0">
          📚
        </div>
        <span className="text-[15px] font-bold text-gray-900 tracking-tight">
          Skill<span className="text-green-800">Share</span> Hub
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pb-2">
          Menu
        </p>

        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-md text-[13.5px] transition-all duration-100 border-l-[3px] ${
                active
                  ? "bg-green-50 border-green-800 text-green-800 font-semibold"
                  : "border-transparent text-gray-500 font-normal hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200">
          <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-[11px] text-gray-500 capitalize">{user.role}</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
