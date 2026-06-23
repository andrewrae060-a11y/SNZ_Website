import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Factory,
  Gauge,
  Leaf,
  LineChart,
  MonitorCog,
  Network,
  Target,
  TrendingDown,
  Wallet,
  Zap,
} from "lucide-react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";

const approachCards = [
  {
    title: "Measure & Analyse",
    text: "We assess energy usage, identify inefficiencies and benchmark current performance.",
    icon: BarChart3,
  },
  {
    title: "Optimise & Improve",
    text: "We implement tailored interventions to reduce consumption and improve efficiency.",
    icon: Target,
  },
  {
    title: "Monitor & Control",
    text: "We use smart systems and analytics to monitor performance in real time.",
    icon: MonitorCog,
  },
  {
    title: "Sustain & Evolve",
    text: "We drive continuous improvement to support net zero and future operational goals.",
    icon: Leaf,
  },
];

const solutionItems = [
  {
    key: "energy-strategy",
    tabLabel: "Energy Strategy",
    title: "Energy Strategy & Advisory",
    image: "/energy-strategy-tab-image.png",
    summary:
      "We develop clear, actionable energy strategies aligned to your business goals, regulatory requirements and net zero ambitions.",
    bullets: [
      "Energy audits and baseline assessments",
      "Net zero roadmap development",
      "Policy and governance advisory",
      "Business case development",
    ],
  },
  {
    key: "building-optimisation",
    tabLabel: "Building Optimisation",
    title: "Building Energy Optimisation",
    image: "/building-optimisation-tab-image.png",
    summary:
      "Optimise building performance through smarter controls, improved system efficiency and targeted interventions.",
    bullets: [
      "HVAC and controls optimisation",
      "Building performance tuning",
      "Smart building integration",
      "Occupancy and energy-use analysis",
    ],
  },
  {
    key: "infrastructure-optimisation",
    tabLabel: "Infrastructure Optimisation",
    title: "Infrastructure Energy Performance",
    image: "/infrastructure-optimisation-tab-image.png",
    summary:
      "Improve the efficiency and resilience of infrastructure assets, utilities and connected operational environments.",
    bullets: [
      "Infrastructure energy reviews",
      "Operational efficiency assessments",
      "Critical asset performance analysis",
      "Resilience and continuity alignment",
    ],
  },
  {
    key: "renewable-integration",
    tabLabel: "Renewable Integration",
    title: "Renewables & Low-Carbon Integration",
    image: "/renewable-integration-tab-image.png",
    summary:
      "Support the integration of renewable technologies and low-carbon interventions into wider energy strategies.",
    bullets: [
      "Solar and renewable opportunity studies",
      "Storage and flexibility options",
      "Decarbonisation interventions",
      "Investment and implementation planning",
    ],
  },
  {
    key: "monitoring-analytics",
    tabLabel: "Monitoring & Analytics",
    title: "Monitoring, Analytics & Control",
    image: "/monitoring-analytics-tab-image.png",
    summary:
      "Unlock better energy decisions with monitoring, analytics and operational intelligence across assets and sites.",
    bullets: [
      "Energy dashboard design",
      "Real-time monitoring and reporting",
      "Performance analytics and anomaly detection",
      "Continuous improvement insight",
    ],
  },
];

const impactStats = [
  {
    title: "20–30%",
    text: "Average energy cost savings",
    icon: Zap,
  },
  {
    title: "25–40%",
    text: "Reduction in carbon emissions",
    icon: Leaf,
  },
  {
    title: "Improved",
    text: "Energy resilience & reliability",
    icon: Gauge,
  },
  {
    title: "Stronger ROI",
    text: "Through efficiency & optimisation",
    icon: Wallet,
  },
];

function SectionHeading({ eyebrow, title, text, align = "center" }) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>

      {text && (
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {text}
        </p>
      )}
    </div>
  );
}

function Hero({ openEnquiryForm, onScrollToSolutions }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_74%_22%,rgba(6,182,212,.22),transparent_26%),radial-gradient(circle_at_92%_60%,rgba(34,211,238,.16),transparent_28%),linear-gradient(120deg,#06112e_0%,#071936_52%,#020817_100%)]" />

      <div className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(6,17,46,0.99) 0%,rgba(6,17,46,0.95) 34%,rgba(6,17,46,0.70) 58%,rgba(6,17,46,0.14) 100%),url('/energy-optimisation-hero-bg.png')",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative z-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-teal-200 backdrop-blur">
              <LineChart className="h-4 w-4" />
              Smarter energy. Lower cost. Greater impact.
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Energy Performance
              <br />
              <span className="bg-gradient-to-r from-teal-200 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Optimisation
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-bold leading-8 text-white/90">
              Smarter energy performance across buildings, infrastructure and operations.
            </p>

            <p className="mt-4 max-w-2xl leading-7 text-white/68">
              We help organisations optimise energy performance across buildings,
              infrastructure and operations—reducing cost, carbon and risk while
              improving resilience and sustainability.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-teal-300 to-cyan-400 px-7 py-4 font-black text-slate-950 shadow-xl transition hover:scale-[1.02]"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={onScrollToSolutions}
                className="inline-flex items-center rounded-2xl border border-teal-300/40 bg-white/5 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white/10"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute -bottom-px left-0 right-0 h-12 bg-white [clip-path:polygon(0_78%,100%_0,100%_100%,0_100%)]" />
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our approach"
          title="Data-led. Performance-driven. Future-ready."
          text="We combine data, technology and expert analysis to uncover opportunities, optimise performance and create lasting value."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {approachCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="relative text-center"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-teal-200 bg-teal-50">
                  <Icon className="h-10 w-10 text-teal-700" />
                </div>

                <h3 className="mt-6 text-2xl font-black text-slate-950">
                  {card.title}
                </h3>

                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-slate-600">
                  {card.text}
                </p>

                {index < approachCards.length - 1 && (
                  <div className="absolute right-[-16px] top-10 hidden h-24 w-px bg-slate-200 xl:block" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection({ openEnquiryForm }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSolution = useMemo(
    () => solutionItems[activeIndex],
    [activeIndex]
  );

  const goPrev = () => {
    setActiveIndex((current) =>
      current === 0
        ? solutionItems.length - 1
        : current - 1
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === solutionItems.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <section
      id="energy-solutions"
      className="scroll-mt-28 bg-slate-50 px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our solutions"
          title="Comprehensive energy optimisation solutions"
          text="Explore how we help your organisation reduce energy use, strengthen resilience and improve performance."
        />

        <div className="mt-10">
          {/* Solution tabs */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 border-b border-slate-200 pb-4">
            {solutionItems.map((item, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative pb-2 text-base font-semibold transition ${
                    active
                      ? "text-teal-700"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-pressed={active}
                >
                  {item.tabLabel}

                  {active && (
                    <motion.span
                      layoutId="energy-solution-active-tab"
                      className="absolute bottom-[-5px] left-0 h-[3px] w-full rounded-full bg-teal-600"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative mt-8">
            <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Active solution image */}
              <motion.div
                key={`${activeSolution.key}-image`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
              >
                <div className="relative min-h-[350px] overflow-hidden bg-slate-200 lg:h-full lg:min-h-[430px]">
                  {/* Fallback displayed behind the image */}
                  <div className="absolute inset-0 z-0 grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200 text-center">
                    <div className="max-w-sm p-8">
                      <Building2 className="mx-auto h-14 w-14 text-slate-400" />

                      <p className="mt-4 text-sm font-black uppercase tracking-[0.15em] text-slate-500">
                        Solution image
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        The image could not be loaded.
                      </p>

                      <p className="mt-2 break-all text-xs font-semibold text-slate-600">
                        {activeSolution.image}
                      </p>
                    </div>
                  </div>

                  {/* Image displayed above the fallback */}
                  <img
                    key={activeSolution.image}
                    src={activeSolution.image}
                    alt={activeSolution.title}
                    loading="eager"
                    className="absolute inset-0 z-10 h-full w-full object-cover object-center"
                    onError={(event) => {
                      console.error(
                        "Unable to load solution image:",
                        activeSolution.image
                      );

                      event.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Subtle image overlay */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 z-30 rounded-full border border-white/20 bg-slate-950/55 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white backdrop-blur">
                    {activeSolution.tabLabel}
                  </div>
                </div>
              </motion.div>

              {/* Active solution content */}
              <motion.div
                key={`${activeSolution.key}-content`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-lg md:p-9"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                  Energy optimisation solution
                </p>

                <h3 className="mt-3 text-3xl font-black leading-tight text-slate-950">
                  {activeSolution.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {activeSolution.summary}
                </p>

                <div className="mt-6 grid gap-3">
                  {activeSolution.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />

                      <p className="text-sm font-medium leading-6 text-slate-700">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="mt-7 inline-flex w-fit items-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-black text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Learn More

                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </div>

            {/* Previous solution */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-[-24px] top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-teal-300 hover:text-teal-700 lg:grid"
              aria-label="Previous energy optimisation solution"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Next solution */}
            <button
              type="button"
              onClick={goNext}
              className="absolute right-[-24px] top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-teal-300 hover:text-teal-700 lg:grid"
              aria-label="Next energy optimisation solution"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Mobile previous and next controls */}
            <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
              <button
                type="button"
                onClick={goPrev}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
                aria-label="Previous energy optimisation solution"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
                aria-label="Next energy optimisation solution"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slider dots */}
            <div className="mt-6 flex justify-center gap-2">
              {solutionItems.map((item, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition-all ${
                      active
                        ? "h-3 w-8 bg-teal-600"
                        : "h-3 w-3 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Show ${item.tabLabel}`}
                    aria-pressed={active}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The impact"
          title="Better for your business. Better for the planet."
          text="Our optimisation programmes support lower cost, reduced emissions, improved resilience and stronger long-term value."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {impactStats.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon className="h-7 w-7" />
                  </span>

                  <div>
                    <h3 className="text-2xl font-black text-teal-700">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection({ openEnquiryForm }) {
  return (
    <section className="bg-white px-5 pb-16 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] bg-cover bg-center p-8 text-white shadow-2xl md:p-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(6,17,46,0.97) 0%,rgba(6,17,46,0.92) 45%,rgba(6,17,46,0.52) 100%),url('/energy-optimisation-cta-bg.png')",
        }}
      >
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-2xl text-4xl font-black leading-tight">
              Ready to optimise your energy performance?
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
              Let’s unlock efficiency, reduce costs and build a more sustainable
              future—together.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-300 to-cyan-400 px-8 py-4 font-black text-slate-950 shadow-xl transition hover:scale-[1.02]"
          >
            Talk to an Expert
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function EnergyOptimisation({
  goToPage,
  openEnquiryForm,
}) {

useEffect(() => {
    document.title = "Energy Performance Optimisation | Smart Net Zero";
}, []);

  const scrollToSolutions = () => {
    document.getElementById("energy-solutions")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="EnergyOptimisation"
      />

      <main>
        <Hero
          openEnquiryForm={openEnquiryForm}
          onScrollToSolutions={scrollToSolutions}
        />

        <ApproachSection />

        <SolutionsSection openEnquiryForm={openEnquiryForm} />

        <ImpactSection />

        <CTASection openEnquiryForm={openEnquiryForm} />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}