import { useEffect, useMemo, useState } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Cpu,
  Download,
  Eye,
  Lock,
  Network,
  Power,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const services = [
  {
    id: "ot-cyber-risk-resilience-assessments",
    title: "OT Cyber Risk & Resilience Assessments",
    text: "Identify, quantify and prioritise risks across people, processes, technology and assets.",
    image: "/ot-service-risk-bg.png",
        bullets: [
      "Maturity and risk assessments",
      "Threat modelling and scenario analysis",
      "Controls gap analysis",
    ],
  },
  {
    id: "asset-visibility-exposure-monitoring",
    title: "Asset Visibility & Exposure Monitoring",
    text: "Gain continuous visibility into OT assets, networks and vulnerabilities.",
    image: "/ot-service-visibility-bg.png",    
    bullets: [
      "Passive asset discovery",
      "Exposure and vulnerability monitoring",
      "Attack surface intelligence",
    ],
  },
  {
    id: "industrial-incident-preparedness",
    title: "Industrial Incident Preparedness",
    text: "Build readiness to detect, respond and recover from OT cyber incidents.",
    image: "/ot-service-incident-bg.png",   
    bullets: [
      "Incident response planning",
      "Tabletop exercises and simulations",
      "Runbooks and recovery playbooks",
    ],
  },
  {
    id: "secure-by-design-smart-infrastructure",
    title: "Secure-by-Design Smart Infrastructure",
    text: "Assure smart buildings, connected assets, suppliers and OT systems from design through to operation.",
    image: "/ot-service-secure-design-bg.png",
    bullets: [
      "Smart infrastructure assurance reviews",
      "Supplier, device and remote access assurance",
      "Lifecycle governance and evidence packs",
    ],
  },
];

const outcomes = [
  {
    value: "360°",
    title: "Improved Visibility",
    text: "Complete view of OT assets, networks and risks.",
    icon: Eye,
    colour: "text-teal-600",
  },
  {
    value: "65%",
    title: "Faster Response",
    text: "Reduce mean time to detect and respond to incidents.",
    icon: Zap,
    colour: "text-violet-600",
  },
  {
    value: "80%",
    title: "Resilience Readiness",
    text: "Stronger preparedness with tested plans and playbooks.",
    icon: ShieldCheck,
    colour: "text-blue-600",
  },
  {
    value: "70%",
    title: "Reduced Exposure",
    text: "Lower attack surface through continuous monitoring.",
    icon: Lock,
    colour: "text-emerald-600",
  },
  {
    value: "100%",
    title: "Compliance Confidence",
    text: "Align with standards and regulatory expectations.",
    icon: BadgeCheck,
    colour: "text-purple-600",
  },
];

function ThreatPulse() {
  const [threatPulseOpen, setThreatPulseOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Energy");
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");

  const industries = [
    { name: "Energy", riskFactor: 1.28, assetFactor: 1.2, warningFactor: 1.35, resilienceAdjustment: -6 },
    { name: "Water", riskFactor: 1.18, assetFactor: 0.92, warningFactor: 1.2, resilienceAdjustment: -4 },
    { name: "Transport", riskFactor: 1.12, assetFactor: 1.05, warningFactor: 1.16, resilienceAdjustment: -3 },
    { name: "Manufacturing", riskFactor: 1.08, assetFactor: 1.35, warningFactor: 1.12, resilienceAdjustment: -2 },
    { name: "Healthcare", riskFactor: 1.02, assetFactor: 0.82, warningFactor: 1.05, resilienceAdjustment: -1 },
    { name: "Smart Buildings", riskFactor: 0.92, assetFactor: 0.74, warningFactor: 0.88, resilienceAdjustment: 3 },
  ];

  const countries = [
    { name: "United Kingdom", riskFactor: 1.12, assetFactor: 0.92, warningFactor: 1.08 },
    { name: "Europe", riskFactor: 1.05, assetFactor: 1.2, warningFactor: 1.02 },
    { name: "North America", riskFactor: 1.16, assetFactor: 1.42, warningFactor: 1.18 },
    { name: "Middle East", riskFactor: 1.08, assetFactor: 0.86, warningFactor: 1.1 },
    { name: "Asia Pacific", riskFactor: 1.2, assetFactor: 1.55, warningFactor: 1.22 },
  ];

  const selectedIndustryData =
    industries.find((item) => item.name === selectedIndustry) || industries[0];

  const selectedCountryData =
    countries.find((item) => item.name === selectedCountry) || countries[0];

  const resetFilters = () => {
    setSelectedIndustry("Energy");
    setSelectedCountry("United Kingdom");
  };

  const hasChangedFilters =
    selectedIndustry !== "Energy" || selectedCountry !== "United Kingdom";

  const combinedRiskFactor =
    selectedIndustryData.riskFactor * selectedCountryData.riskFactor;

  const combinedAssetFactor =
    selectedIndustryData.assetFactor * selectedCountryData.assetFactor;

  const combinedWarningFactor =
    selectedIndustryData.warningFactor * selectedCountryData.warningFactor;

  const threatPulseScore = Math.max(
    52,
    Math.min(
      94,
      Math.round(
        88 -
          (combinedRiskFactor - 1) * 24 +
          selectedIndustryData.resilienceAdjustment
      )
    )
  );

  const assetsWatched = Math.max(420, Math.round(1284 * combinedAssetFactor));

  const openWarnings = Math.max(
    1,
    Math.round(3 * combinedWarningFactor + (100 - threatPulseScore) / 12)
  );

  const threatStatus =
    threatPulseScore >= 84
      ? "Resilient"
      : threatPulseScore >= 72
      ? "Monitored"
      : threatPulseScore >= 62
      ? "Action required"
      : "Elevated risk";

  const warningStatus =
    openWarnings <= 3
      ? "Low priority queue"
      : openWarnings <= 6
      ? "Prioritised"
      : "Review required";

  const threatPulseLines = [
    {
      type: "system",
      text: `SmartX360 OT Threat Pulse // monitor initialised for ${selectedIndustry} / ${selectedCountry}`,
    },
    {
      type: "scan",
      text: "Scanning smart infrastructure zones: BMS, HVAC, metering, access control, IoT gateways...",
    },
    {
      type: "ok",
      text: `Asset scope loaded // ${assetsWatched.toLocaleString("en-GB")} monitored OT and smart infrastructure assets`,
    },
    {
      type: "ok",
      text: "Zone 01 // Building Management System reachable // encryption active // baseline normal",
    },
    {
      type: "ok",
      text: "Zone 02 // Smart meters reporting // telemetry integrity verified // drift within tolerance",
    },
    {
      type: "warn",
      text: `Zone 03 // ${openWarnings} open warning${openWarnings === 1 ? "" : "s"} detected // priority queue updated`,
    },
    {
      type: "scan",
      text: "Checking OT asset exposure against known threat indicators and abnormal communication paths...",
    },
    {
      type: "ok",
      text: "No active compromise detected // lateral movement indicators not observed",
    },
    {
      type: "warn",
      text: "Recommended action // isolate legacy controller group and schedule resilience review",
    },
    {
      type: "system",
      text: `Threat Pulse score updated: ${threatPulseScore} / 100 // status: ${threatStatus.toLowerCase()}`,
    },
  ];

  const pulseCapabilities = [
    {
      title: "OT asset visibility",
      text: "Identify smart infrastructure, legacy devices and connected operational systems.",
      icon: Network,
    },
    {
      title: "Resilience health scoring",
      text: "Track exposure, control gaps, ageing systems and operational readiness.",
      icon: Activity,
    },
    {
      title: "Threat signal monitoring",
      text: "Detect unusual behaviour, insecure pathways and suspicious communication patterns.",
      icon: Eye,
    },
    {
      title: "Actionable response",
      text: "Translate findings into practical remediation and resilience actions.",
      icon: ShieldCheck,
    },
  ];

  const pulseMetrics = [
    {
      label: "Threat Pulse",
      value: String(threatPulseScore),
      suffix: "/100",
      icon: Activity,
      status: threatStatus,
    },
    {
      label: "Assets watched",
      value: assetsWatched.toLocaleString("en-GB"),
      suffix: "",
      icon: Cpu,
      status: `${selectedIndustry} scope`,
    },
    {
      label: "Open warnings",
      value: String(openWarnings),
      suffix: "",
      icon: AlertTriangle,
      status: warningStatus,
    },
  ];

  const mapNodes = [
    { name: "UK", country: "United Kingdom", x: 42, y: 1 },
    { name: "EU", country: "Europe", x: 48, y: 10 },
    { name: "NA", country: "North America", x: 5, y: 8 },
    { name: "ME", country: "Middle East", x: 68, y: 52 },
    { name: "APAC", country: "Asia Pacific", x: 92, y: 45 },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-800">
              <Radio className="mr-2 h-4 w-4" />
              SmartX360 OT Threat Pulse
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#070A2D] md:text-5xl">
              Continuous resilience health monitoring for smart infrastructure.
            </h2>

            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              SmartX360 OT Threat Pulse gives organisations a live view of how
              exposed, resilient and operationally healthy their connected
              infrastructure is. It continuously monitors OT assets, telemetry
              behaviour, smart building systems, legacy controllers and abnormal
              communication paths to identify early warning signs before they
              become service-impacting incidents.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {pulseCapabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-base font-black text-[#070A2D]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setThreatPulseOpen((current) => !current)}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/20 transition hover:scale-[1.02]"
              >
                {threatPulseOpen ? (
                  <>
                    <X className="mr-2 h-5 w-5" />
                    Close OT terminal
                  </>
                ) : (
                  <>
                    <Terminal className="mr-2 h-5 w-5" />
                    Open OT Threat Pulse terminal
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative lg:pt-1">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-600/20 to-violet-700/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#050816] shadow-2xl shadow-blue-950/30">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>

                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                  <Terminal className="h-4 w-4" />
                  SmartX360 OT Console
                </div>
              </div>

              <div className="relative min-h-[640px] bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(145deg,#050816_0%,#07133a_52%,#020617_100%)] p-5">
                <div className="rounded-3xl border border-cyan-300/15 bg-black/25 p-4">
                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#020617]">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-90"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, rgba(2,6,23,0.10) 0%, rgba(2,6,23,0.22) 100%), url('/ot-global-map-bg.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />

                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.10),transparent_42%)]" />

                      <svg
                        viewBox="0 0 640 300"
                        className="absolute inset-0 h-full w-full"
                        fill="none"
                      >
                        <path
                          d="M70 155 C160 70 260 90 350 145 C455 210 520 155 585 90"
                          stroke="url(#otPulseGradient)"
                          strokeWidth="2"
                          strokeDasharray="7 8"
                          opacity="0.8"
                        />
                        <path
                          d="M95 215 C190 150 280 225 375 175 C455 132 520 205 590 180"
                          stroke="url(#otPulseGradient)"
                          strokeWidth="2"
                          strokeDasharray="5 9"
                          opacity="0.65"
                        />

                        <defs>
                          <linearGradient id="otPulseGradient" x1="0" x2="1">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="55%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#fb7185" />
                          </linearGradient>
                        </defs>

                        {mapNodes.map((node, index) => {
                          const active = selectedCountry === node.country;

                          return (
                            <g
                              key={node.name}
                              className="cursor-pointer"
                              onClick={() => setSelectedCountry(node.country)}
                            >
                              <circle
                                cx={(node.x / 100) * 640}
                                cy={(node.y / 100) * 300}
                                r={active ? "16" : "10"}
                                fill={active ? "#22d3ee" : "#8b5cf6"}
                                opacity={active ? "0.95" : "0.72"}
                              >
                                <animate
                                  attributeName="r"
                                  values={active ? "13;18;13" : "8;12;8"}
                                  dur={`${2 + index * 0.35}s`}
                                  repeatCount="indefinite"
                                />
                              </circle>

                              <text
                                x={(node.x / 100) * 640 + 18}
                                y={(node.y / 100) * 300 + 5}
                                fill="#dffafe"
                                fontSize="12"
                                fontWeight="800"
                              >
                                {node.name}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur">
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
                          Global OT map
                        </p>
                        <p className="mt-1 text-sm font-black text-white">
                          {selectedCountry} / {selectedIndustry}
                        </p>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-xs font-semibold leading-5 text-white/65 backdrop-blur">
                        Concept view of monitored smart infrastructure,
                        industrial telemetry and CNI exposure signals.
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <label className="block rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">
                          Industry filter
                        </span>

                        <select
                          value={selectedIndustry}
                          onChange={(event) =>
                            setSelectedIndustry(event.target.value)
                          }
                          className="mt-3 w-full rounded-xl border border-cyan-300/20 bg-[#020617] px-4 py-3 text-sm font-black text-cyan-100 outline-none"
                        >
                          {industries.map((industry) => (
                            <option key={industry.name} value={industry.name}>
                              {industry.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">
                          Country / region filter
                        </span>

                        <select
                          value={selectedCountry}
                          onChange={(event) =>
                            setSelectedCountry(event.target.value)
                          }
                          className="mt-3 w-full rounded-xl border border-cyan-300/20 bg-[#020617] px-4 py-3 text-sm font-black text-cyan-100 outline-none"
                        >
                          {countries.map((country) => (
                            <option key={country.name} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                        <div className="flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full bg-emerald-300" />
                          <p className="text-sm font-black text-emerald-200">
                            Monitoring profile active
                          </p>
                        </div>

                        <p className="mt-2 text-xs font-semibold leading-5 text-white/62">
                          Filters update the terminal context and simulate how
                          SmartX360 can segment monitoring by sector, geography,
                          asset class and exposure profile.
                        </p>
                      </div>

                      {hasChangedFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/15"
                        >
                          Reset filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {pulseMetrics.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-white/50">
                            {item.label}
                          </p>

                          <Icon className="h-5 w-5 text-cyan-300" />
                        </div>

                        <p className="mt-3 text-3xl font-black text-white">
                          {item.value}
                          <span className="text-sm text-white/50">
                            {item.suffix}
                          </span>
                        </p>

                        <p className="mt-1 text-xs font-semibold text-cyan-200">
                          {item.status}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div
                  className={`mt-5 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black/45 transition-all duration-500 ${
                    threatPulseOpen
                      ? "max-h-[520px] opacity-100"
                      : "max-h-[120px] opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-cyan-300/10 bg-cyan-300/5 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-cyan-300" />

                      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                        Current terminal
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      {threatPulseOpen
                        ? "Live session open"
                        : "Standby preview"}
                    </div>
                  </div>

                  <div className="space-y-2 p-4 font-mono text-xs leading-6">
                    {(threatPulseOpen
                      ? threatPulseLines
                      : threatPulseLines.slice(0, 3)
                    ).map((line, index) => {
                      const colour =
                        line.type === "ok"
                          ? "text-emerald-300"
                          : line.type === "warn"
                          ? "text-amber-300"
                          : line.type === "scan"
                          ? "text-cyan-300"
                          : "text-blue-200";

                      const PrefixIcon =
                        line.type === "ok"
                          ? CheckCircle2
                          : line.type === "warn"
                          ? AlertTriangle
                          : line.type === "scan"
                          ? Zap
                          : Power;

                      return (
                        <div
                          key={`${line.type}-${index}`}
                          className="grid grid-cols-[22px_1fr] gap-2"
                        >
                          <PrefixIcon className={`mt-1 h-4 w-4 ${colour}`} />

                          <p className={colour}>
                            <span className="text-white/35">
                              [{String(index + 1).padStart(2, "0")}]
                            </span>{" "}
                            {line.text}
                          </p>
                        </div>
                      );
                    })}

                    {threatPulseOpen && (
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="animate-pulse text-cyan-200">
                          smartx360@ot-threat-pulse:~$ monitoring active_
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!threatPulseOpen && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold leading-6 text-white/70">
                      Open the terminal to view an example of SmartX360 checking
                      OT asset health, telemetry integrity, threat indicators
                      and resilience actions in real time.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StandardModalShell({ open, onClose, children, maxWidth = "max-w-6xl" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/75 px-4 py-8 backdrop-blur-md">
      <div className={`mx-auto ${maxWidth}`}>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-20 grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6 md:p-9">{children}</div>
        </div>
      </div>
    </div>
  );
}

function OTCyberRiskAssessmentModal({ open, onClose, openEnquiryForm }) {
  const outcomeCards = [
    ["Reduce cyber exposure", "Identify and close the most significant attack pathways.", ShieldCheck, "text-cyan-600", "bg-cyan-50"],
    ["Strengthen operational resilience", "Improve readiness, recovery and continuity of operations.", Zap, "text-violet-600", "bg-violet-50"],
    ["Support compliance & assurance", "Align with standards and regulatory expectations.", CheckCircle2, "text-sky-600", "bg-sky-50"],
  ];

  const useCases = [
    ["Assess OT cyber readiness", Zap, "text-cyan-600"],
    ["Strengthen infrastructure resilience", Building2, "text-sky-600"],
    ["Reduce risk and meet compliance goals", ShieldCheck, "text-violet-600"],
  ];

  return (
    <StandardModalShell open={open} onClose={onClose} maxWidth="max-w-5xl">
      <div className="flex items-center gap-3 text-sm font-black text-cyan-700">
        Smart Net Zero service
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-[#070A2D] md:text-5xl">
            OT Cyber Risk & Resilience Assessment
          </h2>
          <div className="mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-cyan-500 to-violet-700" />
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-slate-600">
            Identify, prioritise and strengthen cyber resilience across critical
            OT systems and operations.
          </p>
        </div>

        <div className="grid gap-4">
          {outcomeCards.map(([title, text, Icon, colour, bg]) => (
            <div
              key={title}
              className="grid grid-cols-[72px_1fr] gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className={`grid h-16 w-16 place-items-center rounded-2xl ${bg}`}>
                <Icon className={`h-9 w-9 ${colour}`} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#070A2D]">{title}</h3>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-violet-50 p-6 shadow-sm">
        <h3 className="text-xl font-black text-[#070A2D]">
          Your resilience snapshot
        </h3>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-slate-700">Resilience score</p>
            <div className="mt-3 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 p-5 text-white shadow-xl shadow-blue-950/15">
              <p className="text-5xl font-black">
                82<span className="ml-1 text-2xl font-semibold text-white/80">/100</span>
              </p>
              <p className="mt-4 text-sm font-black text-white/85">
                Maturity level
              </p>
              <span className="mt-2 inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-black text-white">
                Advancing
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Scale: 0 Low — 100 High
            </p>
          </div>

          <div className="flex justify-center overflow-visible px-6">
            <div className="relative h-64 w-full max-w-[360px] overflow-visible">
              <svg viewBox="-60 0 380 270" className="h-full w-full overflow-visible">
                <polygon points="130,20 225,75 225,185 130,240 35,185 35,75" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.35)" />
                <polygon points="130,50 199,90 199,170 130,210 61,170 61,90" fill="transparent" stroke="rgba(14,165,233,0.25)" />
                <polygon points="130,82 170,105 170,157 130,183 90,157 90,105" fill="transparent" stroke="rgba(14,165,233,0.18)" />

                {[
                  [130, 130, 130, 20],
                  [130, 130, 225, 75],
                  [130, 130, 225, 185],
                  [130, 130, 130, 240],
                  [130, 130, 35, 185],
                  [130, 130, 35, 75],
                ].map(([x1, y1, x2, y2], index) => (
                  <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(14,165,233,0.18)" />
                ))}

                <polygon points="130,48 188,98 178,173 130,207 77,176 76,100" fill="rgba(6,182,212,0.24)" stroke="#0891b2" strokeWidth="3" />

                {[
                  [130, 48],
                  [188, 98],
                  [178, 173],
                  [130, 207],
                  [77, 176],
                  [76, 100],
                ].map(([cx, cy], index) => (
                  <circle key={index} cx={cx} cy={cy} r="5" fill="#0891b2" />
                ))}

                <text x="130" y="14" textAnchor="middle" className="fill-slate-700 text-[12px] font-black">Visibility</text>
                <text x="242" y="78" textAnchor="start" className="fill-slate-700 text-[12px] font-black">Protection</text>
                <text x="242" y="190" textAnchor="start" className="fill-slate-700 text-[12px] font-black">Monitoring</text>
                <text x="130" y="262" textAnchor="middle" className="fill-slate-700 text-[12px] font-black">Recovery</text>
                <text x="18" y="190" textAnchor="end" className="fill-slate-700 text-[12px] font-black">Assurance</text>
                <text x="18" y="78" textAnchor="end" className="fill-slate-700 text-[12px] font-black">Risk</text>
              </svg>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-sm font-black text-slate-700">At risk assets</p>
            <p className="mt-2 text-5xl font-black text-violet-700">28</p>
            <p className="mt-3 text-sm font-black text-slate-700">
              High risk assets
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              +7 since last scan
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-[#070A2D]">Typical use cases</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {useCases.map(([title, Icon, colour], index) => (
            <div
              key={title}
              className={`flex items-center gap-4 ${
                index > 0 ? "md:border-l md:border-slate-200 md:pl-6" : ""
              }`}
            >
              <Icon className={`h-9 w-9 shrink-0 ${colour}`} />
              <p className="text-sm font-black leading-5 text-slate-700">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ModalCTA
        label="Request assessment"
        onClick={() => {
          onClose();
          openEnquiryForm && openEnquiryForm();
        }}
      />
    </StandardModalShell>
  );
}

function AssetVisibilityExposureModal({ open, onClose, openEnquiryForm }) {
  return (
    <GenericServiceModal
      open={open}
      onClose={onClose}
      openEnquiryForm={openEnquiryForm}
      eyebrow="SmartX360 visibility layer"
      eyebrowIcon={Eye}
      title="Asset Visibility & Exposure Monitoring"
      description="Build a live, evidence-led view of your OT estate, exposed infrastructure, vulnerable pathways and operational risk signals. The service helps organisations move from fragmented asset lists to continuous visibility and prioritised exposure reduction."
      rightTitle="Live asset intelligence"
      rightEyebrow="Exposure command view"
      status="Monitoring"
      cta="Request visibility review"
      cards={[
        ["Known OT assets", "1,284", "Discovered", Cpu],
        ["Unknown devices", "37", "Needs review", AlertTriangle],
        ["External exposure", "12", "Priority paths", Eye],
        ["Critical pathways", "8", "Segment or monitor", Network],
      ]}
      layers={[
        ["Asset discovery", "Build a reliable inventory of OT, IoT, smart building and infrastructure assets.", Cpu],
        ["Exposure mapping", "Identify internet-facing systems, weak pathways and risky network routes.", Network],
        ["Vulnerability context", "Prioritise vulnerabilities by asset criticality, exposure and operational impact.", AlertTriangle],
        ["Continuous monitoring", "Track change, drift and new exposure signals across the estate.", Activity],
      ]}
      useCases={[
        "Create a trusted OT asset inventory",
        "Identify exposed smart infrastructure",
        "Prioritise vulnerabilities by business impact",
        "Support NIS, CAF, ISO 27001 and resilience assurance",
        "Reduce blind spots across suppliers and legacy systems",
        "Feed monitoring and response into SmartX360 Threat Pulse",
      ]}
    />
  );
}

function IndustrialIncidentPreparednessModal({
  open,
  onClose,
  openEnquiryForm,
}) {
  return (
    <GenericServiceModal
      open={open}
      onClose={onClose}
      openEnquiryForm={openEnquiryForm}
      eyebrow="SmartX360 incident readiness layer"
      eyebrowIcon={AlertTriangle}
      title="Industrial Incident Preparedness"
      description="Build the practical capability to detect, contain, respond and recover from OT cyber incidents before they become major operational disruptions. This service turns plans into tested, role-based action."
      rightTitle="OT response simulation"
      rightEyebrow="Incident command view"
      status="Exercise mode"
      cta="Request incident readiness review"
      cards={[
        ["Response readiness", "76/100", "Developing", ShieldCheck],
        ["Recovery confidence", "68/100", "Needs testing", RefreshCw],
        ["Critical runbooks", "14", "Mapped", CheckCircle2],
        ["Scenario gaps", "6", "Prioritised", AlertTriangle],
      ]}
      layers={[
        ["Prepare", "Define incident roles, escalation routes, decision points and operational priorities.", Target],
        ["Detect & contain", "Clarify how OT disruption, cyber compromise and abnormal process signals are triaged.", Activity],
        ["Respond", "Build practical playbooks for isolation, safe-mode operations and supplier coordination.", Zap],
        ["Recover", "Test restoration routes, evidence capture, lessons learned and operational restart criteria.", RefreshCw],
      ]}
      useCases={[
        "Create OT incident response plans and decision trees",
        "Run executive and technical tabletop exercises",
        "Test cyber disruption and operational recovery scenarios",
        "Define safe isolation and restoration procedures",
        "Improve supplier, facilities and engineering coordination",
        "Evidence resilience readiness for assurance and compliance",
      ]}
    />
  );
}

function SecureByDesignSmartInfrastructureModal({
  open,
  onClose,
  openEnquiryForm,
}) {
  return (
    <GenericServiceModal
      open={open}
      onClose={onClose}
      openEnquiryForm={openEnquiryForm}
      eyebrow="Smart Infrastructure Assurance"
      eyebrowIcon={ShieldCheck}
      title="Secure-by-Design Smart Infrastructure"
      description="Assure smart buildings, connected assets, OT systems and infrastructure supply chains from design through to operation. This service helps organisations evidence that smart infrastructure is secure, resilient, compliant and supportable across its full lifecycle."
      rightTitle="Assurance command view"
      rightEyebrow="Secure design & assurance model"
      status="Assurance mode"
      cta="Request assurance review"
      cards={[
        ["Assurance coverage", "91/100", "Strong baseline", ShieldCheck],
        ["Control evidence", "84%", "Mapped", CheckCircle2],
        ["Supplier risks", "11", "Needs review", AlertTriangle],
        ["Lifecycle gaps", "7", "Prioritised", RefreshCw],
      ]}
      layers={[
        [
          "Design assurance",
          "Review architecture, network zones, data flows, integrations and control boundaries before deployment.",
          Network,
        ],
        [
          "Product & supplier assurance",
          "Assess connected devices, vendor controls, remote access, support models and supply chain security obligations.",
          ShieldCheck,
        ],
        [
          "Regulatory & standards evidence",
          "Map assurance activity to relevant governance, cyber, data protection, resilience and compliance expectations.",
          CheckCircle2,
        ],
        [
          "Lifecycle governance",
          "Embed change control, patching, monitoring, evidence capture, incident readiness and ongoing assurance into operations.",
          RefreshCw,
        ],
      ]}
      useCases={[
        "Assure smart building, BMS, IoT, metering and OT projects before deployment",
        "Review smart infrastructure architecture before procurement or supplier appointment",
        "Assess connected device, supplier, cloud platform and remote access risks",
        "Create assurance evidence packs for boards, clients, auditors and delivery partners",
        "Define secure-by-design requirements for tenders, specifications and project governance",
        "Align design and operation with ISO 27001, NIS/CAF, Cyber Essentials, resilience and data protection expectations",
      ]}
    />
  );
}

function GenericServiceModal({
  open,
  onClose,
  openEnquiryForm,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  rightTitle,
  rightEyebrow,
  status,
  cta,
  cards,
  layers,
  useCases,
}) {
  return (
    <StandardModalShell open={open} onClose={onClose}>
      <div className="flex items-center gap-3 text-sm font-black text-cyan-700">
        <EyebrowIcon className="h-6 w-6" />
        {eyebrow}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-[#070A2D] md:text-5xl">
            {title}
          </h2>

          <div className="mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-700" />

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            {description}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {layers.map(([layerTitle, layerText, Icon]) => (
              <div
                key={layerTitle}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-base font-black text-[#070A2D]">
                  {layerTitle}
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {layerText}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-5 text-white shadow-xl shadow-blue-950/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                {rightEyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-black">{rightTitle}</h3>
            </div>

            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-300">
              {status}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {cards.map(([label, value, cardStatus, Icon]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-white/50">
                    {label}
                  </p>
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>

                <p className="mt-3 text-4xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold text-cyan-200">
                  {cardStatus}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
              SmartX360 operating model
            </p>

            <div className="mt-5 grid gap-3">
              {layers.map(([layerTitle, layerText, Icon], index) => (
                <div
                  key={layerTitle}
                  className="relative grid grid-cols-[54px_1fr] gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    {index < layers.length - 1 && (
                      <div className="absolute left-[21px] top-12 h-8 w-px bg-cyan-300/25" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-white">
                      {layerTitle}
                    </h4>
                    <p className="mt-1 text-xs font-semibold leading-5 text-white/62">
                      {layerText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-violet-50 p-6">
        <h3 className="text-xl font-black text-[#070A2D]">
          What the service helps you achieve
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
              <p className="text-sm font-bold leading-6 text-slate-700">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ModalCTA
        label={cta}
        onClick={() => {
          onClose();
          openEnquiryForm && openEnquiryForm();
        }}
      />
    </StandardModalShell>
  );
}

function ModalCTA({ label, onClick }) {
  return (
    <>
      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-700 px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/20 transition hover:scale-[1.02]"
        >
          {label} <ArrowRight className="ml-3 h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
        <Lock className="h-4 w-4 text-cyan-600" />
        Designed for OT environments, connected assets and operational
        resilience.
      </div>
    </>
  );
}

function ServiceCard({
  service,
  highlighted = false,
  onOpenAssessment,
  onOpenAssetVisibility,
  onOpenIncidentPreparedness,
  onOpenSecureDesign,
}) {
  const Icon = service.icon;

  const handleOpen = () => {
    if (
      service.id === "ot-cyber-risk-resilience-assessments" &&
      typeof onOpenAssessment === "function"
    ) {
      onOpenAssessment();
      return;
    }

    if (
      service.id === "asset-visibility-exposure-monitoring" &&
      typeof onOpenAssetVisibility === "function"
    ) {
      onOpenAssetVisibility();
      return;
    }

    if (
      service.id === "industrial-incident-preparedness" &&
      typeof onOpenIncidentPreparedness === "function"
    ) {
      onOpenIncidentPreparedness();
      return;
    }

    if (
      service.id === "secure-by-design-smart-infrastructure" &&
      typeof onOpenSecureDesign === "function"
    ) {
      onOpenSecureDesign();
    }
  };

  return (
    <article
      className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10 ${
        highlighted
          ? "border-cyan-400 ring-4 ring-cyan-200 shadow-2xl shadow-cyan-950/20"
          : "border-slate-200"
      }`}
    >
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(6,17,46,0.04), rgba(6,17,46,0.40)), url('${service.image}')`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(34,211,238,0.20),transparent_32%)]" />       

        {highlighted && (
          <div className="absolute right-5 top-5 rounded-full border border-cyan-300/40 bg-cyan-300/15 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-100 backdrop-blur">
            Selected
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black leading-tight text-[#07133c]">
          {service.title}
        </h3>

        <p className="mt-3 min-h-[72px] text-sm font-semibold leading-6 text-slate-600">
          {service.text}
        </p>

        <ul className="mt-5 space-y-2">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-sm font-semibold text-slate-700"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {bullet}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleOpen}
          className="mt-6 inline-flex items-center text-sm font-black text-teal-700"
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function Outcomes() {
  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#07133c]">
            Business Impact & Outcomes
          </h2>

          <p className="mt-3 text-base font-semibold text-slate-600">
            Stronger security posture. Lower risk. More resilient operations.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {outcomes.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <Icon className={`mx-auto h-10 w-10 ${item.colour}`} />

                <p className={`mt-4 text-5xl font-black ${item.colour}`}>
                  {item.value}
                </p>

                <h3 className="mt-3 text-base font-black text-[#07133c]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SOCSecretTeaser() {
  const features = [
    ["AI-augmented", "Threat detection", Target],
    ["Multi-source", "Telemetry fusion", Activity],
    ["Automated", "Response orchestration", RefreshCw],
    ["Expert-led", "Insight & advisory", Sparkles],
  ];

  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] text-white shadow-2xl shadow-slate-900/20">
        <div
          className="relative grid gap-8 bg-cover bg-center p-8 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.94) 34%, rgba(6,17,46,0.70) 58%, rgba(6,17,46,0.20) 100%), url('/ot-soc-teaser-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <span className="inline-flex rounded-full bg-gradient-to-r from-pink-600 to-violet-700 px-4 py-2 text-xs font-black uppercase tracking-[0.12em]">
              Coming soon
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
              A new intelligence-led
              <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                OT SOC model
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/76">
              We’re developing the next generation of OT Security Operations:
              AI-supported analytics, threat hunting and response automation
              designed to transform how smart infrastructure is monitored,
              managed and kept secure.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([title, text, Icon]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <Icon className="h-7 w-7 text-cyan-300" />
                  <p className="mt-3 text-sm font-black">{title}</p>
                  <p className="text-xs font-semibold text-white/60">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden min-h-[360px] lg:block" />
        </div>
      </div>
    </section>
  );
}

function CTA({ openEnquiryForm }) {
  return (
    <section className="bg-white px-5 pb-16 pt-4 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl md:p-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.92) 38%, rgba(6,17,46,0.58) 68%, rgba(6,17,46,0.18) 100%), url('/ot-cta-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="max-w-3xl text-3xl font-black md:text-4xl">
              Ready to strengthen your OT security and operational resilience?
            </h2>

            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
              Let’s build a safer, smarter and more resilient future together.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
          >
            Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function OTSecurityResilience({ goToPage, openEnquiryForm }) {

  useEffect(() => {
    document.title = "OT Security & Resilience | Smart Net Zero";
  }, []);

  const [riskAssessmentOpen, setRiskAssessmentOpen] = useState(false);
  const [assetVisibilityOpen, setAssetVisibilityOpen] = useState(false);
  const [incidentPreparednessOpen, setIncidentPreparednessOpen] =
    useState(false);
  const [secureDesignOpen, setSecureDesignOpen] = useState(false);

  const [highlightedServiceId, setHighlightedServiceId] = useState(null);

  useEffect(() => {
    const serviceToOpen = sessionStorage.getItem("otSecurityOpenService");

    if (!serviceToOpen) return;

    setHighlightedServiceId(serviceToOpen);

    setTimeout(() => {
      const target = document.getElementById("ot-services");

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);

    sessionStorage.removeItem("otSecurityOpenService");
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="OTSecurityResilience"
      />

      <main>
        <section className="relative overflow-hidden rounded-b-[2rem] bg-[#06112e] pb-12 pt-14 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.90) 34%, rgba(6,17,46,0.42) 68%, rgba(6,17,46,0.08) 100%), url('/ot-security-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_38%_85%,rgba(168,85,247,0.16),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-sm font-black text-cyan-200">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-300" />
                A Smart Net Zero service
              </div>

              <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                OT Security &
                <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Resilience
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/82">
                Securing critical smart infrastructure, industrial systems,
                connected assets and operational environments.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:scale-[1.02]"
                >
                  Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <a
                  href="/Smart_Net_Zero_OTSecurity_Brochure_2026.pdf"
                  download
                  className="inline-flex items-center rounded-2xl border border-cyan-300/40 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                  Download Brochure <Download className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <ThreatPulse />

        <section id="ot-services" className="bg-white px-5 py-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black tracking-tight text-[#07133c]">
                Our OT Security Solutions
              </h2>

              <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                End-to-end services to protect, strengthen and future-proof your
                operational technology environment.
              </p>
            </div>

            <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  highlighted={highlightedServiceId === service.id}
                  onOpenAssessment={() => setRiskAssessmentOpen(true)}
                  onOpenAssetVisibility={() => setAssetVisibilityOpen(true)}
                  onOpenIncidentPreparedness={() =>
                    setIncidentPreparednessOpen(true)
                  }
                  onOpenSecureDesign={() => setSecureDesignOpen(true)}
                />
              ))}
            </div>
          </div>
        </section>

        <Outcomes />

        <SOCSecretTeaser />

        <CTA openEnquiryForm={openEnquiryForm} />
      </main>

      <OTCyberRiskAssessmentModal
        open={riskAssessmentOpen}
        onClose={() => setRiskAssessmentOpen(false)}
        openEnquiryForm={openEnquiryForm}
      />

      <AssetVisibilityExposureModal
        open={assetVisibilityOpen}
        onClose={() => setAssetVisibilityOpen(false)}
        openEnquiryForm={openEnquiryForm}
      />

      <IndustrialIncidentPreparednessModal
        open={incidentPreparednessOpen}
        onClose={() => setIncidentPreparednessOpen(false)}
        openEnquiryForm={openEnquiryForm}
      />

      <SecureByDesignSmartInfrastructureModal
        open={secureDesignOpen}
        onClose={() => setSecureDesignOpen(false)}
        openEnquiryForm={openEnquiryForm}
      />
     <SNZFooter goToPage={goToPage} /> 
    </div>
  );
}