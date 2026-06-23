import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Unlock,
  User,
  Wifi,
  X,
} from "lucide-react";

const researchItems = [
  {
    id: 1,
    documentId: "building-decarbonisation-optimised-retrofitting-model",
    title: "Building Decarbonisation Optimised Retrofitting Model",
    description:
      "A data-driven model to optimise retrofit strategies and deliver measurable carbon reductions across the building stock.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    icon: Building2,
    tags: ["Research", "Net Zero", "University Partnership"],
    colour: "from-emerald-500 to-green-700",
  },
  {
    id: 2,
    documentId: "skills-centre-of-excellence-smart-infrastructure",
    title: "Skills Centre of Excellence for Smart Infrastructure",
    description:
      "Framework and roadmap for building a national skills pipeline for the design, delivery and operation of smart infrastructure.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    icon: GraduationCap,
    tags: ["Research", "Skills", "University Partnership"],
    colour: "from-blue-500 to-indigo-700",
  },
  {
    id: 3,
    documentId: "iot-sensory-intelligent-fault-management",
    title: "IoT Sensory Intelligent Fault Management",
    description:
      "Exploring IoT sensor networks and AI-driven analytics to detect, diagnose and predict faults in infrastructure assets.",
    image: "/iot-fault-management-bg.png",
    icon: Wifi,
    tags: ["Research", "IoT", "Feasibility"],
    colour: "from-cyan-500 to-teal-700",
  },
  {
    id: 4,
    documentId: "smart-building-compliance-intelligence",
    title: "Smart Building Compliance Intelligence",
    description:
      "A research programme exploring how AI and regulatory intelligence can support safer, more compliant smart building operations.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    icon: ShieldCheck,
    tags: ["Research", "Compliance", "AI"],
    colour: "from-violet-500 to-purple-700",
  },
  {
    id: 5,
    documentId: "climate-risk-index-built-assets",
    title: "Climate Risk Index for Built Assets",
    description:
      "A location-based model to assess climate exposure, infrastructure vulnerability and investment priorities across building portfolios.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    icon: BarChart3,
    tags: ["Research", "Climate Risk", "Data"],
    colour: "from-emerald-500 to-teal-700",
  },
  {
    id: 6,
    documentId: "cyber-physical-resilience-critical-infrastructure",
    title: "Cyber-Physical Resilience for Critical Infrastructure",
    description:
      "Research into integrated cyber, operational and physical resilience models for smart infrastructure and essential services.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    icon: Lock,
    tags: ["Research", "Resilience", "Security"],
    colour: "from-pink-500 to-violet-700",
  },
];

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return {};
  }

  return response.json();
}

function Hero({
  authStatus,
  authenticatedUser,
  onAccessRequest,
  onLogin,
  onLogout,
  accessPanel,
  setAccessPanel,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_25%,rgba(20,184,166,.26),transparent_26%),radial-gradient(circle_at_88%_58%,rgba(37,99,235,.24),transparent_30%),linear-gradient(120deg,#06112e_0%,#071936_48%,#020817_100%)]" />

      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-cover bg-center opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(6,17,46,0.98) 0%,rgba(6,17,46,0.86) 32%,rgba(6,17,46,0.34) 68%,rgba(6,17,46,0.08) 100%),url('/research-hero-bg.png')",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(45,212,191,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Research & Insights
            </h1>

            <div className="mt-6 h-1.5 w-24 rounded-full bg-teal-400" />

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/84">
              Smart Net Zero develops research-led solutions through
              collaboration with universities, industry, and public and private
              sector partners.
            </p>

            <div className="mt-8 flex items-start gap-5 text-2xl font-semibold italic leading-10 text-teal-300">
              <span className="text-6xl leading-none text-teal-300">“</span>
              <p>Collaboration turns ideas into resilient, net zero outcomes.</p>
              <span className="self-end text-6xl leading-none text-emerald-300">
                ”
              </span>
            </div>
          </motion.div>
        </div>

        <SubscribePanel
          authStatus={authStatus}
          authenticatedUser={authenticatedUser}
          onAccessRequest={onAccessRequest}
          onLogin={onLogin}
          onLogout={onLogout}
          activePanel={accessPanel}
          setActivePanel={setAccessPanel}
        />
      </div>
    </section>
  );
}

function SubscribePanel({
  authStatus,
  authenticatedUser,
  onAccessRequest,
  onLogin,
  onLogout,
  activePanel,
  setActivePanel,
}) {
  const [accessForm, setAccessForm] = useState({
    fullName: "",
    email: "",
    organisation: "",
    role: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    pin: "",
  });

  const [requestStatus, setRequestStatus] = useState("idle");
  const [loginStatus, setLoginStatus] = useState("idle");
  const [requestError, setRequestError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleAccessRequestSubmit = async (event) => {
    event.preventDefault();

    setRequestError("");
    setRequestStatus("submitting");

    try {
      await onAccessRequest(accessForm);

      setRequestStatus("submitted");

      setAccessForm({
        fullName: "",
        email: "",
        organisation: "",
        role: "",
      });
    } catch (error) {
      setRequestStatus("idle");
      setRequestError(
        error instanceof Error
          ? error.message
          : "Your access request could not be submitted."
      );
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setLoginError("");
    setLoginStatus("submitting");

    try {
      await onLogin(loginForm);

      setLoginStatus("idle");

      setLoginForm({
        email: "",
        pin: "",
      });
    } catch (error) {
      setLoginStatus("idle");
      setLoginError(
        error instanceof Error
          ? error.message
          : "The email or PIN is incorrect."
      );
    }
  };

    const isLoggedIn = authStatus === "authenticated";

  const accessBenefits = [
    {
      icon: FileText,
      title: "Early access",
      text: "Be among the first to explore newly published research.",
    },
    {
      icon: Unlock,
      title: "Full PDF library",
      text: "Open and download complete research papers and reports.",
    },
    {
      icon: Mail,
      title: "Research updates",
      text: "Receive updates about new publications and programmes.",
    },
  ];

  return (
    <section
      id="subscribe"
      className="mt-7 rounded-3xl border border-teal-300/40 bg-white/5 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl lg:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Left-hand introduction and benefits */}
        <div>
          <div className="flex items-start gap-4">
            <div className="hidden h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:block">
              <img
                src="/research-lock-graphic.png"
                alt="Secure research library access"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="pt-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">
                Research library
              </p>

              <h2 className="mt-2 max-w-lg text-2xl font-black leading-tight md:text-3xl">
                Subscribe for free to unlock our research library
              </h2>

            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {accessBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/12 bg-[#071936]/60 p-4"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-teal-300/20 to-cyan-400/10 text-teal-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-3 text-base font-black text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-white/65">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logged-in state or access forms */}
        {isLoggedIn ? (
          <div className="rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              Research access active
            </p>

            <h3 className="mt-2 text-2xl font-black">
              You are logged in
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/75">
              {authenticatedUser?.email
                ? `Access is active for ${authenticatedUser.email}.`
                : "Your approved research-library session is active."}
            </p>

            <button
              type="button"
              onClick={onLogout}
              className="mt-4 rounded-xl border border-white/25 px-5 py-2.5 text-sm font-black transition hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-[#071936]/65 p-1.5">
              <button
                type="button"
                onClick={() => setActivePanel("request")}
                className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                  activePanel === "request"
                    ? "bg-gradient-to-r from-teal-300 to-emerald-400 text-slate-950"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Request access
              </button>

              <button
                type="button"
                onClick={() => setActivePanel("login")}
                className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                  activePanel === "login"
                    ? "bg-gradient-to-r from-teal-300 to-emerald-400 text-slate-950"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Log in with PIN
              </button>
            </div>

            {activePanel === "request" && (
              <form
                onSubmit={handleAccessRequestSubmit}
                className="rounded-2xl border border-white/15 bg-[#071936]/65 p-4"
              >
                <p className="mb-3 text-sm leading-6 text-white/70">
                  Access research papers, reports and practical briefings developed with universities, industry and public-sector partners. Submit your details for review by our Research team.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="relative block">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

                    <input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      value={accessForm.fullName}
                      onChange={(event) =>
                        setAccessForm((current) => ({
                          ...current,
                          fullName: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/20 bg-[#071936] py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/55 focus:border-teal-300"
                    />
                  </label>

                  <label className="relative block">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="Work email"
                      value={accessForm.email}
                      onChange={(event) =>
                        setAccessForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/20 bg-[#071936] py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/55 focus:border-teal-300"
                    />
                  </label>

                  <label className="relative block">
                    <FileText className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

                    <input
                      type="text"
                      autoComplete="organization"
                      placeholder="Company name (optional)"
                      value={accessForm.organisation}
                      onChange={(event) =>
                        setAccessForm((current) => ({
                          ...current,
                          organisation: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/20 bg-[#071936] py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/55 focus:border-teal-300"
                    />
                  </label>

                  <label className="relative block">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

                    <select
                      value={accessForm.role}
                      onChange={(event) =>
                        setAccessForm((current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/20 bg-[#071936] py-3 pl-12 pr-4 text-white outline-none focus:border-teal-300"
                    >
                      <option value="" className="bg-[#071936] text-white">
                        Your role (optional)
                      </option>

                      <option
                        value="Board / Executive"
                        className="bg-[#071936] text-white"
                      >
                        Board / Executive
                      </option>

                      <option
                        value="Sustainability"
                        className="bg-[#071936] text-white"
                      >
                        Sustainability
                      </option>

                      <option
                        value="Energy"
                        className="bg-[#071936] text-white"
                      >
                        Energy
                      </option>

                      <option
                        value="Infrastructure"
                        className="bg-[#071936] text-white"
                      >
                        Infrastructure
                      </option>

                      <option
                        value="Security / Resilience"
                        className="bg-[#071936] text-white"
                      >
                        Security / Resilience
                      </option>

                      <option
                        value="Operations"
                        className="bg-[#071936] text-white"
                      >
                        Operations
                      </option>

                      <option
                        value="Academic / Research"
                        className="bg-[#071936] text-white"
                      >
                        Academic / Research
                      </option>
                    </select>
                  </label>
                </div>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-xs text-white/65">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" />
                      Your details are used only to review your request.
                    </p>

                    {requestError && (
                      <p
                        role="alert"
                        className="mt-2 text-sm font-bold text-rose-300"
                      >
                        {requestError}
                      </p>
                    )}

                    {requestStatus === "submitted" && (
                      <p className="mt-2 text-sm font-bold text-emerald-300">
                        Your request has been submitted for review.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={requestStatus === "submitting"}
                    className="shrink-0 rounded-xl bg-gradient-to-r from-teal-300 to-emerald-400 px-6 py-3 font-black text-slate-950 shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    <Lock className="mr-2 inline h-5 w-5" />

                    {requestStatus === "submitting"
                      ? "Submitting..."
                      : "Request Access"}
                  </button>
                </div>
              </form>
            )}

            {activePanel === "login" && (
              <form
                id="research-login"
                onSubmit={handleLoginSubmit}
                className="rounded-2xl border border-white/15 bg-[#071936]/65 p-4"
              >
                <p className="mb-3 text-sm leading-6 text-white/70">
                  Enter the email address used for your application and the
                  10-digit PIN issued by our Research team. For any help email, research@smartnetzero.co.uk.
                </p>

                <div className="grid gap-3">
                  <label className="relative block">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="Approved email address"
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/20 bg-[#071936] py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/55 focus:border-teal-300"
                    />
                  </label>

                  <label className="relative block">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

                    <input
                      required
                      type="password"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                      placeholder="10-digit access PIN"
                      value={loginForm.pin}
                      onChange={(event) =>
                        setLoginForm((current) => ({
                          ...current,
                          pin: event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10),
                        }))
                      }
                      className="w-full rounded-xl border border-white/20 bg-[#071936] py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/55 focus:border-teal-300"
                    />
                  </label>
                </div>

                {loginError && (
                  <p
                    role="alert"
                    className="mt-3 text-sm font-bold text-rose-300"
                  >
                    {loginError}
                  </p>
                )}

                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setActivePanel("request")}
                    className="text-left text-sm font-bold text-teal-300 hover:text-teal-200"
                  >
                    Do not have a PIN? Request access
                  </button>

                  <button
                    type="submit"
                    disabled={
                      loginStatus === "submitting" ||
                      authStatus === "checking"
                    }
                    className="shrink-0 rounded-xl bg-gradient-to-r from-teal-300 to-cyan-400 px-6 py-3 font-black text-slate-950 shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    <Unlock className="mr-2 inline h-5 w-5" />

                    {loginStatus === "submitting"
                      ? "Checking access..."
                      : authStatus === "checking"
                        ? "Checking session..."
                        : "Log in and open research"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedResearch({ isLoggedIn, onOpenPdf, onLoginRequired }) {
  const [activeAbstract, setActiveAbstract] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [openingDocumentId, setOpeningDocumentId] = useState(null);

  const cards = useMemo(
    () => (showAll ? researchItems : researchItems.slice(0, 3)),
    [showAll]
  );

  const handlePdfClick = async (item) => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    setOpeningDocumentId(item.documentId);

    try {
      await onOpenPdf(item);
    } finally {
      setOpeningDocumentId(null);
    }
  };

  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="flex items-center gap-3 text-3xl font-black text-slate-950">
            <span className="h-1 w-7 rounded-full bg-teal-400" />
            Featured Research
          </h2>

          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex cursor-pointer items-center text-sm font-black text-teal-700"
          >
            {showAll ? "Show featured research" : "View all research"}

            <ArrowRight
              className={`ml-2 h-4 w-4 transition ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <motion.div layout className="mt-6 grid gap-7 lg:grid-cols-3">
          {cards.map((item) => {
            const Icon = item.icon;
            const isOpening = openingDocumentId === item.documentId;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-[#06112e] text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="relative h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(180deg,rgba(6,17,46,.08),rgba(6,17,46,.35)),url('${item.image}')`,
                  }}
                >
                  <div className="absolute right-4 top-4 rounded-full bg-[#06112e]/85 px-4 py-2 text-xs font-black backdrop-blur">
                    {isLoggedIn ? (
                      <>
                        <Unlock className="mr-2 inline h-4 w-4 text-teal-300" />
                        PDF available
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 inline h-4 w-4 text-teal-300" />
                        Subscriber access
                      </>
                    )}
                  </div>

                  <div
                    className={`absolute -bottom-8 left-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${item.colour} shadow-2xl`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="px-6 pb-6 pt-12">
                  <h3 className="text-2xl font-black leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 min-h-[96px] text-sm leading-6 text-white/78">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-teal-300/30 bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveAbstract(item)}
                      className="rounded-xl border border-white/30 px-4 py-3 text-sm font-black transition hover:bg-white/10"
                    >
                      <FileText className="mr-2 inline h-4 w-4" />
                      View abstract
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePdfClick(item)}
                      disabled={isOpening}
                      className="rounded-xl bg-gradient-to-r from-teal-300 to-cyan-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
                    >
                      {isLoggedIn ? (
                        <>
                          <Unlock className="mr-2 inline h-4 w-4" />
                          {isOpening ? "Opening..." : "Open PDF"}
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 inline h-4 w-4" />
                          Unlock PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        <HowAccessWorks />
      </div>

      <AbstractModal
        item={activeAbstract}
        onClose={() => setActiveAbstract(null)}
      />
    </section>
  );
}

function HowAccessWorks() {
  const steps = [
    {
      number: "1",
      title: "Subscribe",
      text: "Complete the short form to request access.",
      icon: User,
    },
    {
      number: "2",
      title: "Receive approval",
      text: "SNZ reviews your request and issues your access PIN.",
      icon: Mail,
    },
    {
      number: "3",
      title: "Access documents",
      text: "Log in to browse and download research papers and reports.",
      icon: FileText,
    },
  ];

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
        <h3 className="text-2xl font-black text-slate-950">
          How access works
        </h3>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative flex gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-teal-300 bg-teal-50">
                  <Icon className="h-8 w-8 text-slate-900" />
                </div>

                <div>
                  <p className="font-black text-slate-950">
                    <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-xs text-slate-950">
                      {step.number}
                    </span>

                    {step.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute right-2 top-8 hidden h-px w-10 border-t border-dashed border-teal-400 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BottomCTA() {
  return (
    <section className="bg-white px-5 pb-14 pt-4 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-fuchsia-500/40 p-8 text-white shadow-2xl md:p-10 lg:pr-12"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,17,46,0.76) 0%, rgba(6,17,46,0.90) 34%, rgba(6,17,46,0.84) 62%, rgba(88,28,135,0.54) 100%), url('/research-bottom-cta-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 grid gap-6 md:grid-cols-[1.15fr_auto_0.95fr_auto] md:items-center">
          <div className="text-left">
            <h2 className="max-w-2xl text-3xl font-black leading-tight">
              Stay ahead of smart infrastructure, compliance, and net zero
              research.
            </h2>
          </div>

          <div className="hidden h-20 w-px bg-white/30 md:block" />

          <div className="text-left">
            <p className="max-w-sm text-base leading-7 text-white/75">
              Join our community of professionals shaping a secure and
              sustainable future.
            </p>
          </div>

          <a
            href="#subscribe"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 font-black shadow-xl transition hover:scale-[1.02]"
          >
            Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AbstractModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            className="max-w-xl rounded-3xl bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                  Research abstract
                </p>

                <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">
                  {item.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              {item.description} This prototype abstract can later be connected
              to your research content management system, subscriber database,
              or gated document library.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 px-5 py-3 font-black text-slate-950"
            >
              Close preview
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  const links = [
    "Privacy Policy",
    "Modern Slavery Statement",
    "Carbon Reduction Statement",
    "Accessibility Statement",
  ];

  return (
    <footer className="bg-white px-5 pb-10 pt-2 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p className="font-medium">© Smart Net Zero Ltd 2026</p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="cursor-pointer transition hover:text-violet-700"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function Research({ goToPage, openEnquiryForm }) {
  useEffect(() => {
        document.title = "Research & Insights | Smart Net Zero";
    }, []);

  const [toast, setToast] = useState("");
  const [authStatus, setAuthStatus] = useState("checking");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [accessPanel, setAccessPanel] = useState("request");

  useEffect(() => {
    let isCurrent = true;

    const checkSession = async () => {
      try {
        const response = await fetch("/api/research/session", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const result = await readJsonResponse(response);

        if (!isCurrent) {
          return;
        }

        if (response.ok && result.authenticated) {
          setAuthenticatedUser(result.user || null);
          setAuthStatus("authenticated");
          return;
        }

        setAuthenticatedUser(null);
        setAuthStatus("anonymous");
      } catch {
        if (isCurrent) {
          setAuthenticatedUser(null);
          setAuthStatus("anonymous");
        }
      }
    };

    checkSession();

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleAccessRequest = async (formData) => {
    let response;

    try {
      response = await fetch("/api/research-access/request", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch {
      throw new Error(
        "The access request service is unavailable. Please try again later."
      );
    }

    const result = await readJsonResponse(response);

    if (!response.ok) {
      throw new Error(
        result.message || "Your access request could not be submitted."
      );
    }

    setToast(
      result.message ||
        "Access request received. Smart Net Zero will review your details and contact you if approved."
    );
  };

  const handleLogin = async ({ email, pin }) => {
    let response;

    try {
      response = await fetch("/api/research/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          pin,
        }),
      });
    } catch {
      throw new Error(
        "The login service is unavailable. Please try again later."
      );
    }

    const result = await readJsonResponse(response);

    if (!response.ok || !result.authenticated) {
      throw new Error(result.message || "The email or PIN is incorrect.");
    }

    setAuthenticatedUser(result.user || { email });
    setAuthStatus("authenticated");
    setToast("Login successful. Research PDFs are now available.");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/research/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });
    } finally {
      setAuthenticatedUser(null);
      setAuthStatus("anonymous");
      setAccessPanel("request");
      setToast("You have been logged out of the research library.");
    }
  };

  const handleLoginRequired = () => {
    setAccessPanel("login");
    setToast("Please log in with your approved email address and PIN.");

    window.setTimeout(() => {
      document
        .getElementById("subscribe")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 0);
  };

  const handleOpenPdf = async (item) => {
    const popup = window.open("", "_blank");

    if (popup) {
      popup.opener = null;
      popup.document.title = "Opening research PDF";
      popup.document.body.innerHTML =
        "<p style='font-family: sans-serif; padding: 24px;'>Opening research PDF...</p>";
    }

    let response;

    try {
      response = await fetch(
        `/api/research/documents/${encodeURIComponent(item.documentId)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json, application/pdf",
          },
        }
      );
    } catch {
      popup?.close();
      setToast("The PDF service is unavailable. Please try again later.");
      return;
    }

    if (response.status === 401 || response.status === 403) {
      popup?.close();
      setAuthenticatedUser(null);
      setAuthStatus("anonymous");
      handleLoginRequired();
      return;
    }

    if (!response.ok) {
      const result = await readJsonResponse(response);

      popup?.close();

      setToast(result.message || "The PDF could not be opened.");
      return;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/pdf")) {
      const pdfBlob = await response.blob();
      const objectUrl = URL.createObjectURL(pdfBlob);

      if (popup) {
        popup.location.replace(objectUrl);
      } else {
        window.open(objectUrl, "_blank", "noopener,noreferrer");
      }

      window.setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 60000);

      return;
    }

    const result = await readJsonResponse(response);

    if (!result.downloadUrl) {
      popup?.close();

      setToast("The PDF download address was not returned by the server.");
      return;
    }

    if (popup) {
      popup.location.replace(result.downloadUrl);
    } else {
      window.open(result.downloadUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="Research"
      />
    
      <main>
        <Hero
          authStatus={authStatus}
          authenticatedUser={authenticatedUser}
          onAccessRequest={handleAccessRequest}
          onLogin={handleLogin}
          onLogout={handleLogout}
          accessPanel={accessPanel}
          setAccessPanel={setAccessPanel}
        />

        <FeaturedResearch
          isLoggedIn={authStatus === "authenticated"}
          onOpenPdf={handleOpenPdf}
          onLoginRequired={handleLoginRequired}
        />

        <BottomCTA />
      </main>

      <SNZFooter goToPage={goToPage} />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-2xl border border-teal-200 bg-white px-5 py-4 text-sm font-bold text-slate-900 shadow-2xl"
          >
            <CheckCircle2 className="mr-2 inline h-5 w-5 text-teal-600" />

            {toast}

            <button
              type="button"
              onClick={() => setToast("")}
              className="ml-4 text-slate-400 hover:text-slate-700"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    
    </div>
  );
}