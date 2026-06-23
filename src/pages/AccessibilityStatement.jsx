import { useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  FileText,
  Keyboard,
  Mail,
  MapPin,
  MousePointer2,
  Phone,
  Scale,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Statement",
    content: [
      "Smart Net Zero Ltd is committed to making its website accessible and usable for as many people as possible.",
      "We want everyone who visits our website to be able to access information about our services, policies, insights and contact options in a clear, inclusive and user-friendly way.",
      "We aim to make reasonable adjustments to improve accessibility and to support users with different needs, including people using assistive technologies, screen readers, keyboard navigation, magnification tools or alternative input methods.",
      "We recognise that accessibility is an ongoing process and will continue to improve the accessibility, usability and clarity of our digital content as our website and services develop.",
    ],
  },
  {
    number: "02",
    title: "Our Accessibility Commitment",
    content: [
      "We aim to follow recognised good practice for digital accessibility, including the principles of the Web Content Accessibility Guidelines where reasonably practicable.",
      "Our goal is to ensure the website is perceivable, operable, understandable and robust.",
      "We aim to provide content that is clearly structured, readable, responsive across devices and compatible with common browsers and assistive technologies.",
      "Where new website features or content are introduced, we will consider accessibility during design, development and review.",
    ],
  },
  {
    number: "03",
    title: "What We Are Working To Support",
    content: [
      "We are working to ensure users can navigate the website using a keyboard where possible.",
      "We aim to use clear headings, readable text, meaningful links and sufficient colour contrast across our pages.",
      "We aim to provide alternative text for meaningful images where appropriate.",
      "We aim to ensure pages display effectively across desktop, tablet and mobile devices.",
      "We aim to avoid unnecessary barriers caused by complex layouts, unclear navigation, inaccessible forms or non-descriptive buttons.",
    ],
    bullets: [
      "Clear page structure and headings.",
      "Readable text and consistent navigation.",
      "Keyboard and screen reader-friendly design where possible.",
      "Responsive pages across common devices.",
      "Meaningful labels, links and buttons.",
      "Improved colour contrast and visual clarity.",
    ],
  },
  {
    number: "04",
    title: "Known Limitations",
    content: [
      "We are continuing to review our website and digital content for accessibility improvements.",
      "Some older documents, third-party embedded content, externally linked websites or generated visual assets may not yet meet the same accessibility standards as the core website.",
      "Some PDF documents may require additional formatting work to fully support screen readers or other assistive technologies.",
      "Where a barrier is identified, we will aim to review it and make reasonable improvements or provide an alternative accessible format where practicable.",
    ],
  },
  {
    number: "05",
    title: "Alternative Formats",
    content: [
      "If you need information from the website in a different format, such as large print, plain text, accessible PDF, audio summary or another reasonable format, please contact us.",
      "We will review requests and aim to respond in a reasonable timeframe.",
      "When contacting us, please include the page or document you need, the format required and your contact details so we can respond appropriately.",
    ],
  },
  {
    number: "06",
    title: "Feedback and Reporting Issues",
    content: [
      "We welcome feedback on the accessibility of our website.",
      "If you experience an accessibility issue, find any part of the website difficult to use, or believe we could improve the way information is presented, please contact us.",
      "We will consider all accessibility feedback and use it to help improve future website updates.",
    ],
  },
];

const commitments = [
  {
    title: "Inclusive access",
    text: "We aim to make website content usable for as many people as possible.",
    icon: Users,
  },
  {
    title: "Clear navigation",
    text: "We work to provide consistent page structure, headings and meaningful links.",
    icon: MousePointer2,
  },
  {
    title: "Assistive support",
    text: "We consider keyboard navigation, screen readers and alternative access needs.",
    icon: Keyboard,
  },
  {
    title: "Ongoing improvement",
    text: "Accessibility is reviewed as the website and digital content develops.",
    icon: ShieldCheck,
  },
];

const accessibilityFeatures = [
  {
    title: "Readable content",
    text: "Clear language, structured headings and consistent layout.",
    icon: FileText,
  },
  {
    title: "Visual clarity",
    text: "Good contrast, spacing and responsive design where possible.",
    icon: Eye,
  },
  {
    title: "Device friendly",
    text: "Pages designed to work across desktop, tablet and mobile.",
    icon: Smartphone,
  },
  {
    title: "Reasonable adjustments",
    text: "Alternative formats can be requested where needed.",
    icon: CheckCircle2,
  },
];

function PolicySection({ section }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-lg font-black text-white">
          {section.number}
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#07133c]">
            {section.title}
          </h2>

          <div className="mt-5 space-y-4">
            {section.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm font-semibold leading-7 text-slate-650"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {section.bullets && (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {section.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AccessibilityStatement({ goToPage, openEnquiryForm }) {

  useEffect(() => {
    document.title = "Accessibility Statement | Smart Net Zero";
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="AccessibilityStatement"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] px-5 py-16 text-white lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.20),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(168,85,247,0.18),transparent_30%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
                Smart Net Zero Ltd
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Accessibility Statement
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
                Our commitment to making Smart Net Zero’s website accessible,
                inclusive and usable for as many people as possible.
              </p>

              <div className="mt-8 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200">
                Last reviewed: 5 June 2026
              </div>
            </div>
          </div>
        </section>

        <section className="-mt-10 px-5 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/8"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50">
                    <Icon className="h-7 w-7 text-cyan-700" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#07133c]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-14 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.65fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Statement contents
                </h2>

                <div className="mt-4 h-1 w-12 rounded-full bg-cyan-400" />

                <nav className="mt-6 space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.number}
                      href={`#section-${section.number}`}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
                    >
                      <span className="text-cyan-700">{section.number}</span>
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 rounded-2xl bg-[#06112e] p-5 text-white">
                  <Scale className="h-8 w-8 text-cyan-300" />

                  <h3 className="mt-4 font-black">Need another format?</h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                    Contact us if you need website information in an alternative
                    accessible format.
                  </p>

                  <button
                    type="button"
                    onClick={openEnquiryForm}
                    className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-pink-600 to-violet-700 px-4 py-3 text-sm font-black text-white"
                  >
                    Contact Smart Net Zero
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.number} id={`section-${section.number}`}>
                  <PolicySection section={section} />
                </div>
              ))}

              <article className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-cyan-700" />

                  <div>
                    <h2 className="text-2xl font-black text-[#07133c]">
                      Accessibility improvement approach
                    </h2>

                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                      We will continue to review accessibility as part of
                      website updates, new page development, document
                      publication and user feedback. Where issues are identified,
                      we will aim to make reasonable improvements or provide an
                      alternative accessible format where practicable.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Accessibility features
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {accessibilityFeatures.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <Icon className="h-7 w-7 text-cyan-700" />

                        <h3 className="mt-4 text-base font-black text-[#07133c]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Contact details
                </h2>

                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  To request an alternative format, report an accessibility
                  issue or provide feedback, please contact Smart Net Zero.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Phone className="h-6 w-6 text-cyan-700" />
                    <p className="mt-3 text-sm font-black text-[#07133c]">
                      +44 (0)20 8720 7153
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Mail className="h-6 w-6 text-cyan-700" />
                    <a
                      href="mailto:info@smartnetzero.co.uk"
                      className="mt-3 block text-sm font-black text-[#07133c] hover:text-cyan-700"
                    >
                      info@smartnetzero.co.uk
                    </a>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <MapPin className="h-6 w-6 text-cyan-700" />
                    <p className="mt-3 text-sm font-black leading-6 text-[#07133c]">
                      Clyde Offices, 2nd Floor, 48 West George Street, Glasgow,
                      G2 1BP
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}