import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { setUserLogout } from "../features/auth/authSlice";
import Sidebar from "../features/dashboard/Sidebar";

type Props = { children: ReactNode };

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "My Activity", path: "/activity" },
];

/* Hamburger icon — three lines that animate to X */
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
    <span
      className={`block h-[2px] bg-gray-600 rounded-full transition-all duration-300 origin-center ${
        open ? "w-5 rotate-45 translate-y-[7px]" : "w-5"
      }`}
    />
    <span
      className={`block h-[2px] bg-gray-600 rounded-full transition-all duration-200 ${
        open ? "w-0 opacity-0" : "w-4 opacity-100"
      }`}
    />
    <span
      className={`block h-[2px] bg-gray-600 rounded-full transition-all duration-300 origin-center ${
        open ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"
      }`}
    />
  </div>
);

const DashboardLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(setUserLogout());
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">

      {/* Sidebar — slides in/out */}
      <aside
        className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-56" : "w-0"
        }`}
      >
        <div className="w-56 h-full">
          <Sidebar />
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar — seamless, no dividing line between logo area */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10">

          <div className="flex items-center gap-4">
            {/* Hamburger toggle */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <HamburgerIcon open={sidebarOpen} />
            </button>

            {/* Logo — shown when sidebar is closed */}
            {!sidebarOpen && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-green-800 flex items-center justify-center text-sm flex-shrink-0">
                  📚
                </div>
                <span className="text-[14px] font-bold text-gray-900 tracking-tight whitespace-nowrap">
                  Skill<span className="text-green-800">Share</span> Hub
                </span>
              </div>
            )}

            <div className="w-px h-5 bg-gray-200" />

            <nav className="flex items-center gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => navigate(l.path)}
                  className={`px-3.5 py-1.5 rounded-md text-[13.5px] transition-all duration-100 ${
                    location.pathname === l.path
                      ? "bg-green-50 text-green-800 font-semibold"
                      : "text-gray-500 font-normal hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">

            {/* Credits */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5">
              <span className="text-sm">🪙</span>
              <span className="text-[13px] font-semibold text-gray-800">1,000</span>
              <span className="text-[11px] text-gray-400 font-normal">credits</span>
            </div>

            {/* Notification */}
            <button className="relative w-9 h-9 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-[14px] hover:bg-gray-100 transition-colors">
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white" />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200" />

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-[13px] font-bold cursor-pointer flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* Sign out */}
            <button
              onClick={handleLogout}
              className="text-[13px] text-gray-500 font-normal hover:text-red-600 transition-colors px-1"
            >
              Sign out
            </button>

          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-8 py-7">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
