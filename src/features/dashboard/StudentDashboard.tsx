import { useState, useEffect } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Courses Enrolled", value: "12", delta: "+2 this week", icon: "📚" },
  { label: "Hours Learned", value: "48", delta: "+5 today", icon: "⏱" },
  { label: "Certificates", value: "3", delta: "2 in progress", icon: "🎓" },
  { label: "Day Streak", value: "14", delta: "Personal best", icon: "🔥" },
];

const continueWatching = [
  { title: "React — The Complete Guide", instructor: "Maximilian S.", progress: 68, done: "28h", total: "42h", tag: "Web Development" },
  { title: "Python for Data Science", instructor: "Jose Portilla", progress: 34, done: "10h", total: "30h", tag: "Data Science" },
  { title: "UI/UX Design Fundamentals", instructor: "Daniel Scott", progress: 82, done: "14h", total: "18h", tag: "Design" },
];

const recommended = [
  { title: "Node.js — Backend Development", instructor: "Andrew Mead", rating: 4.8, students: "18,420", hours: "28h", tag: "Backend", free: true },
  { title: "Advanced CSS & Sass", instructor: "Jonas Schmedtmann", rating: 4.9, students: "34,100", hours: "22h", tag: "Frontend", free: false },
  { title: "Machine Learning A–Z", instructor: "Kirill Eremenko", rating: 4.7, students: "51,300", hours: "44h", tag: "Data Science", free: false },
  { title: "Figma UI Design Bootcamp", instructor: "Caleb Kingston", rating: 4.8, students: "12,800", hours: "16h", tag: "Design", free: true },
];

const Stars = ({ rating }: { rating: number }) => (
  <span className="text-amber-400 text-xs tracking-wide">
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    <span className="text-gray-500 font-medium ml-1">{rating}</span>
  </span>
);

const StudentDashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <div
          className={`flex items-center justify-between transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "40ms" }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-green-800 mb-1">
              Student Dashboard
            </p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-[14px] text-gray-500 mt-1 font-normal">
              Pick up where you left off — your progress awaits.
            </p>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            Explore All Courses
            <span className="text-green-300">→</span>
          </button>
        </div>

        <div
          className={`grid grid-cols-4 gap-4 transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "100ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{s.label}</p>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className="text-[28px] font-bold text-gray-900 tracking-tight leading-none mb-2">{s.value}</p>
              <p className="text-[12px] text-green-700 font-medium bg-green-50 inline-block px-2.5 py-0.5 rounded-full">{s.delta}</p>
            </div>
          ))}
        </div>

        <div
          className={`transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "160ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Continue Watching</h2>
              <p className="text-[13px] text-gray-400 mt-0.5">Resume your active courses</p>
            </div>
            <button className="text-[13px] text-green-800 font-semibold hover:underline">View all</button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {continueWatching.map((c) => (
              <div
                key={c.title}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
              >
                <div className="h-2 bg-green-800 w-full" />

                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-800 bg-green-50 px-2 py-0.5 rounded">
                    {c.tag}
                  </span>

                  <h3 className="text-[14px] font-semibold text-gray-900 mt-2.5 mb-0.5 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 mb-4">{c.instructor}</p>

                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] font-semibold text-green-800">{c.progress}% complete</span>
                    <span className="text-[11px] text-gray-400">{c.done} / {c.total}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-700 rounded-full transition-all duration-700"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>

                  <button className="mt-4 w-full py-2 rounded-lg border border-green-800 text-green-800 text-[13px] font-semibold hover:bg-green-800 hover:text-white transition-all duration-150">
                    ▶ Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "220ms" }}
        >
          <div className="bg-green-900 rounded-xl px-8 py-7 flex items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full opacity-5">
              <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full border-[30px] border-white" />
              <div className="absolute bottom-[-20px] right-[80px] w-32 h-32 rounded-full border-[20px] border-white" />
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-green-400 mb-2">
                Tutor Programme
              </p>
              <h2 className="text-xl font-bold text-white tracking-tight mb-2">
                Ready to Teach &amp; Earn?
              </h2>
              <p className="text-[13.5px] text-green-200 max-w-lg leading-relaxed mb-4 font-normal">
                Share your expertise, build a student base, and earn credits plus real money. Create courses, track engagement analytics, and grow your teaching portfolio.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["Earn Credits", "Real Money", "Analytics Dashboard", "Student Engagement"].map((t) => (
                  <span key={t} className="text-[11px] font-medium text-green-300 border border-green-700 px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="relative z-10 bg-white text-green-900 font-bold text-[13.5px] px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0 shadow-sm"
            >
              Create Tutor Profile →
            </button>
          </div>
        </div>

        <div
          className={`transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "280ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Recommended for You</h2>
              <p className="text-[13px] text-gray-400 mt-0.5">Curated based on your learning history</p>
            </div>
            <button className="text-[13px] text-green-800 font-semibold hover:underline">See all</button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {recommended.map((r) => (
              <div
                key={r.title}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex flex-col"
              >
                <div className="h-1.5 bg-gray-200 w-full" />

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {r.tag}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.free ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                      {r.free ? "Free" : "Premium"}
                    </span>
                  </div>

                  <h3 className="text-[13.5px] font-semibold text-gray-900 leading-snug mb-1">
                    {r.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 mb-3 flex-1">by {r.instructor}</p>

                  <Stars rating={r.rating} />

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-[11.5px] text-gray-500 font-medium">⏱ {r.hours}</span>
                    <span className="text-[11px] text-gray-400">{r.students} enrolled</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
