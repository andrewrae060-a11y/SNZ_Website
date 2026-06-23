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

export default function EnquiryModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    enquiryType: "General enquiry",
    message: "",
    urgent: false,
  });

  if (!open) return null;

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const priority = form.urgent ? "URGENT - " : "";
    const subject = `${priority}Smart Net Zero website enquiry - ${form.enquiryType}`;

    const body = [
      "New Smart Net Zero website enquiry",
      "",
      `Priority: ${form.urgent ? "URGENT" : "Normal"}`,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Organisation: ${form.organisation || "Not provided"}`,
      "",
      "Enquiry type:",
      form.enquiryType,
      "",
      "Message:",
      form.message,
      "",
      "---",
      "This enquiry was submitted from the Smart Net Zero prototype website.",
    ].join("\n");

    const mailtoLink =
      "mailto:sales@smartnetzero.co.uk" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-teal-300/20 bg-[#06112e] text-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 p-6 md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-300">
              Contact Smart Net Zero
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Talk to an Expert
            </h2>

            <p className="mt-3 max-w-2xl text-white/70">
              Tell us what you need help with and we’ll route your enquiry to the right team.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close enquiry form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white/80">
                Name *
              </span>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300"
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
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300"
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
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300"
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
                  value={form.organisation}
                  onChange={(event) =>
                    updateField("organisation", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/15 bg-[#071936] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300"
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
              value={form.enquiryType}
              onChange={(event) =>
                updateField("enquiryType", event.target.value)
              }
              className="w-full rounded-xl border border-white/15 bg-[#071936] px-4 py-4 text-white outline-none focus:border-teal-300"
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
              rows={5}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full resize-none rounded-xl border border-white/15 bg-[#071936] px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-teal-300"
              placeholder="Please describe your enquiry..."
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4">
            <input
              type="checkbox"
              checked={form.urgent}
              onChange={(event) => updateField("urgent", event.target.checked)}
              className="mt-1 h-5 w-5 accent-amber-400"
            />

            <span>
              <span className="flex items-center gap-2 font-black text-amber-200">
                <AlertTriangle className="h-5 w-5" />
                Mark this enquiry as urgent
              </span>

              <span className="mt-1 block text-sm leading-6 text-white/70">
                This will add “URGENT” to your enquiry so our team know you need a priority response.
              </span>
            </span>
          </label>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="h-4 w-4 text-teal-300" />
              Your email app will open with the enquiry ready to send.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/20 px-6 py-3 font-black text-white/80 transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-3 font-black text-white shadow-xl transition hover:scale-[1.02]"
              >
                Create enquiry email
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}