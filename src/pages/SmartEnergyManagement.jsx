import { useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BatteryCharging,
  Building2,
  CheckCircle2,
  CloudLightning,
  Download,
  Factory,
  Gauge,
  GraduationCap,
  HeartPulse,
  Landmark,
  LineChart,
  Lock,
  MessageCircle,
  PieChart,
  PlugZap,
  PoundSterling,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";

const heroMetrics = [
  {
    label: "Total Consumption",
    value: "2,840",
    unit: "MWh",
    change: "18% vs last month",
    icon: Gauge,
  },
  {
    label: "Total Cost",
    value: "£342,560",
    unit: "",
    change: "14% vs last month",
    icon: PoundSterling,
  },
  {
    label: "Carbon Emissions",
    value: "752",
    unit: "tCO₂e",
    change: "16% vs last month",
    icon: CloudLightning,
  },
  {
    label: "Energy Intensity",
    value: "42.6",
    unit: "kWh/m²",
    change: "9% vs last month",
    icon: Activity,
  },
];

const servicePillars = [
  {
    title: "Energy Monitoring",
    text: "Real-time visibility of energy consumption across sites, assets and systems.",
    icon: LineChart,
    colour: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Demand Response",
    text: "Automatically respond to grid signals and market opportunities to reduce costs.",
    icon: Zap,
    colour: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Energy Audits",
    text: "Identify inefficiencies and uncover savings with detailed assessments and reporting.",
    icon: CheckCircle2,
    colour: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Energy Benchmarking",
    text: "Compare performance against benchmarks to set targets and drive improvement.",
    icon: BarChart3,
    colour: "text-pink-600",
    bg: "bg-pink-50",
  },
];

const platformCards = [
  {
    title: "Fault Detection & Diagnostics",
    text: "AI-powered detection of anomalies and equipment issues to prevent failures and reduce downtime.",
    icon: Gauge,
    points: [
      "Continuous monitoring",
      "Anomaly detection",
      "Root cause analysis",
      "Proactive alerts",
    ],
    colour: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Energy Information & Analytics",
    text: "Transform complex energy data into clear insights to inform better decisions.",
    icon: BarChart3,
    points: [
      "Advanced dashboards",
      "Custom reports",
      "Trend and pattern analysis",
      "Carbon tracking",
    ],
    colour: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Automated Optimisation",
    text: "Intelligent automation that optimises operations and maximises energy savings.",
    icon: Sparkles,
    points: [
      "Control optimisation",
      "Schedule automation",
      "Load management",
      "Continuous improvement",
    ],
    colour: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const impactStats = [
  {
    value: "£180k+",
    label: "Average annual savings per site",
    icon: PoundSterling,
    colour: "text-emerald-300",
  },
  {
    value: "18–30%",
    label: "Reduction in energy consumption",
    icon: Zap,
    colour: "text-cyan-300",
  },
  {
    value: "750+ tCO₂e",
    label: "Average annual carbon reduction",
    icon: CloudLightning,
    colour: "text-violet-300",
  },
  {
    value: "12–24",
    label: "Month typical payback",
    icon: PieChart,
    colour: "text-pink-300",
  },
  {
    value: "24/7",
    label: "Monitoring and proactive support",
    icon: ShieldCheck,
    colour: "text-emerald-300",
  },
];

const whoWeHelp = [
  {
    title: "Estates & Campuses",
    text: "Reduce energy costs and carbon across multi-site portfolios.",
    image: "/energy-help-estates.png",
    icon: Building2,
    colour: "bg-emerald-500",
  },
  {
    title: "Commercial & Offices",
    text: "Optimise operations and improve efficiency in workspace environments.",
    image: "/energy-help-offices.png",
    icon: Building2,
    colour: "bg-blue-500",
  },
  {
    title: "Healthcare",
    text: "Enhance reliability, compliance and comfort while reducing costs.",
    image: "/energy-help-healthcare.png",
    icon: HeartPulse,
    colour: "bg-violet-500",
  },
  {
    title: "Education",
    text: "Create efficient, resilient learning environments for the future.",
    image: "/energy-help-education.png",
    icon: GraduationCap,
    colour: "bg-pink-500",
  },
  {
    title: "Public Sector",
    text: "Achieve sustainability goals with transparent reporting and control.",
    image: "/energy-help-public.png",
    icon: Landmark,
    colour: "bg-emerald-500",
  },
  {
    title: "Industrial & Utilities",
    text: "Improve energy intensity and operational performance.",
    image: "/energy-help-industrial.png",
    icon: Factory,
    colour: "bg-orange-500",
  },
];

function HeroDashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-cyan-400/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07152e]/92 p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-cyan-200">
              <Gauge className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-black text-white">Energy Overview</p>
              <p className="text-xs font-semibold text-white/45">
                Live portfolio intelligence
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/70">
              All Sites
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/70">
              Last 30 Days
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-white/45">
                    {metric.label}
                  </p>
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>

                <p className="mt-3 text-2xl font-black text-white">
                  {metric.value}
                  {metric.unit && (
                    <span className="ml-1 text-sm text-white/55">
                      {metric.unit}
                    </span>
                  )}
                </p>

                <p className="mt-1 text-xs font-bold text-emerald-300">
                  ↓ {metric.change}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-white">
                Energy Consumption
              </p>
              <p className="text-xs font-bold text-white/45">Actual vs Plan</p>
            </div>

            <svg viewBox="0 0 520 190" className="mt-4 h-44 w-full">
              <defs>
                <linearGradient id="energyFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[40, 80, 120, 160].map((y) => (
                <line
                  key={y}
                  x1="20"
                  x2="500"
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                />
              ))}

              <path
                d="M20 145 C70 135 82 80 130 94 C180 108 192 58 240 72 C294 88 310 122 360 92 C420 55 450 70 500 42"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <path
                d="M20 160 C70 155 98 120 130 128 C180 136 205 105 240 112 C300 130 325 150 375 122 C430 100 462 114 500 84"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeDasharray="7 8"
                strokeLinecap="round"
              />

              <path
                d="M20 145 C70 135 82 80 130 94 C180 108 192 58 240 72 C294 88 310 122 360 92 C420 55 450 70 500 42 L500 180 L20 180 Z"
                fill="url(#energyFill)"
              />
            </svg>

            <div className="mt-2 flex gap-5 text-xs font-bold text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Actual
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Forecast
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <p className="text-sm font-black text-white">
              Consumption by Source
            </p>

            <div className="mt-5 grid grid-cols-[120px_1fr] items-center gap-5">
              <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(#22d3ee_0_62%,#8b5cf6_62%_86%,#fb7185_86%_96%,#f59e0b_96%_100%)]">
                <div className="absolute inset-5 grid place-items-center rounded-full bg-[#07152e] text-center">
                  <p className="text-xl font-black text-white">2,840</p>
                  <p className="text-[10px] font-bold text-white/45">MWh</p>
                </div>
              </div>

              <div className="space-y-3 text-xs font-bold text-white/70">
                {[
                  ["Electricity", "62%", "bg-cyan-300"],
                  ["Gas", "24%", "bg-violet-400"],
                  ["Heat", "10%", "bg-pink-400"],
                  ["Other", "4%", "bg-amber-400"],
                ].map(([label, value, colour]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${colour}`} />
                      {label}
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-emerald-300/10 p-3 text-xs font-bold text-emerald-200">
              £48,200 potential annual savings identified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SmartEnergyManagement({ goToPage, openEnquiryForm }) {
  useEffect(() => {
    document.title = "Smart Energy Management | Smart Net Zero";
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SmartEnergyManagement"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] px-5 py-16 text-white lg:px-8 lg:py-20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.94) 34%, rgba(6,17,46,0.62) 66%, rgba(6,17,46,0.20) 100%), url('/smart-energy-hero-bg.png')",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_30%_90%,rgba(16,185,129,0.16),transparent_36%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                Our service
              </p>

              <h1 className="mt-5 max-w-xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Smart Energy Management
              </h1>

              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/82">
                Reduce energy costs, optimise performance and drive
                sustainability with data-driven insights and intelligent
                automation.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-emerald-950/20 transition hover:scale-[1.02]"
                >
                  Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <a
                  href="/Smart_Net_Zero_Smart_Energy_Brochure_2026.pdf"
                  download
                  className="inline-flex items-center rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                  Download Brochure <Download className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            <HeroDashboardMockup />
          </div>
        </section>

        <section className="bg-white px-5 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black tracking-tight text-[#07133c]">
                Efficient. Smart. Sustainable.
              </h2>

              <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />

              <p className="mt-5 text-base font-semibold leading-7 text-slate-600">
                Our energy management services help you gain control, improve
                efficiency and achieve your net zero goals.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {servicePillars.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`text-center ${
                      index > 0 ? "lg:border-l lg:border-slate-200" : ""
                    }`}
                  >
                    <div
                      className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${item.bg}`}
                    >
                      <Icon className={`h-9 w-9 ${item.colour}`} />
                    </div>

                    <h3 className="mt-6 text-lg font-black text-[#07133c]">
                      {item.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-xs text-sm font-semibold leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black tracking-tight text-[#07133c]">
                Our Smart Energy Management Platform
              </h2>

              <p className="mt-4 text-base font-semibold text-slate-600">
                Integrated capabilities that deliver insights, intelligence and
                action.
              </p>
            </div>

            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {platformCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
                  >
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl ${card.bg}`}
                    >
                      <Icon className={`h-8 w-8 ${card.colour}`} />
                    </div>

                    <h3 className="mt-5 text-xl font-black text-[#07133c]">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {card.text}
                    </p>

                    <ul className="mt-5 space-y-3">
                      {card.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                        >
                          <CheckCircle2
                            className={`h-4 w-4 shrink-0 ${card.colour}`}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#06112e] px-5 py-14 text-white lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.15),transparent_35%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(115deg,transparent_0%,rgba(34,211,238,0.12)_45%,transparent_75%)]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight">
                Why It Matters
              </h2>

              <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />

              <p className="mt-4 text-sm font-semibold text-white/70">
                Measurable impact for your business, your bottom line and the
                planet.
              </p>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-5">
              {impactStats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`text-center ${
                      index > 0 ? "lg:border-l lg:border-white/15" : ""
                    }`}
                  >
                    <Icon className={`mx-auto h-11 w-11 ${item.colour}`} />

                    <p className="mt-5 text-4xl font-black">{item.value}</p>

                    <p className="mx-auto mt-2 max-w-[180px] text-sm font-semibold leading-6 text-white/72">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-4xl font-black tracking-tight text-[#07133c]">
                Who We Help
              </h2>

              <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {whoWeHelp.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className="h-36 bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(6,17,46,0.04), rgba(6,17,46,0.30)), url('${item.image}')`,
                      }}
                    />

                    <div className="relative p-5">
                      <div
                        className={`absolute -top-8 grid h-14 w-14 place-items-center rounded-2xl ${item.colour} text-white shadow-lg`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mt-7 text-base font-black text-[#07133c]">
                        {item.title}
                      </h3>

                      <p className="mt-2 min-h-[78px] text-sm font-semibold leading-6 text-slate-600">
                        {item.text}
                      </p>
                      
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-16 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] text-white shadow-xl">
            <div className="relative grid gap-7 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_70%,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_15%_30%,rgba(16,185,129,0.22),transparent_30%)]" />

              <div className="relative flex items-start gap-5">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-300">
                  <MessageCircle className="h-10 w-10" />
                </div>

                <div>
                  <h2 className="text-3xl font-black">
                    Ready to take control of your energy?
                  </h2>

                  <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/76">
                    Speak with our experts to see how Smart Net Zero can help
                    your organisation save costs and achieve net zero.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
              </div>
            </div>
          </div>
        </section>
      </main>
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}