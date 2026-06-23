import { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Download,
  Droplets,
  Factory,
  FileText,
  Filter,
  Gauge,
  Home,
  Leaf,
  LineChart,
  Menu,
  PieChart,
  Recycle,
  Search,
  Settings,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

const kpis = [
  {
    title: "Total Carbon Opportunity",
    value: "91,240",
    unit: "tCO₂e",
    change: "+18%",
    note: "vs previous period",
    icon: CloudCog,
    bg: "from-green-50 to-emerald-100",
    iconBg: "bg-green-100",
    iconColour: "text-green-700",
    spark: "M0 42 C20 38 32 36 52 30 C72 24 84 34 104 25 C126 15 142 26 164 18 C184 10 202 14 220 8",
  },
  {
    title: "Buildings Assessed",
    value: "126",
    unit: "sites",
    change: "+15%",
    note: "coverage increased",
    icon: Building2,
    bg: "from-sky-50 to-cyan-100",
    iconBg: "bg-sky-100",
    iconColour: "text-sky-700",
    spark: "M0 44 C20 42 36 40 54 36 C76 32 88 26 108 28 C130 30 142 18 164 16 C188 13 202 10 220 8",
  },
  {
    title: "Energy Savings Identified",
    value: "18.7",
    unit: "GWh",
    change: "+22%",
    note: "opportunity mapped",
    icon: Zap,
    bg: "from-blue-50 to-indigo-100",
    iconBg: "bg-blue-100",
    iconColour: "text-blue-700",
    spark: "M0 34 C22 44 34 18 54 30 C78 44 88 20 108 22 C132 24 144 12 164 18 C188 24 202 16 220 12",
  },
  {
    title: "Estimated Cost Savings",
    value: "£6.42M",
    unit: "",
    change: "+24%",
    note: "potential annualised saving",
    icon: TrendingDown,
    bg: "from-amber-50 to-orange-100",
    iconBg: "bg-amber-100",
    iconColour: "text-amber-700",
    spark: "M0 40 C22 36 34 42 52 32 C70 22 84 34 104 28 C126 22 140 20 162 16 C184 12 202 14 220 9",
  },
];

const initiatives = [
  {
    name: "Building Energy Optimisation",
    description: "HVAC, controls and lighting improvements",
    category: "Energy",
    status: "In progress",
    progress: 72,
    impact: "850",
    date: "Dec 2026",
  },
  {
    name: "Solar PV Installation",
    description: "On-site renewable generation",
    category: "Renewable",
    status: "In progress",
    progress: 65,
    impact: "620",
    date: "Aug 2026",
  },
  {
    name: "Fleet Electrification",
    description: "EV transition for company vehicles",
    category: "Transport",
    status: "On track",
    progress: 48,
    impact: "310",
    date: "Nov 2026",
  },
  {
    name: "Waste Reduction Programme",
    description: "Reduce waste to landfill",
    category: "Waste",
    status: "Planning",
    progress: 20,
    impact: "120",
    date: "Apr 2027",
  },
];

const opportunities = [
  ["HVAC System Optimisation", "22,340", "£1.62M", "High"],
  ["LED Lighting Upgrade", "14,210", "£0.98M", "High"],
  ["Roof Top Solar PV", "11,780", "£1.35M", "High"],
  ["Building Fabric Improvements", "9,860", "£0.76M", "Medium"],
  ["Demand Response Programme", "7,420", "£0.48M", "Medium"],
];

const alerts = [
  {
    icon: CheckCircle2,
    title: "Great job! Your emissions are 18% lower",
    text: "Compared to the same period last year.",
    colour: "text-green-700",
    bg: "bg-green-50",
  },
  {
    icon: Zap,
    title: "Energy use increased 5% in May",
    text: "Consider reviewing HVAC usage.",
    colour: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    icon: FileText,
    title: "New benchmarking report available",
    text: "See how you compare to peers.",
    colour: "text-violet-700",
    bg: "bg-violet-50",
  },
];

function Sidebar({ goToPage }) {
  const nav = [
    ["Overview", Home],
    ["Emissions", CloudCog],
    ["Energy", Zap],
    ["Water", Droplets],
    ["Waste", Recycle],
    ["Reports", FileText],
    ["Settings", Settings],
  ];

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <button
        type="button"
        onClick={() => goToPage && goToPage("SustainabilityNetZero")}
        className="flex items-center gap-3"
      >
        <img
          src="/snzlogo.png"
          alt="Smart Net Zero"
          className="h-20 w-20 rounded-xl object-contain"
        />
      </button>

      <div className="mt-8">
        <p className="px-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Main
        </p>

        <nav className="mt-3 space-y-1">
          {nav.map(([label, Icon], index) => (
            <button
              key={label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                index === 0
                  ? "bg-green-100 text-green-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-br from-green-50 to-sky-50 p-5">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-green-100">
          <Leaf className="h-7 w-7 text-green-700" />
        </span>
        <h3 className="mt-4 text-base font-black text-slate-950">
          Sustainability Impact
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Track, measure and improve environmental performance.
        </p>
      </div>
    </aside>
  );
}

function TopBar({ goToPage, openEnquiryForm }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-xl border border-slate-200 p-2 lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <button
            type="button"
            onClick={() => goToPage && goToPage("SustainabilityNetZero")}
            className="inline-flex items-center gap-2 text-sm font-black text-slate-600 hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Sustainability & Net Zero
          </button>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-black text-slate-600 xl:flex">
          <button>Services</button>
          <button>Solutions</button>
          <button>Industries</button>
          <button>Insights</button>
          <button>About Us</button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openEnquiryForm}
            className="hidden rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.02] md:inline-flex"
          >
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </button>

          <button className="relative rounded-full border border-slate-200 p-3">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-pink-600" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {["Overview", "Emissions", "Energy", "Water", "Waste", "Reports"].map(
              (item) => (
                <button
                  key={item}
                  className="rounded-xl px-3 py-3 text-left text-sm font-black text-slate-600 hover:bg-slate-100"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Sparkline({ path }) {
  return (
    <svg viewBox="0 0 220 50" className="mt-5 h-12 w-full">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-green-600"
      />
    </svg>
  );
}

function KpiCard({ item }) {
  const Icon = item.icon;

  return (
    <article
      className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${item.bg} p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-black text-slate-600">{item.title}</p>
          <div className="mt-4 flex items-end gap-2">
            <p className="text-4xl font-black text-slate-950">{item.value}</p>
            {item.unit && (
              <p className="pb-1 text-sm font-black text-slate-500">
                {item.unit}
              </p>
            )}
          </div>
          <p className="mt-2 text-sm font-black text-green-700">
            {item.change} <span className="text-slate-500">{item.note}</span>
          </p>
        </div>

        <span className={`grid h-16 w-16 place-items-center rounded-full ${item.iconBg}`}>
          <Icon className={`h-9 w-9 ${item.iconColour}`} />
        </span>
      </div>

      <Sparkline path={item.spark} />
    </article>
  );
}

function EmissionsChart() {
  const points = [
    [0, 180],
    [70, 145],
    [140, 128],
    [210, 136],
    [280, 118],
    [350, 106],
    [420, 95],
    [490, 78],
    [560, 58],
    [630, 38],
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Emissions Over Time
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Actual performance against target pathway
          </p>
        </div>

        <div className="flex gap-2">
          {["MTD", "YTD", "12M", "All"].map((item, index) => (
            <button
              key={item}
              className={`rounded-xl px-3 py-2 text-xs font-black ${
                index === 1
                  ? "bg-green-100 text-green-800"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 h-80">
        <svg viewBox="0 0 700 280" className="h-full w-full">
          {[40, 90, 140, 190, 240].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="700"
              y2={y}
              stroke="#e2e8f0"
              strokeDasharray="6 8"
            />
          ))}

          <path
            d="M0 180 L70 145 L140 128 L210 136 L280 118 L350 106 L420 95 L490 78 L560 58 L630 38 L630 280 L0 280 Z"
            fill="rgba(34,197,94,0.12)"
          />

          <polyline
            points={points.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke="#16a34a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M0 170 C130 150 220 138 320 122 C440 98 560 74 690 44"
            fill="none"
            stroke="#0284c7"
            strokeWidth="4"
            strokeDasharray="10 8"
          />

          {points.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="6"
              fill="#16a34a"
              stroke="white"
              strokeWidth="3"
            />
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs font-black text-slate-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Dec</span>
      </div>
    </div>
  );
}

function ProgressPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">Progress to Net Zero</h3>

      <div className="mt-6 flex items-center gap-6">
        <div className="relative grid h-36 w-36 place-items-center rounded-full bg-conic-gradient">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white">
            <div className="text-center">
              <p className="text-4xl font-black text-slate-950">58%</p>
              <p className="text-xs font-black text-slate-500">Progress</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-slate-500">On track to achieve</p>
          <p className="mt-1 text-xl font-black text-green-700">
            Net Zero by 2050
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            2,170 tCO₂e remaining to target
          </p>
        </div>
      </div>

      <button className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50">
        View Net Zero Roadmap <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}

function ScopePanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">Emissions by Scope</h3>

      <div className="mt-6 flex items-center gap-6">
        <div className="relative grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#16a34a_0_31%,#38bdf8_31%_76%,#8b5cf6_76%_100%)]">
          <div className="h-16 w-16 rounded-full bg-white" />
        </div>

        <div className="flex-1 space-y-3">
          {[
            ["Scope 1", "1,320 tCO₂e", "31%", "bg-green-600"],
            ["Scope 2", "1,890 tCO₂e", "45%", "bg-sky-500"],
            ["Scope 3", "1,020 tCO₂e", "24%", "bg-violet-600"],
          ].map(([label, value, percent, colour]) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${colour}`} />
              <p className="flex-1 text-sm font-black text-slate-600">{label}</p>
              <p className="text-sm font-black text-slate-950">{value}</p>
              <p className="w-10 text-right text-sm font-black text-slate-500">
                {percent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InitiativeTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-950">
          Top Sustainability Initiatives
        </h3>

        <button className="text-sm font-black text-green-700">View all</button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-black uppercase tracking-[0.12em] text-slate-400">
              <th className="py-3">Initiative</th>
              <th>Category</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Impact</th>
              <th>Target</th>
            </tr>
          </thead>

          <tbody>
            {initiatives.map((item) => (
              <tr key={item.name} className="border-b border-slate-100">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100">
                      <Leaf className="h-6 w-6 text-green-700" />
                    </span>
                    <div>
                      <p className="font-black text-slate-950">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                    {item.category}
                  </span>
                </td>

                <td>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-green-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-slate-600">
                      {item.progress}%
                    </span>
                  </div>
                </td>

                <td className="font-black text-slate-700">{item.impact} tCO₂e</td>
                <td className="font-black text-slate-700">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OpportunitiesPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">Top Opportunities</h3>

      <div className="mt-5 space-y-3">
        {opportunities.map(([name, carbon, saving, priority]) => (
          <div
            key={name}
            className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-slate-50 p-4"
          >
            <div>
              <p className="font-black text-slate-950">{name}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {carbon} tCO₂e · {saving}
              </p>
            </div>

            <span
              className={`h-fit rounded-full px-3 py-1 text-xs font-black ${
                priority === "High"
                  ? "bg-pink-100 text-pink-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-950">Insights & Alerts</h3>
        <button className="text-sm font-black text-green-700">View all</button>
      </div>

      <div className="mt-5 space-y-3">
        {alerts.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className={`rounded-2xl ${item.bg} p-4`}>
              <div className="flex gap-3">
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${item.colour}`} />
                <div>
                  <p className="font-black text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardContent() {
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    []
  );

  return (
    <main className="flex-1 bg-slate-50">
      <div className="px-5 py-8 lg:px-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-black text-green-700">
              Sustainability & Net Zero
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Impact Dashboard - Sample Only
            </h1>
            <p className="mt-2 max-w-2xl text-base font-semibold text-slate-500">
              Track sustainability performance, emissions reduction, energy
              savings and progress towards net zero.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
              <Calendar className="mr-2 h-4 w-4" />
              1 Jan 2026 – {today}
            </button>

            <button className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>

            <button className="inline-flex items-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-black text-white shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} item={item} />
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <EmissionsChart />
            <InitiativeTable />
          </div>

          <div className="grid gap-6">
            <ProgressPanel />
            <ScopePanel />
            <InsightsPanel />
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <OpportunitiesPanel />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-950">
              Reporting & Assurance
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-green-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-green-700">
                  ESG Score
                </p>
                <p className="mt-3 text-4xl font-black text-green-700">A-</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  +8 points this year
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-sky-700">
                  Data Quality
                </p>
                <p className="mt-3 text-4xl font-black text-sky-700">92%</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  High confidence
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-violet-700">
                  Reports
                </p>
                <p className="mt-3 text-4xl font-black text-violet-700">14</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Ready to download
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {["ESG Report Q1 2026", "Carbon Report 2026", "TCFD Disclosure Pack"].map(
                (item) => (
                  <button
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-black text-slate-700 hover:bg-slate-50"
                  >
                    {item}
                    <Download className="h-4 w-4" />
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        <p className="mt-8 text-xs font-semibold text-slate-400">
          Sample dashboard for demonstration purposes. Data is illustrative and
          no client data has been used in the production.
        </p>
      </div>
    </main>
  );
}

export default function ImpactDashboard({ goToPage, openEnquiryForm }) {

  useEffect(() => {
    document.title = "SmartImpact360 Dashboard | Smart Net Zero";
  }, []);
  return (
    <div className="flex min-h-screen bg-white text-slate-950 antialiased">
      <Sidebar goToPage={goToPage} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
        <DashboardContent />
      </div>
    </div>
  );
}