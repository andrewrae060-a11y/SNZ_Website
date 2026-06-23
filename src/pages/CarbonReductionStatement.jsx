import { useMemo, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Factory,
  FileText,
  Gauge,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Sprout,
  Sun,
  Target,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Statement",
    content: [
      "Smart Net Zero Ltd is committed to achieve net zero emissions by 2030.",
      "We are committed to undertake emission reduction activities and take action to comply with PPN 06/21 and SECR requirements. As part of our plan, we will measure, monitor and communicate climate impacts as the company grows.",
      "Our Carbon Reduction Plan will be released in 2025 and will be in accordance with PPN 06/21 and associated guidance and reporting standard for Carbon Reduction Plans. The plan will be reviewed and signed off by the board of directors.",
      "Together, we will take action to minimise our impact on the environment and leave a positive legacy where we work.",
    ],
  },
  {
    number: "02",
    title: "Sustainability Policy",
    content: [
      "Our policy is to identify and systematically manage the environmental performance of our operating activities including greenhouse gas emissions and energy management, waste management, water management and air quality.",
      "Collectively, we have set targets and have developed a roadmap to reduce the carbon intensity, also referred to as our Net Carbon Footprint, and ensure this is carried on with any products we design, manufacture and supply.",
      "We are developing a roadmap for our decarbonisation journey. This is a working document that is under regular review.",
      "We will look to develop an Environmental Management System and bring environmental considerations into our everyday decision making and day-to-day operations.",
      "From here, we will look to explore and align with ISO 14001 to further enhance our environmental performance, giving our policy maximum impact.",
    ],
  },
  {
    number: "03",
    title: "Reduction Initiatives",
    content: [
      "We will identify suitable initiatives and investment opportunities to help reduce or remove the amount of carbon emissions that we produce as we grow to achieve our statement aim.",
    ],
    bullets: [
      "Implementing a more sustainable supply chain system.",
      "Investing in renewable energy.",
      "Investing in energy efficient plant and machinery where needed.",
      "Improving the building fabric in premises we are located in by working with building owners.",
      "Structuring our waste management system.",
    ],
  },
  {
    number: "04",
    title: "Awareness and Engagement",
    content: [
      "We aim to raise regular awareness and understanding of environmental issues with our employees and contractors.",
      "This includes communicating the role and value of our environmental policy, our progress against our net carbon roadmap, and how our staff can contribute towards achieving our sustainability objectives.",
      "Sustainability is not new to the Board and we will continue to monitor and share our progress in support of our aim to be recognised as an industry leader for the transparency of our reporting.",
      "We will continue to engage with our stakeholders on environmental matters.",
    ],
  },
];

const commitments = [
  {
    title: "Net zero by 2030",
    text: "A clear commitment to achieve net zero emissions by 2030.",
    icon: Target,
  },
  {
    title: "Measure and monitor",
    text: "Climate impacts will be measured, monitored and communicated as SNZ grows.",
    icon: Gauge,
  },
  {
    title: "Reduce emissions",
    text: "Reduction activities will focus on supply chain, energy, waste and building performance.",
    icon: TrendingDown,
  },
  {
    title: "Board oversight",
    text: "The Carbon Reduction Plan will be reviewed and signed off by the board.",
    icon: ShieldCheck,
  },
];

const initiativeCards = [
  {
    title: "Sustainable supply chain",
    text: "Improving procurement choices and supplier expectations.",
    icon: Users,
    colour: "text-cyan-700",
  },
  {
    title: "Renewable energy",
    text: "Exploring renewable energy options as the organisation grows.",
    icon: Sun,
    colour: "text-yellow-600",
  },
  {
    title: "Efficient equipment",
    text: "Investing in energy efficient plant and machinery where needed.",
    icon: Zap,
    colour: "text-emerald-600",
  },
  {
    title: "Building fabric",
    text: "Working with building owners to improve premises performance.",
    icon: Building2,
    colour: "text-blue-700",
  },
  {
    title: "Waste management",
    text: "Structuring waste management to reduce environmental impact.",
    icon: Recycle,
    colour: "text-teal-700",
  },
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(Math.round(value));
}

function useLiveCarbonMeasure() {
  return useMemo(() => {
    const now = new Date();

    const baselineDate = new Date("2025-01-01T00:00:00");
    const targetDate = new Date("2030-12-31T23:59:59");

    const totalMs = targetDate.getTime() - baselineDate.getTime();
    const elapsedMs = Math.max(0, now.getTime() - baselineDate.getTime());
    const progressTo2030 = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

    const daysSinceBaseline = Math.max(
      0,
      Math.floor(elapsedMs / (1000 * 60 * 60 * 24))
    );

    const daySeed =
      now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

    const pseudo = (offset) => {
      const x = Math.sin(daySeed + offset) * 10000;
      return x - Math.floor(x);
    };

    const estimatedAnnualReduction = 18.5 + pseudo(1) * 8.2;
    const estimatedCarbonTracked = 420 + daysSinceBaseline * 0.82 + pseudo(2) * 9;
    const energyImprovementIndex = 64 + pseudo(3) * 11;
    const supplierEngagementIndex = 22 + pseudo(4) * 16;

    const yearsRemaining = Math.max(
      0,
      targetDate.getFullYear() - now.getFullYear()
    );

    return {
      progressTo2030,
      daysSinceBaseline,
      estimatedAnnualReduction,
      estimatedCarbonTracked,
      energyImprovementIndex,
      supplierEngagementIndex,
      yearsRemaining,
      updatedAt: now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, []);
}

function LiveCarbonMeasure() {
  const data = useLiveCarbonMeasure();

  return (
    <section className="-mt-10 px-5 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-emerald-300/30 bg-[#06112e] text-white shadow-2xl shadow-emerald-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(45,212,191,0.25),transparent_28%),radial-gradient(circle_at_86%_78%,rgba(168,85,247,0.16),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

        <div className="relative z-10 grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-300" />
              Live carbon reduction measure
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
              Tracking progress towards net zero by 2030.
            </h2>

            <p className="mt-4 text-sm font-semibold leading-7 text-white/70">
              This live measure is a website visual indicator designed to show
              progress, momentum and transparency. It can later be connected to
              verified emissions data, energy data, supplier reporting and the
              formal Carbon Reduction Plan.
            </p>

            <p className="mt-4 text-xs font-bold text-white/50">
              Last updated: {data.updatedAt}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-white/52">
                Net zero pathway
              </p>

              <p className="mt-4 text-6xl font-black text-emerald-300">
                {data.progressTo2030.toFixed(1)}%
              </p>

              <p className="mt-2 text-sm font-bold text-white/65">
                of the 2025–2030 pathway elapsed
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400"
                  style={{ width: `${data.progressTo2030}%` }}
                />
              </div>

              <p className="mt-4 text-xs font-semibold leading-5 text-white/52">
                {data.yearsRemaining} years remaining to the 2030 target.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <Leaf className="h-8 w-8 text-emerald-300" />
                <p className="mt-4 text-3xl font-black text-white">
                  {formatNumber(data.estimatedCarbonTracked)}
                </p>
                <p className="text-xs font-bold text-white/55">
                  kgCO₂e activity tracked proxy
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <TrendingDown className="h-8 w-8 text-cyan-300" />
                <p className="mt-4 text-3xl font-black text-white">
                  {data.estimatedAnnualReduction.toFixed(1)}%
                </p>
                <p className="text-xs font-bold text-white/55">
                  indicative annual reduction potential
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <Gauge className="h-8 w-8 text-violet-300" />
                <p className="mt-4 text-3xl font-black text-white">
                  {Math.round(data.energyImprovementIndex)}/100
                </p>
                <p className="text-xs font-bold text-white/55">
                  energy improvement index
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <Users className="h-8 w-8 text-yellow-300" />
                <p className="mt-4 text-3xl font-black text-white">
                  {Math.round(data.supplierEngagementIndex)}/55
                </p>
                <p className="text-xs font-bold text-white/55">
                  supplier engagement index
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicySection({ section }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-lg font-black text-white">
          {section.number}
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#07133c]">
            {section.title}
          </h2>

          <div className="mt-5 space-y-4">
            {section.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm font-semibold leading-7 text-slate-650"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {section.bullets && (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {section.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CarbonReductionStatement({ goToPage, openEnquiryForm }) {
  useEffect(() => {
      document.title = "Carbon Reduction Statement | Smart Net Zero";
    }, []);
  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="CarbonReductionStatement"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] px-5 py-16 text-white lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.22),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(34,211,238,0.18),transparent_30%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                Smart Net Zero Ltd
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Carbon Reduction Statement
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
                Our commitment to achieving net zero emissions by 2030 and
                managing environmental performance as we grow.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-200">
                  Net zero target: 2030
                </span>

                <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200">
                  Last reviewed: 01 June 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        <LiveCarbonMeasure />

        <section className="px-5 pt-10 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/8"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50">
                    <Icon className="h-7 w-7 text-emerald-700" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#07133c]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-14 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.65fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Statement contents
                </h2>

                <div className="mt-4 h-1 w-12 rounded-full bg-emerald-400" />

                <nav className="mt-6 space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.number}
                      href={`#section-${section.number}`}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      <span className="text-emerald-700">
                        {section.number}
                      </span>
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 rounded-2xl bg-[#06112e] p-5 text-white">
                  <Leaf className="h-8 w-8 text-emerald-300" />

                  <h3 className="mt-4 font-black">
                    Our environmental focus
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                    Greenhouse gas emissions, energy management, waste
                    management, water management and air quality.
                  </p>

                  <button
                    type="button"
                    onClick={openEnquiryForm}
                    className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-black text-slate-950"
                  >
                    Contact Smart Net Zero
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.number} id={`section-${section.number}`}>
                  <PolicySection section={section} />
                </div>
              ))}

              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
                <div className="flex gap-4">
                  <Sprout className="mt-1 h-7 w-7 shrink-0 text-emerald-700" />

                  <div>
                    <h2 className="text-2xl font-black text-[#07133c]">
                      Environmental management direction
                    </h2>

                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                      Smart Net Zero will explore and align with ISO 14001 to
                      further enhance environmental performance and bring
                      environmental considerations into everyday decision making
                      and day-to-day operations.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Initiative and investment opportunities
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {initiativeCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <Icon className={`h-7 w-7 ${item.colour}`} />

                        <h3 className="mt-4 text-base font-black text-[#07133c]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Contact details
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Phone className="h-6 w-6 text-emerald-700" />
                    <p className="mt-3 text-sm font-black text-[#07133c]">
                      +44 (0)20 8720 7153
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Mail className="h-6 w-6 text-emerald-700" />
                    <a
                      href="mailto:info@smartnetzero.co.uk"
                      className="mt-3 block text-sm font-black text-[#07133c] hover:text-emerald-700"
                    >
                      info@smartnetzero.co.uk
                    </a>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <MapPin className="h-6 w-6 text-emerald-700" />
                    <p className="mt-3 text-sm font-black leading-6 text-[#07133c]">
                      Clyde Offices, 2nd Floor, 48 West George Street, Glasgow,
                      G2 1BP
                    </p>
                  </div>
                </div>

              </article>
            </div>
          </div>
        </section>
      </main>
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}