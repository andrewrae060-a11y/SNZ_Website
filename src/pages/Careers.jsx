import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import { careersApi } from "../lib/careersApi";

import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Briefcase,
  Building2,
  CheckCircle2,
  FileUp,
  GraduationCap,
  Heart,
  Home,
  Leaf,
  Lightbulb,
  Lock,
  MapPin,
  PartyPopper,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  Wallet,
  X,
} from "lucide-react";

const iconMap = {
  leaf: Leaf,
  shield: ShieldCheck,
  building: Building2,
  search: Search,
  briefcase: Briefcase,
};

const benefits = [
  {
    title: "Cycle to Work Scheme",
    text: "Save on a new bike and ride towards a better tomorrow.",
    icon: Bike,
  },
  {
    title: "Hybrid & Flexible Working",
    text: "Work where you do your best work with the flexibility you need.",
    icon: Home,
  },
  {
    title: "Learning & Certifications",
    text: "Access training, certifications and career development support.",
    icon: GraduationCap,
  },
  {
    title: "Private Healthcare & Wellbeing",
    text: "Support for your health, wellbeing and work-life balance.",
    icon: Heart,
  },
  {
    title: "Pension Contribution",
    text: "We contribute towards your future financial security.",
    icon: Wallet,
  },
  {
    title: "Volunteer & Community Days",
    text: "Paid time to support causes that matter to you.",
    icon: Users,
  },
  {
    title: "Innovation Time",
    text: "Dedicated time to explore new ideas and improve how we work.",
    icon: Lightbulb,
  },
  {
    title: "Team Events",
    text: "Celebrate wins, share ideas and build strong relationships.",
    icon: PartyPopper,
  },
];

const cultureCards = [
  {
    title: "Purpose-driven work",
    text: "Tackle complex challenges that deliver real impact for people and the planet.",
    icon: TargetIcon,
  },
  {
    title: "Net zero & infrastructure impact",
    text: "Shape technologies and systems that power a smarter, lower-carbon future.",
    icon: Sparkles,
  },
  {
    title: "Collaborative culture",
    text: "Work in inclusive, supportive teams where different perspectives matter.",
    icon: Users,
  },
  {
    title: "Grow your career",
    text: "Clear development, mentoring and opportunities to expand your expertise.",
    icon: ArrowGrowthIcon,
  },
];

function TargetIcon({ className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
    >
      <circle
        cx="24"
        cy="24"
        r="17"
        stroke="currentColor"
        strokeWidth="3"
      />

      <circle
        cx="24"
        cy="24"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
      />

      <circle
        cx="24"
        cy="24"
        r="3"
        fill="currentColor"
      />

      <path
        d="M34 14l7-7M37 7h4v4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowGrowthIcon({ className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
    >
      <path
        d="M8 36h32M12 32l9-9 7 7 12-16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M32 14h8v8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JobCard({
  job,
  selected,
  onApply,
  onView,
}) {
  const Icon =
    iconMap[job.icon] || Briefcase;

  return (
    <article
      className={`rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        selected
          ? "border-cyan-400 ring-4 ring-cyan-100"
          : "border-slate-200"
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <button
          type="button"
          onClick={() => onView(job)}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-700 text-white shadow-lg"
          aria-label={`View ${job.title}`}
        >
          <Icon className="h-8 w-8" />
        </button>

        <button
          type="button"
          onClick={() => onView(job)}
          className="text-left"
        >
          <h3 className="text-xl font-black leading-tight text-[#07133c]">
            {job.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold text-slate-500">
            <span className="inline-flex items-center">
              <MapPin className="mr-1.5 h-4 w-4" />
              {job.location}
            </span>

            <span className="inline-flex items-center">
              <Briefcase className="mr-1.5 h-4 w-4" />
              {job.type}
            </span>

            <span className="inline-flex items-center text-emerald-600">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {job.status}
            </span>
          </div>

          {job.summary && (
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {job.summary}
            </p>
          )}
        </button>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onView(job)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-[#07133c] transition hover:bg-slate-50"
          >
            View role
          </button>

          <button
            type="button"
            onClick={() => onApply(job)}
            className="inline-flex items-center justify-center rounded-2xl border border-violet-300 px-5 py-3 text-sm font-black text-blue-700 transition hover:bg-violet-50"
          >
            Apply now
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function ApplyForm({
  jobs,
  selectedJob,
  setSelectedJob,
}) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleId: selectedJob?.id || "",
    linkedin: "",
    message: "",
  });

  const [cvFile, setCvFile] =
    useState(null);

  const [fileError, setFileError] =
    useState("");

  const [submitState, setSubmitState] =
    useState({
      loading: false,
      success: "",
      error: "",
    });

  useEffect(() => {
    setForm((current) => ({
      ...current,
      roleId: selectedJob?.id || "",
    }));
  }, [selectedJob]);

  const selectedRoleTitle = useMemo(() => {
    return (
      jobs.find(
        (job) => job.id === form.roleId
      )?.title || ""
    );
  }, [jobs, form.roleId]);

  const validateFile = (file) => {
    if (!file) {
      return "Please upload your CV as a PDF or DOCX file.";
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [
      ".pdf",
      ".docx",
    ];

    const lowerName =
      file.name.toLowerCase();

    const validType =
      allowedTypes.includes(file.type);

    const validExtension =
      allowedExtensions.some((extension) =>
        lowerName.endsWith(extension)
      );

    if (!validType && !validExtension) {
      return "CV must be a PDF or DOCX file only.";
    }

    const maxSizeMb = 4;
    const maxSizeBytes =
      maxSizeMb * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      return `CV must be smaller than ${maxSizeMb}MB.`;
    }

    return "";
  };

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    const error =
      validateFile(file);

    if (error) {
      setCvFile(null);
      setFileError(error);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setCvFile(file);
    setFileError("");
  };

  const handleChange = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === "roleId") {
      const matchedJob =
        jobs.find(
          (job) => job.id === value
        );

      setSelectedJob(
        matchedJob || null
      );
    }
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSubmitState({
      loading: false,
      success: "",
      error: "",
    });

    const fileValidationError =
      validateFile(cvFile);

    if (fileValidationError) {
      setFileError(
        fileValidationError
      );

      return;
    }

    if (
      !form.fullName ||
      !form.email ||
      !form.roleId
    ) {
      setSubmitState({
        loading: false,
        success: "",
        error:
          "Please complete your name, email and role before submitting.",
      });

      return;
    }

    const payload =
      new FormData();

    payload.append(
      "fullName",
      form.fullName
    );

    payload.append(
      "email",
      form.email
    );

    payload.append(
      "phone",
      form.phone
    );

    payload.append(
      "roleId",
      form.roleId
    );

    payload.append(
      "roleTitle",
      selectedRoleTitle
    );

    payload.append(
      "linkedin",
      form.linkedin
    );

    payload.append(
      "message",
      form.message
    );

    payload.append(
      "cv",
      cvFile
    );

    try {
      setSubmitState({
        loading: true,
        success: "",
        error: "",
      });

      const response = await fetch(
        "/api/careers/apply",
        {
          method: "POST",
          body: payload,
          credentials: "include",
        }
      );

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      let result;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        result =
          await response.json();
      } else {
        const responseText =
          await response.text();

        result = {
          message:
            responseText ||
            "Application could not be sent.",
        };
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Application could not be sent."
        );
      }

      setSubmitState({
        loading: false,
        success:
          "Your application has been sent. Thank you for applying to Smart Net Zero.",
        error: "",
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",

        roleId:
          selectedJob?.id || "",

        linkedin: "",
        message: "",
      });

      setCvFile(null);
      setFileError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(
        "Application submission failed:",
        error
      );

      setSubmitState({
        loading: false,
        success: "",
        error:
          error?.message ||
          "There was a problem sending your application. Please try again.",
      });
    }
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/8">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-700">
          <FileUp className="h-7 w-7" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#07133c]">
            Apply now
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            Tell us a bit about yourself.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Full Name *
          </span>

          <input
            type="text"
            value={form.fullName}
            onChange={(event) =>
              handleChange(
                "fullName",
                event.target.value
              )
            }
            placeholder="e.g. Alex Morgan"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Email Address *
          </span>

          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              handleChange(
                "email",
                event.target.value
              )
            }
            placeholder="e.g. alex.morgan@email.com"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Phone Number
          </span>

          <input
            type="tel"
            value={form.phone}
            onChange={(event) =>
              handleChange(
                "phone",
                event.target.value
              )
            }
            placeholder="e.g. 07123 456789"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Role Applying For *
          </span>

          <select
            value={form.roleId}
            onChange={(event) =>
              handleChange(
                "roleId",
                event.target.value
              )
            }
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-400"
            required
          >
            <option value="">
              Select a role
            </option>

            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
              >
                {job.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            LinkedIn Profile
          </span>

          <input
            type="url"
            value={form.linkedin}
            onChange={(event) =>
              handleChange(
                "linkedin",
                event.target.value
              )
            }
            placeholder="https://www.linkedin.com/in/..."
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            CV Upload * PDF or DOCX only
          </span>

          <div
            className={`mt-1 rounded-2xl border border-dashed p-5 text-center transition ${
              fileError
                ? "border-rose-300 bg-rose-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <UploadCloud className="mx-auto h-8 w-8 text-violet-600" />

            <p className="mt-2 text-sm font-black text-slate-700">
              {cvFile
                ? cvFile.name
                : "Drag & drop your CV here or browse files"}
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-500">
              PDF or DOCX, maximum 4MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={
                handleFileChange
              }
              className="mt-4 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:text-xs file:font-black file:text-violet-700"
              required
            />

            {fileError && (
              <p className="mt-3 text-sm font-bold text-rose-600">
                {fileError}
              </p>
            )}
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Cover Letter / Message
          </span>

          <textarea
            rows={4}
            value={form.message}
            onChange={(event) =>
              handleChange(
                "message",
                event.target.value
              )
            }
            placeholder="Tell us why you're a great fit for Smart Net Zero..."
            className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
          />
        </label>

        {submitState.error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
            {submitState.error}
          </div>
        )}

        {submitState.success && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
            {submitState.success}
          </div>
        )}

        <button
          type="submit"
          disabled={
            submitState.loading
          }
          className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState.loading
            ? "Sending application..."
            : "Submit Application"}

          {!submitState.loading && (
            <ArrowRight className="ml-2 h-5 w-5" />
          )}
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold leading-5 text-slate-500">
          <Lock className="h-4 w-4 shrink-0" />

          Your information is secure and
          will only be used for recruitment
          purposes.
        </div>
      </form>
    </article>
  );
}

function JobDetailsModal({
  job,
  onClose,
  onApply,
}) {
  if (!job) {
    return null;
  }

  const Icon =
    iconMap[job.icon] || Briefcase;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-details-title"
    >
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/15 bg-white shadow-2xl shadow-slate-950/40">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close job details"
          className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
        >
          <X className="h-7 w-7" />
        </button>

        <div className="relative overflow-hidden rounded-t-[2rem] bg-[#06112e] p-8 text-white md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(236,72,153,0.18),transparent_30%)]" />

          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative z-10 max-w-3xl">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
              <Icon className="h-9 w-9 text-cyan-300" />
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
              {job.department}
            </p>

            <h2
              id="job-details-title"
              className="mt-3 text-4xl font-black leading-tight md:text-5xl"
            >
              {job.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">
                <MapPin className="mr-2 h-4 w-4 text-cyan-300" />
                {job.location}
              </span>

              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">
                <Briefcase className="mr-2 h-4 w-4 text-cyan-300" />
                {job.type}
              </span>

              <span className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-200">
                {job.status}
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/78">
              {job.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              What the role includes
            </h3>

            <div className="mt-5 space-y-3">
              {(job.roleIncludes || []).map(
                (item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />

                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Skills needed
            </h3>

            <div className="mt-5 space-y-3">
              {(job.skillsNeeded || []).map(
                (item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex gap-3"
                  >
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />

                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Benefits
            </h3>

            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-700">
                Salary level
              </p>

              <p className="mt-2 text-lg font-black leading-6 text-[#07133c]">
                {job.salary ||
                  "Competitive salary depending on experience"}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {(job.benefits || []).map(
                (item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex gap-3"
                  >
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />

                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </article>
        </div>

        <div className="border-t border-slate-200 px-6 py-5 md:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-600">
              Interested in this opportunity?
              Start your application now.
            </p>

            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-6 py-3 text-sm font-black text-white transition hover:scale-[1.02]"
            >
              Apply for this role

              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Careers({
  goToPage,
  openEnquiryForm,
}) {
  useEffect(() => {
      document.title = "Careers | Smart Net Zero";
  }, []);

  const [jobs, setJobs] =
    useState([]);

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null);

  const [viewJob, setViewJob] =
    useState(null);

  const [
    jobsError,
    setJobsError,
  ] = useState("");

  const [
    jobsLoading,
    setJobsLoading,
  ] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError("");

      try {
        const data =
          await careersApi.getPublishedJobs();

        if (!active) {
          return;
        }

        const publishedJobs =
          Array.isArray(data)
            ? data
            : [];

        setJobs(publishedJobs);

        setSelectedJob(
          publishedJobs.length > 0
            ? publishedJobs[0]
            : null
        );
      } catch (error) {
        if (!active) {
          return;
        }

        console.error(
          "Could not load careers:",
          error
        );

        setJobs([]);
        setSelectedJob(null);

        setJobsError(
          error?.message ||
            "Current opportunities could not be loaded."
        );
      } finally {
        if (active) {
          setJobsLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      active = false;
    };
  }, []);

  const handleApplyForJob = (
    job
  ) => {
    setSelectedJob(job);
    setViewJob(null);

    window.setTimeout(() => {
      document
        .getElementById("apply-now")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={
          openEnquiryForm
        }
        activePage="Careers"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.86) 34%, rgba(6,17,46,0.42) 68%, rgba(6,17,46,0.10) 100%), url('/careers-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_40%_85%,rgba(236,72,153,0.18),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Careers at Smart Net Zero
              </h1>

              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 via-cyan-300 to-blue-500" />

              <p className="mt-6 max-w-xl text-xl font-semibold leading-8 text-white/84">
                Build a smarter, safer and
                more sustainable future with
                purpose-driven people.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  [
                    "Sustainable Impact",
                    Leaf,
                  ],
                  [
                    "Cyber Resilient",
                    ShieldCheck,
                  ],
                  [
                    "Innovative Solutions",
                    Lightbulb,
                  ],
                ].map(
                  ([label, Icon]) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-3 backdrop-blur"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>

                      <span className="text-sm font-black">
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 lg:px-8">
          <div
            className={`mx-auto grid max-w-7xl gap-8 ${
              jobs.length > 0
                ? "lg:grid-cols-[1.45fr_0.85fr] lg:items-start"
                : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-blue-700" />

                <div>
                  <h2 className="text-3xl font-black text-[#07133c]">
                    Current opportunities
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    Join our mission to
                    accelerate net zero and
                    build the infrastructure
                    of tomorrow.
                  </p>
                </div>
              </div>

              {jobsError && (
                <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
                  {jobsError}
                </div>
              )}

              {!jobsLoading &&
                jobs.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        selected={
                          selectedJob?.id ===
                          job.id
                        }
                        onView={
                          setViewJob
                        }
                        onApply={
                          handleApplyForJob
                        }
                      />
                    ))}
                  </div>
                )}

              {jobsLoading && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-lg font-black text-[#07133c]">
                    Loading current
                    opportunities...
                  </p>
                </div>
              )}

              {!jobsLoading &&
                jobs.length === 0 &&
                !jobsError && (
                  <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
                    <Briefcase className="mx-auto h-10 w-10 text-blue-700" />

                    <p className="mt-4 text-lg font-black text-[#07133c]">
                      There are currently no
                      open roles.
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      Please check back soon
                      for future opportunities.
                    </p>
                  </div>
                )}
            </div>

            {!jobsLoading &&
              jobs.length > 0 && (
                <div
                  id="apply-now"
                  className="lg:sticky lg:top-28"
                >
                  <ApplyForm
                    jobs={jobs}
                    selectedJob={
                      selectedJob
                    }
                    setSelectedJob={
                      setSelectedJob
                    }
                  />
                </div>
              )}
          </div>
        </section>

        <section className="bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-pink-600" />

              <div>
                <h2 className="text-3xl font-black text-[#07133c]">
                  Why join Smart Net Zero?
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  We invest in our people so
                  they can do their best work
                  and make a bigger impact.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
              {benefits.map(
                (benefit) => {
                  const Icon =
                    benefit.icon;

                  return (
                    <article
                      key={
                        benefit.title
                      }
                      className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <Icon className="mx-auto h-10 w-10 text-cyan-600" />

                      <h3 className="mt-4 text-sm font-black leading-tight text-[#07133c]">
                        {benefit.title}
                      </h3>

                      <p className="mt-3 text-xs font-semibold leading-5 text-slate-600">
                        {benefit.text}
                      </p>
                    </article>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr]">
              <div>
                <h2 className="text-3xl font-black">
                  A culture built for impact
                </h2>

                <p className="mt-4 text-sm font-semibold leading-7 text-white/70">
                  We are a team of innovators,
                  problem solvers and change
                  makers working together to
                  accelerate net zero and
                  build smarter, safer
                  infrastructure.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                {cultureCards.map(
                  (card, index) => {
                    const Icon =
                      card.icon;

                    return (
                      <article
                        key={card.title}
                        className={`${
                          index > 0
                            ? "border-t border-white/15 pt-5 md:border-l md:border-t-0 md:pl-5 md:pt-0"
                            : ""
                        }`}
                      >
                        <Icon className="h-10 w-10 text-cyan-300" />

                        <h3 className="mt-4 text-base font-black">
                          {card.title}
                        </h3>

                        <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                          {card.text}
                        </p>
                      </article>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-16 pt-4 lg:px-8">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl md:p-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.86) 38%, rgba(6,17,46,0.58) 66%, rgba(6,17,46,0.18) 100%), url('/careers-cta-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="max-w-3xl text-3xl font-black md:text-4xl">
                  Ready to build a smarter,
                  safer and more sustainable
                  future?
                </h2>

                <p className="mt-3 text-base font-semibold text-white/76">
                  Join Smart Net Zero and be
                  part of the change.
                </p>
              </div>

              {jobs.length > 0 ? (
                <a
                  href="#apply-now"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black text-[#07133c] transition hover:scale-[1.02]"
                >
                  View job opportunities

                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={
                    openEnquiryForm
                  }
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black text-[#07133c] transition hover:scale-[1.02]"
                >
                  Contact Smart Net Zero

                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {viewJob && (
        <JobDetailsModal
          job={viewJob}
          onClose={() =>
            setViewJob(null)
          }
          onApply={
            handleApplyForJob
          }
        />
      )}

      <SNZFooter
        goToPage={goToPage}
      />
    </div>
  );
}