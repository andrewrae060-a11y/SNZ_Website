import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";

const enquiryOptions = [
  "Sustainability & Net Zero",
  "OT Security & Resilience",
  "Smart Energy Management",
  "Smart Regulations & Compliance",
  "Research / University Partnership",
  "Partnership enquiry",
  "General enquiry",
];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  enquiryType: "General enquiry",
  message: "",
  urgent: false,
};

export default function EnquiryModal({ open, onClose }) {
  const [form, setForm] = useState(initialFormState);

  const [submitState, setSubmitState] = useState({
    loading: false,
    success: "",
    error: "",
  });

  if (!open) return null;

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitState.success || submitState.error) {
      setSubmitState({
        loading: false,
        success: "",
        error: "",
      });
    }
  }

  function handleClose() {
    if (submitState.loading) return;

    setSubmitState({
      loading: false,
      success: "",
      error: "",
    });

    onClose();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitState.loading) return;

    setSubmitState({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const contentType =
        response.headers.get("content-type") || "";

      let result;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const responseText = await response.text();

        result = {
          message:
            responseText ||
            "Your enquiry could not be sent.",
        };
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Your enquiry could not be sent."
        );
      }

      setSubmitState({
        loading: false,
        success:
          result.message ||
          "Your enquiry has been sent successfully.",
        error: "",
      });

      setForm(initialFormState);
    } catch (error) {
      console.error("Enquiry submission failed:", error);

      setSubmitState({
        loading: false,
        success: "",
        error:
          error?.message ||
          "There was a problem sending your enquiry. Please try again.",
      });
    }
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-teal-300/20 bg-[#06112e] text-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 p-6 md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-300">
              Contact Smart Net Zero
            </p>

            <h2
              id="enquiry-modal-title"
              className="mt-3 text-3xl font-black leading-tight md:text-4xl"
            >
              Talk to an Expert
            </h2>

            <p className="mt-3 max-w-2xl text-white/70">
              Tell us what you need help with and we’ll route
              your enquiry to the right team.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitState.loading}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close enquiry form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white/80">
                Name *
              </span>

              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />

                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  disabled={submitState.loading}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Your name"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white/80">
                Email *
              </span>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />

                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  disabled={submitState.loading}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white/80">
                Phone *
              </span>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />

                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  disabled={submitState.loading}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Phone number"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white/80">
                Organisation optional
              </span>

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />

                <input
                  type="text"
                  name="organisation"
                  autoComplete="organization"
                  value={form.organisation}
                  onChange={(event) =>
                    updateField(
                      "organisation",
                      event.target.value
                    )
                  }
                  disabled={submitState.loading}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Organisation name"
                />
              </div>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white/80">
              What can we help with?
            </span>

            <select
              name="enquiryType"
              value={form.enquiryType}
              onChange={(event) =>
                updateField(
                  "enquiryType",
                  event.target.value
                )
              }
              disabled={submitState.loading}
              className="w-full rounded-xl border border-white/15 bg-[#071936] px-4 py-4 text-white outline-none focus:border-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enquiryOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-[#071936] text-white"
                >
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white/80">
              Message *
            </span>

            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) =>
                updateField("message", event.target.value)
              }
              disabled={submitState.loading}
              className="w-full resize-none rounded-xl border border-white/15 bg-[#071936] px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Please describe your enquiry..."
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4">
            <input
              type="checkbox"
              name="urgent"
              checked={form.urgent}
              onChange={(event) =>
                updateField("urgent", event.target.checked)
              }
              disabled={submitState.loading}
              className="mt-1 h-5 w-5 accent-amber-400 disabled:cursor-not-allowed"
            />

            <span>
              <span className="flex items-center gap-2 font-black text-amber-200">
                <AlertTriangle className="h-5 w-5" />
                Mark this enquiry as urgent
              </span>

              <span className="mt-1 block text-sm leading-6 text-white/70">
                This will add “URGENT” to your enquiry so
                our team know you need a priority response.
              </span>
            </span>
          </label>

          {submitState.error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-300/30 bg-red-400/10 p-4 text-sm font-bold text-red-200"
            >
              {submitState.error}
            </div>
          )}

          {submitState.success && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl border border-teal-300/30 bg-teal-300/10 p-4 text-sm font-bold text-teal-200"
            >
              {submitState.success}
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-300" />
              Your enquiry will be sent securely to the
              Smart Net Zero team.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={submitState.loading}
                className="rounded-2xl border border-white/20 px-6 py-3 font-black text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitState.loading}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-3 font-black text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitState.loading
                  ? "Sending enquiry..."
                  : "Send "}

                {!submitState.loading && (
                  <ArrowRight className="ml-2 h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}