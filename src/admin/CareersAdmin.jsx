import { useEffect, useState } from "react";
import {
  Briefcase,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import {
  adminToken,
  careersApi,
} from "../lib/careersApi";

const emptyJob = {
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
  benefits: [],
  published: false,
  sortOrder: 100,
};

function textToList(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToText(value = []) {
  return value.join("\n");
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const result = await careersApi.login(
        email,
        password
      );

      adminToken.set(result.token);
      onLogin();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
          <Briefcase className="h-8 w-8" />
        </div>

        <h1 className="mt-5 text-3xl font-black text-[#07133c]">
          SNZ careers admin
        </h1>

        <p className="mt-2 font-semibold text-slate-600">
          Sign in to add and manage website vacancies.
        </p>

        <label className="mt-6 block">
          <span className="text-sm font-black text-slate-700">
            Email address
          </span>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500"
            required
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-black text-slate-700">
            Password
          </span>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500"
            required
          />
        </label>

        {error && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full rounded-xl bg-blue-700 px-5 py-3 font-black text-white disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function JobEditor({
  initialJob,
  onSaved,
  onCancel,
}) {
  const [form, setForm] = useState({
  ...emptyJob,
  ...initialJob,

  roleIncludesText: listToText(
    initialJob?.roleIncludes || []
  ),

  skillsNeededText: listToText(
    initialJob?.skillsNeeded || []
  ),

  benefitsText: listToText(
    initialJob?.benefits || []
  ),
});

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-cyan-500";

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setSaving(true);

    try {
      const payload = {
        title: form.title,
        department: form.department,
        location: form.location,
        type: form.type,
        status: form.status,
        icon: form.icon,
        summary: form.summary,
        salary: form.salary,
        roleIncludes: textToList(
          form.roleIncludesText
        ),

        skillsNeeded: textToList(
          form.skillsNeededText
        ),

        benefits: textToList(
          form.benefitsText
        ),
        published: form.published,
        sortOrder: Number(form.sortOrder),
      };

      const savedJob = form.id
        ? await careersApi.updateJob(
            form.id,
            payload
          )
        : await careersApi.createJob(
            payload
          );

      onSaved(savedJob);
    } catch (saveError) {
      setMessage(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#07133c]">
            {form.id ? "Edit role" : "Add a role"}
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            Complete the role details below.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close editor"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-bold text-slate-700">
          Job title *

          <input
            className={inputClass}
            value={form.title}
            onChange={(event) =>
              updateField(
                "title",
                event.target.value
              )
            }
            required
          />
        </label>

        <label className="text-sm font-bold text-slate-700">
          Department *

          <input
            className={inputClass}
            value={form.department}
            onChange={(event) =>
              updateField(
                "department",
                event.target.value
              )
            }
            required
          />
        </label>

        <label className="text-sm font-bold text-slate-700">
          Location *

          <input
            className={inputClass}
            value={form.location}
            onChange={(event) =>
              updateField(
                "location",
                event.target.value
              )
            }
            placeholder="London / Hybrid"
            required
          />
        </label>

        <label className="text-sm font-bold text-slate-700">
          Employment type *

          <select
            className={inputClass}
            value={form.type}
            onChange={(event) =>
              updateField(
                "type",
                event.target.value
              )
            }
          >
            <option>Full time</option>
            <option>Part time</option>
            <option>Fixed-term contract</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </label>

        <label className="text-sm font-bold text-slate-700">
          Status *

          <select
            className={inputClass}
            value={form.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value
              )
            }
          >
            <option>Open</option>
            <option>Closing soon</option>
            <option>On hold</option>
          </select>
        </label>

        <label className="text-sm font-bold text-slate-700">
          Salary

          <input
            className={inputClass}
            value={form.salary}
            onChange={(event) =>
              updateField(
                "salary",
                event.target.value
              )
            }
            placeholder="£45,000–£55,000"
          />
        </label>

        <label className="text-sm font-bold text-slate-700">
          Icon

          <select
            className={inputClass}
            value={form.icon}
            onChange={(event) =>
              updateField(
                "icon",
                event.target.value
              )
            }
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

        <label className="text-sm font-bold text-slate-700">
          Display order

          <input
            className={inputClass}
            type="number"
            min="0"
            max="9999"
            value={form.sortOrder}
            onChange={(event) =>
              updateField(
                "sortOrder",
                Number(event.target.value)
              )
            }
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-bold text-slate-700">
        Role summary *

        <textarea
          className={inputClass}
          rows={4}
          value={form.summary}
          onChange={(event) =>
            updateField(
              "summary",
              event.target.value
            )
          }
          required
        />
      </label>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <label className="text-sm font-bold text-slate-700">
          What the role includes

          <span className="block text-xs font-normal text-slate-500">
            Enter one item per line.
          </span>

          <textarea
            className={inputClass}
            rows={9}
            value={form.roleIncludesText}
            onChange={(event) =>
              updateField(
                "roleIncludesText",
                event.target.value
              )
            }
            placeholder={`Lead client projects
          Prepare technical reports
          Present recommendations to stakeholders`}
          />
        </label>

        <label className="text-sm font-bold text-slate-700">
          Skills needed

          <span className="block text-xs font-normal text-slate-500">
            Enter one item per line.
          </span>

          <textarea
            className={inputClass}
            rows={9}
            value={form.skillsNeededText}
            onChange={(event) =>
              updateField(
                "skillsNeededText",
                event.target.value
              )
            }
            placeholder={`Strong communication skills
          Experience in sustainability consulting
          Excellent analytical ability`}
          />
        </label>

        <label className="text-sm font-bold text-slate-700">
          Role benefits

          <span className="block text-xs font-normal text-slate-500">
            Enter one item per line.
          </span>

          <textarea
            className={inputClass}
            rows={9}
            value={form.benefitsText}
            onChange={(event) =>
              updateField(
                "benefitsText",
                event.target.value
              )
            }
            placeholder={`Hybrid working
          Pension contribution
          Professional development`}
          />
        </label>
      </div>

      <label className="mt-5 flex items-center gap-3 font-bold text-slate-700">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(event) =>
            updateField(
              "published",
              event.target.checked
            )
          }
          className="h-5 w-5"
        />

        Publish this role on the careers page
      </label>

      {message && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 font-bold text-rose-700">
          {message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-xl bg-blue-700 px-5 py-3 font-black text-white disabled:opacity-60"
        >
          <Save className="mr-2 h-4 w-4" />

          {saving ? "Saving..." : "Save role"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-5 py-3 font-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function CareersAdmin() {
  const [signedIn, setSignedIn] = useState(
    Boolean(adminToken.get())
  );

  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] =
    useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  async function loadJobs() {
    setLoading(true);

    try {
      const result =
        await careersApi.getAdminJobs();

      setJobs(result);
      setError("");
    } catch (loadError) {
      if (
        /sign-in|session|administrator/i.test(
          loadError.message
        )
      ) {
        adminToken.clear();
        setSignedIn(false);
      } else {
        setError(loadError.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (signedIn) {
      loadJobs();
    }
  }, [signedIn]);

  function signOut() {
    adminToken.clear();
    setSignedIn(false);
    setJobs([]);
  }

  async function removeJob(job) {
    const confirmed = window.confirm(
      `Delete "${job.title}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await careersApi.deleteJob(job.id);
      await loadJobs();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  if (!signedIn) {
    return (
      <LoginForm
        onLogin={() => setSignedIn(true)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#07133c]">
              Website job roles
            </h1>

            <p className="mt-1 font-semibold text-slate-600">
              Add, edit, publish and remove careers vacancies.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setEditingJob({
                  ...emptyJob,
                })
              }
              className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-3 font-black text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add role
            </button>

            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3 font-black"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </header>

        {error && (
          <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 font-bold text-rose-700">
            {error}
          </p>
        )}

        {editingJob && (
          <div className="mt-6">
            <JobEditor
              initialJob={editingJob}
              onCancel={() =>
                setEditingJob(null)
              }
              onSaved={async () => {
                setEditingJob(null);
                await loadJobs();
              }}
            />
          </div>
        )}

        <section className="mt-6 space-y-3">
          {loading && (
            <p className="rounded-2xl bg-white p-8 text-center font-bold text-slate-600">
              Loading job roles...
            </p>
          )}

          {!loading &&
            jobs.map((job) => (
              <article
                key={job.id}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-black text-[#07133c]">
                      {job.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        job.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {job.published
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>

                  <p className="mt-1 font-semibold text-slate-600">
                    {job.department} ·{" "}
                    {job.location} · {job.type}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Display order:{" "}
                    {job.sortOrder}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingJob({
                        ...job,
                      })
                    }
                    className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 font-black"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeJob(job)
                    }
                    className="inline-flex items-center rounded-xl border border-rose-200 px-4 py-2 font-black text-rose-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}

          {!loading &&
            jobs.length === 0 &&
            !editingJob && (
              <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center font-bold text-slate-600">
                No roles have been added yet.
              </p>
            )}
        </section>
      </div>
    </main>
  );
}