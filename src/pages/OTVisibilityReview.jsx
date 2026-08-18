import { useEffect } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSearch,
  Leaf,
  Network,
  Radio,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";

const visibilityBenefits = [
  {
    title: "Understand what OT devices and systems are connected",
    icon: Search,
    colour: "text-violet-700",
    background: "bg-violet-50",
  },
  {
    title:
      "Improve conversations between operational, technology and supplier teams",
    icon: Users,
    colour: "text-violet-700",
    background: "bg-violet-50",
  },
  {
    title: "Identify important relationships and dependencies",
    icon: Network,
    colour: "text-purple-700",
    background: "bg-purple-50",
  },
  {
    title: "Make more informed decisions about priorities",
    icon: ClipboardCheck,
    colour: "text-blue-700",
    background: "bg-blue-50",
  },
  {
    title:
      "Prepare for future security, compliance and resilience requirements",
    icon: ShieldCheck,
    colour: "text-blue-700",
    background: "bg-blue-50",
  },
  {
    title:
      "Understand operational data that supports energy and decarbonisation",
    icon: Leaf,
    colour: "text-emerald-700",
    background: "bg-emerald-50",
  },
];

const reviewOutcomes = [
  "An initial picture of connected OT devices and systems",
  "A clearer view of observable connections and relationships",
  "A better understanding of where information needs to be confirmed",
  "A practical basis for discussing priorities and next steps",
];

const reviewSteps = [
  {
    number: "1",
    title: "Agree scope",
    text: "We agree the sites, systems, objectives and boundaries.",
    icon: FileSearch,
    accent: "text-pink-600",
    iconBackground: "bg-pink-50",
  },
  {
    number: "2",
    title: "Discover",
    text: "We use appropriate discovery activity to build an initial picture of connected OT devices and systems.",
    icon: Radio,
    accent: "text-violet-700",
    iconBackground: "bg-violet-50",
  },
  {
    number: "3",
    title: "Analyse",
    text: "We review the information to identify systems, connections and areas needing more context.",
    icon: Network,
    accent: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    number: "4",
    title: "Report",
    text: "You receive a clear report of findings within the agreed scope to inform planning and priorities.",
    icon: ClipboardCheck,
    accent: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
  {
    number: "5",
    title: "Decide next steps",
    text: "Use the insight to take action, with further support available from Smart Net Zero.",
    icon: ShieldCheck,
    accent: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
];

const discoveryDeliverables = [
  {
    title: "Asset inventory",
    text: "List of discovered OT devices and systems with key details.",
    image: "/ot-visibility-asset-inventory.png",
    imageAlt:
      "Example OT asset inventory dashboard showing discovered devices",
  },
  {
    title: "Network topology",
    text: "Visual map of connections between devices and systems.",
    image: "/ot-visibility-network-topology.png",
    imageAlt:
      "Example OT network topology showing relationships between connected assets",
  },
  {
    title: "Risk overview",
    text: "Summary of observations and areas that may need attention.",
    image: "/ot-visibility-risk-overview.png",
    imageAlt:
      "Example OT discovery risk overview showing observations and priority areas",
  },
  {
    title: "Information gaps",
    text: "Areas where additional information or verification would be useful.",
    image: "/ot-visibility-information-gaps.png",
    imageAlt:
      "Example OT information gap register showing assets requiring further context",
  },
];

function Hero({ openEnquiryForm }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
        <div className="absolute inset-0 -z-30">
          <img
            src="/ot-visibility-review-hero.png"
            alt="Operational technology environment within a modern industrial facility"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,14,40,0.99)_0%,rgba(5,14,40,0.94)_32%,rgba(5,14,40,0.72)_50%,rgba(5,14,40,0.18)_78%,rgba(5,14,40,0.08)_100%)]" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_80%,rgba(219,39,119,0.14),transparent_28%),radial-gradient(circle_at_58%_28%,rgba(79,70,229,0.12),transparent_26%)]" />

        <div className="mx-auto grid min-h-[540px] max-w-7xl items-center px-5 py-16 lg:grid-cols-[0.56fr_0.44fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-pink-500/70 bg-slate-950/30 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-pink-300 backdrop-blur">
              OT Security Service
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Build a clearer
              <br />
              picture of your
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                operational
                <br />
                environment
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-white/82">
              Understand what&apos;s connected across your sites,
              systems and suppliers. An OT visibility review gives
              you the insight to make smarter, safer and more
              efficient decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-violet-950/30 transition hover:scale-[1.02]"
              >
                Discuss an OT Visibility Review
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>

              <a
                href="/OT-Visibility-Checklist.pdf"
                download
                className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-slate-950/25 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
              >
                <Download className="mr-3 h-5 w-5" />
                Download the Checklist
              </a>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </section>
  );
}

function WhyVisibilityMatters() {
  return (
    <section className="bg-white px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black tracking-tight text-[#101a4a] md:text-4xl">
          Why OT visibility matters
        </h2>

        <div className="mt-10 grid gap-x-7 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {visibilityBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`grid h-20 w-20 place-items-center rounded-full ${benefit.background}`}
                >
                  <Icon
                    className={`h-10 w-10 ${benefit.colour}`}
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-5 text-sm font-black leading-6 text-[#101a4a]">
                  {benefit.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReviewEstablishes() {
  return (
    <section className="border-y border-violet-100 bg-gradient-to-r from-violet-50/55 via-white to-blue-50/55 px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#101a4a] md:text-4xl">
            What can an OT visibility review establish?
          </h2>

          <div className="mt-7 grid gap-4">
            {reviewOutcomes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-pink-500 text-blue-700">
                  <Check className="h-3.5 w-3.5" />
                </span>

                <p className="font-semibold leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-violet-100 bg-white p-7 shadow-lg shadow-violet-950/5">
          <div className="grid gap-6 sm:grid-cols-[120px_1fr] sm:items-center">
            <div className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 text-violet-700">
              <img
                src="/ot-visibility-review-focus.png"
                alt="OT visibility review focus"
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#101a4a]">
                Review focus
              </h3>

              <p className="mt-3 font-medium leading-7 text-slate-600">
                The review focuses on visibility and understanding.
                It does not automatically identify every device,
                dependency or vulnerability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewProcess() {
  return (
    <section className="bg-white px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black tracking-tight text-[#101a4a] md:text-4xl">
          How the review works
        </h2>

        <div className="mt-11 grid gap-7 md:grid-cols-5">
          {reviewSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative text-center"
              >
                <div className="flex items-center justify-center gap-4">
                  <span
                    className={`text-4xl font-black ${step.accent}`}
                  >
                    {step.number}
                  </span>

                  <span
                    className={`grid h-16 w-16 place-items-center rounded-full ${step.iconBackground} ${step.accent}`}
                  >
                    <Icon className="h-8 w-8" />
                  </span>
                </div>

                {index < reviewSteps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-6 hidden h-6 w-6 text-blue-400 md:block" />
                )}

                <h3 className="mt-5 font-black text-[#101a4a]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[205px] text-sm font-medium leading-6 text-slate-600">
                  {step.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DiscoveryDeliverables() {
  return (
    <section className="bg-white px-5 pb-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black tracking-tight text-[#101a4a]">
          Example of what discovery could deliver
        </h2>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {discoveryDeliverables.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl"
            >
              <div className="h-44 overflow-hidden border-b border-slate-100 bg-slate-50">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black text-[#101a4a]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-sm italic text-slate-500">
          Deliverables vary depending on the environment, scope and
          discovery approach.
        </p>
      </div>
    </section>
  );
}

function ChecklistCTA() {
  return (
    <section className="bg-white px-5 pb-14 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-pink-600 via-violet-700 to-blue-700 text-white shadow-xl shadow-violet-950/10">
        <div className="grid lg:grid-cols-[180px_1.2fr_0.85fr] lg:items-center">
          <div className="relative hidden h-full min-h-[230px] items-center justify-center bg-white/5 p-6 sm:flex">
            <img
              src="/ot-visibility-checklist-preview.png"
              alt="OT Visibility Checklist preview"
              className="max-h-48 w-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="p-7 md:p-9">
            <h2 className="text-2xl font-black md:text-3xl">
              Start with the OT visibility checklist
            </h2>

            <p className="mt-3 max-w-xl font-medium leading-7 text-white/82">
              A simple way to start the conversation. Organise what
              you already know, identify gaps and consider whether a
              visibility review is the right next step.
            </p>

            <a
              href="/OT-Visibility-Checklist.pdf"
              download
              className="mt-6 inline-flex items-center rounded-xl border border-white/45 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Download the OT Visibility Checklist
            </a>
          </div>

          <div className="border-t border-white/20 p-7 lg:border-l lg:border-t-0 lg:p-9">
            <div className="grid gap-5">
              <ChecklistFeature
                icon={Users}
                text="Support conversations across operations, technology and supplier teams"
              />

              <ChecklistFeature
                icon={Building2}
                text="Better clarity across buildings, estates and infrastructure"
              />

              <ChecklistFeature
                icon={CheckCircle2}
                text="Designed for leaders, not just OT specialists"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistFeature({ icon: Icon, text }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/25 bg-white/10">
        <Icon className="h-6 w-6" />
      </span>

      <p className="text-sm font-bold leading-6 text-white/90">
        {text}
      </p>
    </div>
  );
}

export default function OTVisibilityReview({
  goToPage,
  openEnquiryForm,
}) {
  useEffect(() => {
    document.title =
      "OT Visibility Review | Smart Net Zero";

    const description =
      "Build a clearer picture of your connected operational environment with an OT visibility review from Smart Net Zero.";

    let metaDescription = document.head.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription =
        document.createElement("meta");

      metaDescription.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        metaDescription
      );
    }

    metaDescription.setAttribute(
      "content",
      description
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      {/*
        Using OTSecurityResilience here deliberately keeps
        the parent Services navigation item active without
        requiring another SNZHeader mapping entry.
      */}
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="OTSecurityResilience"
      />

      <main>
        <Hero
          openEnquiryForm={openEnquiryForm}
        />

        <WhyVisibilityMatters />

        <ReviewEstablishes />

        <ReviewProcess />

        <DiscoveryDeliverables />

        <ChecklistCTA />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}