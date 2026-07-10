import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

function normaliseServiceKey(value = "") {
  const key = value.toLowerCase().trim();

  if (
    key.includes("sustainability") ||
    key.includes("net zero") ||
    key.includes("carbon")
  ) {
    return "sustainability";
  }

  if (
    key.includes("regulation") ||
    key.includes("compliance") ||
    key.includes("smart regulations")
  ) {
    return "regulations";
  }

  if (
    key.includes("energy") ||
    key.includes("smart energy") ||
    key.includes("energy management")
  ) {
    return "energy";
  }

  if (
    key.includes("ot") ||
    key.includes("operational technology") ||
    key.includes("security") ||
    key.includes("resilience")
  ) {
    return "ot";
  }

  return key;
}

export default function FAQSection({
  eyebrow = "Frequently asked questions",
  title = "Common questions",
  text,
  faqs = [],
  serviceKey = "",
  service = "",
  openEnquiryForm,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const resolvedFaqs = useMemo(() => {
    if (Array.isArray(faqs) && faqs.length) {
      return faqs;
    }

    const keyFromService = normaliseServiceKey(serviceKey || service || title);

    return SERVICE_FAQS[keyFromService] || [];
  }, [faqs, serviceKey, service, title]);

  if (!resolvedFaqs.length) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            {eyebrow && (
              <p className="text-sm font-black uppercase tracking-[0.16em] text-green-700">
                {eyebrow}
              </p>
            )}

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              {title}
            </h2>

            {text && (
              <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-600">
                {text}
              </p>
            )}

            {openEnquiryForm && (
              <button
                type="button"
                onClick={openEnquiryForm}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-green-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
              >
                Speak to our team
              </button>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-lg shadow-slate-900/5 md:p-5">
            <div className="space-y-3">
              {resolvedFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={`${faq.question}-${index}`}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-black leading-6 text-slate-950 md:text-base">
                        {faq.question}
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-green-700 transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 pb-5 pt-1">
                        <p className="text-sm font-semibold leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}