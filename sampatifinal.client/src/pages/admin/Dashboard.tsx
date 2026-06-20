import {
  Image,
  Calendar,
  Trophy,
  Users,
  Images,
  Video,
  Bell,
  Newspaper,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { useDashboardData } from "../../components/hooks/useDashboardData";

const data = [
  { name: "Jan", val: 40 },
  { name: "Feb", val: 30 },
  { name: "Mar", val: 80 },
  { name: "Apr", val: 65 },
  { name: "May", val: 95 },
  { name: "Jun", val: 120 },
];

export default function Dashboard() {
  const {
    banners,
    events,
    toppers,
    committee,
    gallery,
    video,
    notice,
    news,
    loading,
  } = useDashboardData();

  const stats = [
    {
      title: "Banners",
      value: banners.length,
      icon: Image,
      color: "bg-blue-500",
      path: "/dashboard/banner",
    },
    {
      title: "Events",
      value: events.length,
      icon: Calendar,
      color: "bg-orange-500",
      path: "/dashboard/events",
    },
    {
      title: "Toppers",
      value: toppers.length,
      icon: Trophy,
      color: "bg-yellow-500",
      path: "/dashboard/toppers",
    },
    {
      title: "Committee",
      value: committee.length,
      icon: Users,
      color: "bg-emerald-500",
      path: "/dashboard/committee",
    },
    {
      title: "Gallery",
      value: gallery.length,
      icon: Images,
      color: "bg-pink-500",
      path: "/dashboard/gallery",
    },
    {
      title: "Videos",
      value: video.length,
      icon: Video,
      color: "bg-red-500",
      path: "/dashboard/video",
    },
    {
      title: "Notices",
      value: notice.length,
      icon: Bell,
      color: "bg-cyan-500",
      path: "/dashboard/notice",
    },
    {
      title: "News",
      value: news.length,
      icon: Newspaper,
      color: "bg-violet-500",
      path: "/dashboard/news",
    },
  ];

  const totalContent = stats.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className=" p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Manage all website content from one place
            </p>
          </div>

          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl min-w-[180px]">
            <p className="text-xs uppercase tracking-wider text-slate-300">
              Total Content
            </p>
            <h2 className="text-3xl font-bold mt-1">
              {loading ? "..." : totalContent}
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      {item.title}
                    </p>

                    <h3 className="text-3xl font-bold text-slate-900 mt-2">
                      {loading ? "..." : item.value}
                    </h3>
                  </div>

                  <div
                    className={`${item.color} h-12 w-12 rounded-xl flex items-center justify-center text-white`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analytics + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Content Growth
              </h2>
              <p className="text-sm text-slate-500">
                Monthly content additions overview
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="contentGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis dataKey="name" axisLine={false} tickLine={false} />

                  <YAxis axisLine={false} tickLine={false} />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#contentGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-indigo-950 border  rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">
                Quick Actions
              </h2>
              <p className="text-sm text-white">Add new content quickly</p>
            </div>

            <div className="h-72 overflow-y-auto pr-1 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {stats.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-black hover:border-slate-300 transition-all"
                >
                  <span className="text-sm font-medium text-white">
                    Add {item.title}
                  </span>

                  <Plus size={16} className="text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
