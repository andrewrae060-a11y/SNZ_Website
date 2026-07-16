import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Briefcase,
  CalendarDays,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { careersApi } from "../lib/careersApi";

const DEFAULT_RIGHT_FIT = [
  "Good fit for this role",
  "Enjoy making a difference and creating a positive impact.",
  "Like working as part of a team where everyone pitches in.",
  "Want to help shape the future of a growing organisation.",
  "Take ownership, use your initiative and look for solutions rather than problems.",
  "Are open to learning, trying new ideas and embracing change.",
  "Not the right fit for this role",
  "Prefer to work entirely on your own with little collaboration.",
  "Prefer well-established processes and procedures with little need for change or innovation.",
  "Like every day to be the same and find change frustrating.",
  "Are not comfortable taking ownership or making decisions.",
  'See this as "just a job" rather than an opportunity to contribute to something meaningful.',
];

const EMPTY_JOB = {
  title: "",
  department: "",
  location: "",
  type: "Full time",
  status: "Open",
  icon: "briefcase",
  summary: "",
  salary: "",
  roleIncludes: [],
  skillsNeeded: [],
  benefits: DEFAULT_RIGHT_FIT,
  screeningQuestions: [],
  published: false,
  sortOrder: 100,
};

function getErrorMessage(error, fallback) {
  return error?.message || fallback;
}

function listToText(value) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value.join("\n");
}

function textToList(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normaliseScreeningQuestions(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      /*
       * Backwards compatibility for older
       * questions stored as plain strings.
       */
      if (typeof item === "string") {
        const question = item
          .trim()
          .slice(0, 300);

        return question
          ? {
              question,
              answerType: "yes_no",
            }
          : null;
      }

      const question = String(
        item?.question || ""
      )
        .trim()
        .slice(0, 300);

      if (!question) {
        return null;
      }

      return {
        question,

        answerType:
          item?.answerType === "text"
            ? "text"
            : "yes_no",
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

function normaliseApplicationResponses(value) {
  let responses = value;

  for (
    let attempt = 0;
    attempt < 2;
    attempt += 1
  ) {
    if (typeof responses !== "string") {
      break;
    }

    try {
      responses = JSON.parse(responses);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(responses)) {
    return [];
  }

  return responses
    .map((item) => {
      const question = String(
        item?.question || ""
      ).trim();

      const answer = String(
        item?.answer || ""
      ).trim();

      if (!question || !answer) {
        return null;
      }

      return {
        question,
        answer,
        answerType:
          item?.answerType === "text"
            ? "text"
            : "yes_no",
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

function formatApplicationDate(value) {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(value) {
  const bytes = Number(value || 0);

  if (!bytes) {
    return "";
  }

  if (bytes < 1024) {
    return `${bytes} bytes`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(
      bytes / 1024
    )} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function LoginPanel({ onLogin }) {
  const [email, setEmail] = useState(
    "careers@smartnetzero.co.uk"
  );

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await careersApi.login(
        email,
        password
      );

      await onLogin();
    } catch (loginError) {
      setError(
        getErrorMessage(
          loginError,
          "Administrator login failed."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-12">
      <div className="mx-auto max-w-md">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-700 text-white shadow-lg">
            <Briefcase className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-3xl font-black text-[#07133c]">
            Careers administration
          </h1>

          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            Sign in with an authorised Smart Net Zero administrator account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <label className="block">
              <span className="text-sm font-black text-slate-700">
                Email address
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                autoComplete="username"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-black text-slate-700">
                Password
              </span>

              <div className="relative mt-2">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function JobEditor({
  initialJob,
  onSaved,
  onCancel,
}) {
  const [form, setForm] = useState({
    ...EMPTY_JOB,
    ...initialJob,

    roleIncludesText: listToText(
      initialJob?.roleIncludes || []
    ),

    skillsNeededText: listToText(
      initialJob?.skillsNeeded || []
    ),

    benefitsText: listToText(
      initialJob?.benefits?.length
        ? initialJob.benefits
        : DEFAULT_RIGHT_FIT
    ),

    screeningQuestions:
      normaliseScreeningQuestions(
        initialJob?.screeningQuestions
      ),
  });

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const isEditing =
    Boolean(initialJob?.id);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateScreeningQuestion(
    index,
    field,
    value
  ) {
    setForm((current) => {
      const questions = [
        ...(current.screeningQuestions || []),
      ];

      const existingQuestion =
        questions[index] || {
          question: "",
          answerType: "yes_no",
        };

      questions[index] = {
        ...existingQuestion,
        [field]: value,
      };

      return {
        ...current,

        screeningQuestions:
          questions.slice(0, 3),
      };
    });
  }

 function addScreeningQuestion() {
  setForm((current) => {
    const questions =
      current.screeningQuestions || [];

    if (questions.length >= 3) {
      return current;
    }

    return {
      ...current,

      screeningQuestions: [
        ...questions,
        {
          question: "",
          answerType: "yes_no",
        },
      ],
    };
  });
}

  function removeScreeningQuestion(index) {
    setForm((current) => ({
      ...current,

      screeningQuestions: (
        current.screeningQuestions || []
      ).filter(
        (_question, questionIndex) =>
          questionIndex !== index
      ),
    }));
  }

  function validateForm() {
    if (!form.title.trim()) {
      return "A job title is required.";
    }

    if (!form.department.trim()) {
      return "A department is required.";
    }

    if (!form.location.trim()) {
      return "A location is required.";
    }

    if (!form.summary.trim()) {
      return "A job summary is required.";
    }

    if (
      form.summary.trim().length < 10
    ) {
      return "The job summary must be at least 10 characters.";
    }

    return "";
  }

  async function handleSave(event) {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    const sortOrderNumber =
      Number(form.sortOrder);

    const payload = {
      title: form.title.trim(),

      department:
        form.department.trim(),

      location:
        form.location.trim(),

      type:
        form.type.trim() ||
        "Full time",

      status:
        form.status.trim() ||
        "Open",

      icon:
        form.icon.trim() ||
        "briefcase",

      summary:
        form.summary.trim(),

      salary:
        form.salary.trim(),

      roleIncludes: textToList(
        form.roleIncludesText
      ),

      skillsNeeded: textToList(
        form.skillsNeededText
      ),

      benefits: textToList(
        form.benefitsText
      ),

      screeningQuestions:
        normaliseScreeningQuestions(
          form.screeningQuestions
        ),

      published:
        form.published === true,

      sortOrder:
        Number.isFinite(
          sortOrderNumber
        )
          ? sortOrderNumber
          : 100,
    };

    try {
      if (isEditing) {
        await careersApi.updateJob(
          initialJob.id,
          payload
        );
      } else {
        await careersApi.createJob(
          payload
        );
      }

      await onSaved();
    } catch (saveError) {
      setError(
        getErrorMessage(
          saveError,
          "The role could not be saved."
        )
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 md:p-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#07133c]">
            {isEditing
              ? "Edit role"
              : "Create role"}
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            Enter one responsibility, skill or right-fit statement per line. Screening questions are optional.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-6 space-y-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Job title *
            </span>

            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Department *
            </span>

            <input
              type="text"
              value={form.department}
              onChange={(event) =>
                updateField(
                  "department",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Location *
            </span>

            <input
              type="text"
              value={form.location}
              onChange={(event) =>
                updateField(
                  "location",
                  event.target.value
                )
              }
              placeholder="London / Hybrid"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Employment type
            </span>

            <select
              value={form.type}
              onChange={(event) =>
                updateField(
                  "type",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="Full time">
                Full time
              </option>

              <option value="Part time">
                Part time
              </option>

              <option value="Fixed term">
                Fixed term
              </option>

              <option value="Contract">
                Contract
              </option>

              <option value="Internship">
                Internship
              </option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Status
            </span>

            <select
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="Open">
                Open
              </option>

              <option value="Closing soon">
                Closing soon
              </option>

              <option value="Closed">
                Closed
              </option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Icon
            </span>

            <select
              value={form.icon}
              onChange={(event) =>
                updateField(
                  "icon",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="briefcase">
                Briefcase
              </option>

              <option value="leaf">
                Leaf
              </option>

              <option value="shield">
                Shield
              </option>

              <option value="building">
                Building
              </option>

              <option value="search">
                Search
              </option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Salary
            </span>

            <input
              type="text"
              value={form.salary}
              onChange={(event) =>
                updateField(
                  "salary",
                  event.target.value
                )
              }
              placeholder="Competitive salary"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Sort order
            </span>

            <input
              type="number"
              min="0"
              max="9999"
              value={form.sortOrder}
              onChange={(event) =>
                updateField(
                  "sortOrder",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-black text-slate-700">
            Summary *
          </span>

          <textarea
            rows={4}
            value={form.summary}
            onChange={(event) =>
              updateField(
                "summary",
                event.target.value
              )
            }
            className="mt-2 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            required
          />
        </label>

        <div className="grid gap-5 lg:grid-cols-3">
          <label className="block">
            <span className="text-sm font-black text-slate-700">
              What the role includes
            </span>

            <span className="mt-1 block text-xs font-semibold text-slate-500">
              Enter one responsibility per line.
            </span>

            <textarea
              rows={10}
              value={
                form.roleIncludesText
              }
              onChange={(event) =>
                updateField(
                  "roleIncludesText",
                  event.target.value
                )
              }
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              Skills needed
            </span>

            <span className="mt-1 block text-xs font-semibold text-slate-500">
              Enter one skill per line.
            </span>

            <textarea
              rows={10}
              value={
                form.skillsNeededText
              }
              onChange={(event) =>
                updateField(
                  "skillsNeededText",
                  event.target.value
                )
              }
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">
              The right fit
            </span>

            <span className="mt-1 block text-xs font-semibold text-slate-500">
              Default guidance is included for new roles and can be edited.
            </span>

            <textarea
              rows={16}
              value={form.benefitsText}
              onChange={(event) =>
                updateField(
                  "benefitsText",
                  event.target.value
                )
              }
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </label>
        </div>

        <section className="rounded-3xl border border-violet-200 bg-violet-50/60 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-black text-[#07133c]">
                Screening Questions
              </h3>

              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                Add up to three optional screening questions.
                Choose whether each question requires a
                Yes or No answer or an open-text response.
              </p>
            </div>

            <button
              type="button"
              onClick={addScreeningQuestion}
              disabled={
                (
                  form.screeningQuestions || []
                ).length >= 3
              }
              className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-violet-300 bg-white px-4 py-3 text-sm font-black text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add question
            </button>
          </div>

          {(
            form.screeningQuestions || []
          ).length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-violet-300 bg-white/70 p-5 text-sm font-semibold text-slate-500">
              No screening questions have been added.
              This section will not appear to applicants.
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {form.screeningQuestions.map(
                (
                  screeningQuestion,
                  index
                ) => (
                  <div
                    key={`screening-question-${index}`}
                    className="rounded-2xl border border-violet-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <label
                        htmlFor={`screening-question-${index}`}
                        className="text-sm font-black text-slate-700"
                      >
                        Question {index + 1}
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          removeScreeningQuestion(
                            index
                          )
                        }
                        className="inline-flex items-center rounded-xl px-3 py-2 text-xs font-black text-rose-700 transition hover:bg-rose-50"
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    <input
                      id={`screening-question-${index}`}
                      type="text"
                      value={
                        screeningQuestion.question ||
                        ""
                      }
                      onChange={(event) =>
                        updateScreeningQuestion(
                          index,
                          "question",
                          event.target.value
                        )
                      }
                      maxLength={300}
                      placeholder="Enter the screening question"
                      className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />

                    <label className="mt-4 block">
                      <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                        Answer type
                      </span>

                      <select
                        value={
                          screeningQuestion.answerType ||
                          "yes_no"
                        }
                        onChange={(event) =>
                          updateScreeningQuestion(
                            index,
                            "answerType",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      >
                        <option value="yes_no">
                          Yes / No
                        </option>

                        <option value="text">
                          Open text
                        </option>
                      </select>
                    </label>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) =>
              updateField(
                "published",
                event.target.checked
              )
            }
            className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
          />

          <span>
            <span className="block text-sm font-black text-[#07133c]">
              Publish this role
            </span>

            <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
              Published roles appear on the public careers page.
            </span>
          </span>
        </label>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />

                {isEditing
                  ? "Save changes"
                  : "Create role"}
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function JobCard({
  job,
  deleting,
  onEdit,
  onDelete,
}) {
  return (
    <article
      className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition ${
        deleting
          ? "pointer-events-none opacity-50"
          : ""
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black text-[#07133c]">
              {job.title}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                job.published
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {job.published
                ? "Published"
                : "Draft"}
            </span>

            {job.status && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {job.status}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm font-bold text-slate-500">
            {job.department}
            {" • "}
            {job.location}
            {" • "}
            {job.type}
          </p>

          {job.summary && (
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
              {job.summary}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-slate-400">
            <span>
              Sort order:{" "}
              {job.sortOrder ?? 100}
            </span>

            {job.updatedAt && (
              <span>
                Updated:{" "}
                {new Date(
                  job.updatedAt
                ).toLocaleString(
                  "en-GB"
                )}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              onEdit(job)
            }
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#07133c] transition hover:bg-slate-50"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(job)
            }
            className="inline-flex items-center justify-center rounded-2xl border border-rose-200 px-4 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function ApplicationCard({
  application,
}) {
  const [showDetails, setShowDetails] =
    useState(false);

  const screeningResponses =
    normaliseApplicationResponses(
      application.screeningResponses
    );

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black text-[#07133c]">
              {application.fullName}
            </h3>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
              {application.status ||
                "Received"}
            </span>
          </div>

          <p className="mt-2 flex items-center text-sm font-black text-blue-700">
            <Briefcase className="mr-2 h-4 w-4" />

            {application.roleTitle ||
              "Role unavailable"}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-600">
            {application.email && (
              <a
                href={`mailto:${application.email}`}
                className="inline-flex items-center transition hover:text-blue-700"
              >
                <Mail className="mr-2 h-4 w-4" />

                {application.email}
              </a>
            )}

            {application.phone && (
              <a
                href={`tel:${application.phone}`}
                className="inline-flex items-center transition hover:text-blue-700"
              >
                <Phone className="mr-2 h-4 w-4" />

                {application.phone}
              </a>
            )}

            {application.linkedin && (
              <a
                href={
                  application.linkedin
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center transition hover:text-blue-700"
              >
                <ExternalLink className="mr-2 h-4 w-4" />

                LinkedIn
              </a>
            )}
          </div>

          <p className="mt-4 inline-flex items-center text-xs font-bold text-slate-400">
            <CalendarDays className="mr-2 h-4 w-4" />

            Applied{" "}
            {formatApplicationDate(
              application.submittedAt
            )}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setShowDetails(
                (current) =>
                  !current
              )
            }
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#07133c] transition hover:bg-slate-50"
          >
            <Eye className="mr-2 h-4 w-4" />

            {showDetails
              ? "Hide details"
              : "View details"}
          </button>

          {application.cvUrl ? (
            <a
              href={application.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-4 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.01]"
            >
              <FileText className="mr-2 h-4 w-4" />

              Open CV

              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex items-center rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-400">
              CV unavailable
            </span>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="font-black text-[#07133c]">
                Candidate message
              </h4>

              <p className="mt-3 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-600">
                {application.message ||
                  "No candidate message was provided."}
              </p>
            </section>

            <section className="rounded-2xl border border-violet-200 bg-violet-50/60 p-5">
              <h4 className="font-black text-[#07133c]">
                Screening responses
              </h4>

              {screeningResponses.length >
              0 ? (
                <div className="mt-4 space-y-3">
                  {screeningResponses.map(
                    (
                      response,
                      index
                    ) => (
                      <div
                        key={`${response.question}-${index}`}
                        className="rounded-xl border border-violet-200 bg-white p-4"
                      >
                        <p className="text-sm font-black text-slate-800">
                          {index + 1}.{" "}
                          {
                            response.question
                          }
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm font-semibold text-slate-600">
                          <span className="font-black">
                            Answer:
                          </span>{" "}
                          {response.answer}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  No screening responses were supplied.
                </p>
              )}
            </section>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-500">
            <span>
              CV:{" "}
              {application.cvOriginalName ||
                "Candidate CV"}
            </span>

            {Number(
              application.cvSizeBytes
            ) > 0 && (
              <span>
                File size:{" "}
                {formatFileSize(
                  application.cvSizeBytes
                )}
              </span>
            )}

            <span>
              Email notification:{" "}
              {application.emailNotificationSent
                ? "Sent"
                : "Not confirmed"}
            </span>
          </div>
        </div>
      )}
    </article>
  );
}

export default function CareersAdmin() {
  useEffect(() => {
    document.title =
      "Careers Admin | Smart Net Zero";
  }, []);

  const [signedIn, setSignedIn] =
    useState(false);

  const [
    checkingSession,
    setCheckingSession,
  ] = useState(true);

  const [activeView, setActiveView] =
    useState("roles");

  const [jobs, setJobs] =
    useState([]);

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [loadingJobs, setLoadingJobs] =
    useState(false);

  const [
    loadingApplications,
    setLoadingApplications,
  ] = useState(false);

  const [pageError, setPageError] =
    useState("");

  const [
    applicationSearch,
    setApplicationSearch,
  ] = useState("");

  const [editingJob, setEditingJob] =
    useState(null);

  const [showEditor, setShowEditor] =
    useState(false);

  const [
    deletingJobId,
    setDeletingJobId,
  ] = useState(null);

  const publishedCount = useMemo(
    () =>
      jobs.filter(
        (job) => job.published
      ).length,
    [jobs]
  );

  const draftCount =
    jobs.length - publishedCount;

  const filteredApplications =
    useMemo(() => {
      const query =
        applicationSearch
          .trim()
          .toLowerCase();

      if (!query) {
        return applications;
      }

      return applications.filter(
        (application) =>
          [
            application.fullName,
            application.email,
            application.roleTitle,
            application.phone,
          ].some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(query)
          )
      );
    }, [
      applications,
      applicationSearch,
    ]);

  const roleApplicationCount =
    useMemo(
      () =>
        new Set(
          applications
            .map(
              (application) =>
                application.roleTitle
            )
            .filter(Boolean)
        ).size,
      [applications]
    );

  const loadJobs = useCallback(
    async () => {
      setLoadingJobs(true);
      setPageError("");

      try {
        const data =
          await careersApi.getAdminJobs();

        setJobs(
          Array.isArray(data)
            ? data
            : []
        );

        setSignedIn(true);
      } catch (error) {
        const message =
          getErrorMessage(
            error,
            "Job roles could not be loaded."
          );

        if (
          /login|required|session|expired|unauthorised|unauthorized/i.test(
            message
          )
        ) {
          setSignedIn(false);
          setJobs([]);
        } else {
          setPageError(message);
        }

        throw error;
      } finally {
        setLoadingJobs(false);
      }
    },
    []
  );

  const loadApplications =
    useCallback(async () => {
      setLoadingApplications(true);
      setPageError("");

      try {
        const data =
          await careersApi.getApplications();

        setApplications(
          Array.isArray(data)
            ? data
            : []
        );

        setSignedIn(true);
      } catch (error) {
        const message =
          getErrorMessage(
            error,
            "Applications could not be loaded."
          );

        if (
          /login|required|session|expired|unauthorised|unauthorized/i.test(
            message
          )
        ) {
          setSignedIn(false);
          setApplications([]);
        } else {
          setPageError(message);
        }
      } finally {
        setLoadingApplications(false);
      }
    }, []);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        await careersApi.getAdminSession();

        if (!active) {
          return;
        }

        setSignedIn(true);

        await loadJobs();
      } catch {
        if (active) {
          setSignedIn(false);
          setJobs([]);
          setApplications([]);
        }
      } finally {
        if (active) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [loadJobs]);

  async function handleLogin() {
    setCheckingSession(true);

    try {
      await careersApi.getAdminSession();

      setSignedIn(true);

      await loadJobs();
    } finally {
      setCheckingSession(false);
    }
  }

  async function handleLogout() {
    try {
      await careersApi.logout();
    } catch (error) {
      console.error(
        "Administrator logout failed:",
        error
      );
    } finally {
      setSignedIn(false);
      setJobs([]);
      setApplications([]);
      setActiveView("roles");
      setApplicationSearch("");
      setEditingJob(null);
      setShowEditor(false);
      setPageError("");
    }
  }

  function showRoles() {
    setActiveView("roles");
    setPageError("");
  }

  async function showApplications() {
    setActiveView("applications");
    setPageError("");

    if (applications.length === 0) {
      await loadApplications();
    }
  }

  function startCreate() {
    setEditingJob(null);
    setShowEditor(true);
    setPageError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function startEdit(job) {
    setEditingJob(job);
    setShowEditor(true);
    setPageError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function closeEditor() {
    setEditingJob(null);
    setShowEditor(false);
  }

  async function handleSaved() {
    closeEditor();

    try {
      await loadJobs();
    } catch {
      // loadJobs handles the visible error.
    }
  }

  async function handleDelete(job) {
    const confirmed =
      window.confirm(
        `Delete "${job.title}"? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeletingJobId(job.id);
    setPageError("");

    try {
      await careersApi.deleteJob(
        job.id
      );

      await loadJobs();
    } catch (error) {
      setPageError(
        getErrorMessage(
          error,
          "The role could not be deleted."
        )
      );
    } finally {
      setDeletingJobId(null);
    }
  }

  if (checkingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-100 p-5">
        <div className="text-center">
          <Loader2 className="mx-auto h-9 w-9 animate-spin text-blue-700" />

          <p className="mt-4 font-black text-slate-600">
            Checking administrator session...
          </p>
        </div>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <LoginPanel
        onLogin={handleLogin}
      />
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-[#06112e] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
              <Briefcase className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Careers administration
              </h1>

              <p className="mt-1 text-sm font-semibold text-white/65">
                Manage vacancies and review candidate applications.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {!showEditor && (
          <nav className="mb-8 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <button
              type="button"
              onClick={showRoles}
              className={`inline-flex items-center rounded-2xl px-5 py-3 text-sm font-black transition ${
                activeView === "roles"
                  ? "bg-[#07133c] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Briefcase className="mr-2 h-4 w-4" />

              Job roles
            </button>

            <button
              type="button"
              onClick={() => {
                showApplications().catch(
                  () => {}
                );
              }}
              className={`inline-flex items-center rounded-2xl px-5 py-3 text-sm font-black transition ${
                activeView ===
                "applications"
                  ? "bg-[#07133c] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Users className="mr-2 h-4 w-4" />

              Applications

              {applications.length > 0 && (
                <span className="ml-2 rounded-full bg-cyan-300 px-2 py-0.5 text-xs text-[#07133c]">
                  {applications.length}
                </span>
              )}
            </button>
          </nav>
        )}

        {showEditor ? (
          <JobEditor
            key={
              editingJob?.id ||
              "new-job"
            }
            initialJob={editingJob}
            onSaved={handleSaved}
            onCancel={closeEditor}
          />
        ) : activeView ===
          "applications" ? (
          <section>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#07133c]">
                  Candidate applications
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Review applicants, screening responses and submitted CVs.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="search"
                    value={
                      applicationSearch
                    }
                    onChange={(event) =>
                      setApplicationSearch(
                        event.target
                          .value
                      )
                    }
                    placeholder="Search applicants..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 sm:w-72"
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    loadApplications()
                  }
                  disabled={
                    loadingApplications
                  }
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${
                      loadingApplications
                        ? "animate-spin"
                        : ""
                    }`}
                  />

                  Refresh
                </button>
              </div>
            </div>

            <section className="mt-6 grid gap-4 sm:grid-cols-3">
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Total applications
                </p>

                <p className="mt-3 text-3xl font-black text-[#07133c]">
                  {applications.length}
                </p>
              </article>

              <article className="rounded-3xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">
                  Roles applied for
                </p>

                <p className="mt-3 text-3xl font-black text-blue-800">
                  {roleApplicationCount}
                </p>
              </article>

              <article className="rounded-3xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-violet-700">
                  Search results
                </p>

                <p className="mt-3 text-3xl font-black text-violet-800">
                  {
                    filteredApplications.length
                  }
                </p>
              </article>
            </section>

            {pageError && (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
                {pageError}
              </div>
            )}

            {loadingApplications ? (
              <div className="mt-6 grid min-h-52 place-items-center rounded-3xl border border-slate-200 bg-white">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-700" />

                  <p className="mt-3 font-black text-slate-600">
                    Loading applications...
                  </p>
                </div>
              </div>
            ) : filteredApplications.length ===
              0 ? (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <Users className="mx-auto h-12 w-12 text-blue-700" />

                <h3 className="mt-5 text-xl font-black text-[#07133c]">
                  No applications found
                </h3>

                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Applications will appear here after candidates submit the careers form.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {filteredApplications.map(
                  (application) => (
                    <ApplicationCard
                      key={
                        application.id
                      }
                      application={
                        application
                      }
                    />
                  )
                )}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Total roles
                </p>

                <p className="mt-3 text-3xl font-black text-[#07133c]">
                  {jobs.length}
                </p>
              </article>

              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                  Published
                </p>

                <p className="mt-3 text-3xl font-black text-emerald-800">
                  {publishedCount}
                </p>
              </article>

              <article className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-700">
                  Drafts
                </p>

                <p className="mt-3 text-3xl font-black text-amber-800">
                  {draftCount}
                </p>
              </article>
            </section>

            <section className="mt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-black text-[#07133c]">
                    Job roles
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    Published roles appear on the public careers page.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      loadJobs().catch(
                        () => {}
                      )
                    }
                    disabled={loadingJobs}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${
                        loadingJobs
                          ? "animate-spin"
                          : ""
                      }`}
                    />

                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={startCreate}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.01]"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create role
                  </button>
                </div>
              </div>

              {pageError && (
                <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
                  {pageError}
                </div>
              )}

              {loadingJobs ? (
                <div className="mt-6 grid min-h-52 place-items-center rounded-3xl border border-slate-200 bg-white">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-700" />

                    <p className="mt-3 font-black text-slate-600">
                      Loading job roles...
                    </p>
                  </div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                  <Briefcase className="mx-auto h-12 w-12 text-blue-700" />

                  <h3 className="mt-5 text-xl font-black text-[#07133c]">
                    No job roles yet
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    Create the first role to begin managing careers vacancies.
                  </p>

                  <button
                    type="button"
                    onClick={startCreate}
                    className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-pink-600 px-6 py-3 text-sm font-black text-white shadow-lg"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create role
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      deleting={
                        deletingJobId ===
                        job.id
                      }
                      onEdit={startEdit}
                      onDelete={
                        handleDelete
                      }
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}