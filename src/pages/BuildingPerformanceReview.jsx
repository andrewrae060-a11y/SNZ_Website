import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Download,
  Mail,
  Settings2,
  Users,
} from "lucide-react";

import SNZFooter from "../components/SNZFooter";
import SNZHeader from "../components/SNZHeader";
import useGoogleTag from "../hooks/useGoogleTag";

const PDF_PATH =
  "/SNZ_Building_Performance_Review.pdf";
const PDF_FILENAME =
  "SNZ_Building_Performance_Review.pdf";

const startingPoints = [
  {
    title: "Recurring comfort complaints",
    text: "Understand where, when and who is affected.",
    icon: Users,
    iconClass: "bg-pink-50 text-pink-600",
  },
  {
    title: "A change in energy use",
    text: "Bring readings and operating information into context.",
    icon: BarChart3,
    iconClass: "bg-violet-50 text-violet-700",
  },
  {
    title: "An equipment improvement request",
    text: "Clarify the decision before taking the next step.",
    icon: Settings2,
    iconClass: "bg-cyan-50 text-blue-600",
  },
];

const reviewStages = [
  {
    number: "01",
    title: "Define the concern",
    text: "Describe the issue and the decision it needs to inform.",
    numberClass: "text-pink-600",
  },
  {
    number: "02",
    title: "Understand the available position",
    text: "Review the evidence, identify the gaps and consider what matters.",
    numberClass: "text-violet-700",
  },
  {
    number: "03",
    title: "Agree the next step",
    text: "Set the next question, an owner and a review point.",
    numberClass: "text-blue-600",
  },
];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
    value.trim()
  );
}

function triggerPdfDownload() {
  const downloadLink =
    document.createElement("a");

  downloadLink.href = PDF_PATH;
  downloadLink.download = PDF_FILENAME;
  downloadLink.rel = "noopener";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
}

function ReviewMockup() {
  return (
    <figure className="mx-auto w-full max-w-[590px] lg:translate-x-5 lg:scale-[1.06] xl:max-w-[630px]">
      <img
        src="/snz-building-review-document.png"
        alt="Building Performance Review workbook with the worksheet visible behind the cover"
        className="h-auto w-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.48)]"
      />
    </figure>
  );
}

function DownloadForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please add a valid email address.");
      inputRef.current?.focus();
      return;
    }

    setStatus("success");
    setMessage("Your download has started.");
    triggerPdfDownload();

    window.gtag?.("event", "file_download", {
      file_name: PDF_FILENAME,
      file_extension: "pdf",
      link_url: `${window.location.origin}${PDF_PATH}`,
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  return (
    <form
      className="mt-6 max-w-xl"
      onSubmit={handleSubmit}
      noValidate
    >
      <label
        htmlFor="building-review-email"
        className="block text-sm font-black text-white"
      >
        Enter your email to download
      </label>

      <div className="mt-2 grid gap-3 sm:grid-cols-[minmax(0,1fr)_170px]">
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="building-review-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your email address"
            aria-invalid={status === "error"}
            aria-describedby="building-review-form-message"
            className={`h-14 w-full rounded-xl border bg-white pl-12 pr-4 text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              status === "error"
                ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20"
                : "border-white/70 focus:border-cyan-300 focus:ring-cyan-300/20"
            }`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-700 px-5 text-sm font-black text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:shadow-pink-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-400/35"
        >
          <Download className="mr-2 h-5 w-5" />
          Get the PDF
        </button>
      </div>

      <div className="mt-2 min-h-6" aria-live="polite">
        {message && (
          <p
            id="building-review-form-message"
            className={`inline-flex items-center text-sm font-bold ${
              status === "error"
                ? "text-rose-300"
                : "text-cyan-200"
            }`}
          >
            {status === "success" && (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

export default function BuildingPerformanceReview({
  goToPage,
  openEnquiryForm,
}) {
  useGoogleTag(
    "Building Performance Review | Smart Net Zero"
  );

  useEffect(() => {
    document.title =
      "Building Performance Review | Smart Net Zero";

    const description =
      "Download Smart Net Zero's fillable Building Performance Review workbook for facilities and estates teams.";

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
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      description
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage=""
      />

      <main>
        <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
          <img
            src="/snz-hero-background.png"
            alt="Modern city skyline and high-performance sustainable building at night"
            className="absolute inset-0 -z-30 h-full w-full object-cover object-[66%_center]"
          />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,14,40,0.99)_0%,rgba(5,14,40,0.96)_33%,rgba(5,14,40,0.69)_55%,rgba(5,14,40,0.20)_78%,rgba(5,14,40,0.10)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_82%,rgba(219,39,119,0.13),transparent_28%),radial-gradient(circle_at_66%_22%,rgba(59,130,246,0.14),transparent_32%)]" />

          <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-6 px-5 py-14 lg:grid-cols-[0.51fr_0.49fr] lg:px-8 lg:py-16">
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300 sm:text-sm">
                For facilities &amp; estates teams
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.97] tracking-tight sm:text-6xl lg:text-[4.7rem]">
                Building
                <br />
                Performance
                <br />
                Review<span className="text-cyan-300">.</span>
              </h1>

              <div className="mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-pink-500 to-violet-600" />

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                From concern to next step.
              </h2>

              <p className="mt-3 max-w-xl text-base font-medium leading-7 text-white/85 sm:text-lg sm:leading-8">
                Bring the issue, the evidence and the open questions together. A practical working guide to help your team agree what to do next.
              </p>

              <DownloadForm />

              <div className="mt-1 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-white/72">
                <span>9-page fillable PDF&nbsp; • &nbsp;650 KB</span>
                <a
                  href="#inside-the-review"
                  className="inline-flex items-center font-black text-white transition hover:text-cyan-200"
                >
                  See what&apos;s inside
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative z-0 hidden sm:block">
              <ReviewMockup />
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">
              Start with one concern
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#07133c] sm:text-5xl">
              A clearer starting point<span className="text-violet-600">.</span>
            </h2>
            <p className="mt-2 text-lg font-medium text-slate-600 sm:text-xl">
              Focus your review on the question in front of you.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
              {startingPoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className={`md:px-10 ${
                      index === 0
                        ? "md:pl-0"
                        : "md:border-l md:border-slate-200"
                    }`}
                  >
                    <div
                      className={`grid h-20 w-20 place-items-center rounded-2xl ${item.iconClass}`}
                    >
                      <Icon
                        className="h-10 w-10"
                        strokeWidth={1.9}
                      />
                    </div>
                    <h3 className="mt-5 max-w-xs text-xl font-black leading-6 text-[#07133c] sm:text-2xl sm:leading-7">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-base font-medium leading-7 text-slate-600 sm:text-lg">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="inside-the-review"
          className="scroll-mt-28 border-y border-violet-100 bg-[radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(110deg,#f8f7ff_0%,#ffffff_50%,#f3f6ff_100%)] px-5 py-14 lg:px-8 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">
              Inside the review
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07133c] sm:text-5xl">
              Three stages. One useful next step<span className="text-violet-600">.</span>
            </h2>

            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {reviewStages.map((stage) => (
                <article
                  key={stage.number}
                  className="grid gap-5 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-violet-950/5 sm:grid-cols-[62px_1fr] sm:p-7"
                >
                  <span
                    className={`text-4xl font-black leading-none ${stage.numberClass}`}
                  >
                    {stage.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-black leading-6 text-[#07133c] sm:text-xl">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600 sm:text-base">
                      {stage.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-6 flex items-center justify-center text-center text-sm font-medium text-slate-600 sm:text-base">
              <span className="mr-3 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-400 text-white">
                <Check className="h-4 w-4" />
              </span>
              Start with what you have. You don&apos;t need every answer to begin.
            </p>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#06112e] px-5 py-10 text-white lg:px-8">
          <img
            src="/snz-hero-background.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[72%_58%] opacity-35"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,14,40,0.99)_0%,rgba(5,14,40,0.92)_52%,rgba(41,21,110,0.72)_100%)]" />

          <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Ready to take the next step?
              </h2>
              <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-white/80 sm:text-lg">
                Share your review with Smart Net Zero and explore what comes next with SmartDiscovery360.
              </p>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
              >
                Discuss your review
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
              <a
                href="mailto:info@smartnetzero.co.uk"
                className="mt-3 block text-sm font-semibold text-white/80 transition hover:text-cyan-200"
              >
                info@smartnetzero.co.uk
              </a>
            </div>
          </div>
        </section>
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}
