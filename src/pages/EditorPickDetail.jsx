import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import SNZFooter from "../components/SNZFooter";
import SNZHeader from "../components/SNZHeader";
import { fallbackEditorPicks } from "../content/editorPicks";
import useGoogleTag from "../hooks/useGoogleTag";
import { useSocialHubContent } from "../hooks/useSocialHubContent";
import { getEditorPickSlug } from "../lib/editorPicks";

function unwrapEditorPicks(content) {
  const section = content?.editorPicks || content?.editor_picks || [];

  return section.map((item) => ({
    ...(item?.data && typeof item.data === "object" ? item.data : item),
    id: item?.id,
    itemKey: item?.itemKey,
    publishedAt: item?.data?.publishedAt || item?.publishedAt,
    updatedAt: item?.updatedAt,
  }));
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function setMeta(name, content, attribute = "name") {
  if (!content) return;

  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export default function EditorPickDetail({ goToPage, openEnquiryForm }) {
  const { slug = "" } = useParams();
  const { content, loading, error } = useSocialHubContent();
  const editorPicks = error ? fallbackEditorPicks : unwrapEditorPicks(content);
  const item = useMemo(
    () => editorPicks.find((pick) => getEditorPickSlug(pick) === slug),
    [editorPicks, slug]
  );

  useGoogleTag(item?.seoTitle || item?.title);

  useEffect(() => {
    const title = item
      ? item.seoTitle || `${item.title} | Smart Net Zero`
      : loading
        ? "Loading Editor’s Pick | Smart Net Zero"
        : "Editor’s Pick not found | Smart Net Zero";
    const description = item
      ? item.seoDescription || item.detailIntro || item.description || item.title
      : "The requested Editor’s Pick could not be found.";
    const canonicalUrl = item?.canonicalUrl || `${window.location.origin}/content-hub/${slug}`;

    document.title = title;
    setMeta("description", description);
    setMeta("keywords", item?.seoKeywords || "");
    setMeta("robots", item ? item.robots || "index,follow" : "noindex,follow");
    setMeta("og:title", item?.ogTitle || title, "property");
    setMeta("og:description", item?.ogDescription || description, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("twitter:card", item?.image ? "summary_large_image" : "summary");
    setMeta("twitter:title", item?.ogTitle || title);
    setMeta("twitter:description", item?.ogDescription || description);

    if (item?.image) {
      setMeta("og:image", item.ogImage || item.image, "property");
      setMeta("twitter:image", item.ogImage || item.image);
    }

    setCanonical(canonicalUrl);
  }, [item, loading, slug]);

  const publishedDate = formatDate(item?.publishedAt);
  const heading = item?.detailHeading || item?.title;
  const eyebrow = item?.detailEyebrow || item?.type || "Editor’s Pick";

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SocialMedia"
      />

      <main>
        <nav className="border-b border-slate-200 bg-slate-50 px-5 py-4 lg:px-8" aria-label="Content Hub navigation">
          <div className="mx-auto max-w-5xl">
            <Link to="/content-hub" className="inline-flex items-center gap-2 text-sm font-black text-teal-700 transition hover:text-teal-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Content Hub
            </Link>
          </div>
        </nav>

        {loading && (
          <div className="mx-auto grid min-h-[55vh] max-w-5xl place-items-center px-5 py-16 text-center font-bold text-slate-600">
            Loading Editor’s Pick…
          </div>
        )}

        {!loading && !item && (
          <section className="mx-auto max-w-3xl px-5 py-20 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Content Hub</p>
            <h1 className="mt-3 text-4xl font-black">Editor’s Pick not found</h1>
            <p className="mt-5 leading-7 text-slate-600">This story may have moved or is no longer published.</p>
            <Link to="/content-hub" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-black text-white">
              View all content <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}

        {!loading && item && (
          <article>
            {item.image && (
              <div className="relative h-[320px] overflow-hidden bg-slate-100 sm:h-[440px]">
                <img src={item.image} alt={item.imageAlt || item.title || ""} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-9 text-white lg:px-8">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-300">{eyebrow}</p>
                  <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">{heading}</h1>
                </div>
              </div>
            )}

            <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
              {!item.image && (
                <header>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">{eyebrow}</p>
                  <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">{heading}</h1>
                </header>
              )}

              {publishedDate && (
                <p className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-500">
                  <CalendarDays className="h-4 w-4" /> Published {publishedDate}
                </p>
              )}

              {item.detailIntro && <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-700">{item.detailIntro}</p>}

              {item.detailQuote && (
                <blockquote className="mt-8 max-w-3xl rounded-2xl border-l-4 border-teal-500 bg-teal-50 p-6 text-xl font-bold leading-9 text-slate-900">
                  “{item.detailQuote}”
                </blockquote>
              )}

              {item.detailBody ? (
                <div className="snz-rich-content mt-9 max-w-3xl text-base leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: item.detailBody }} />
              ) : !item.detailIntro && (
                <p className="mt-7 max-w-3xl leading-8 text-slate-600">Further information is being prepared for this story.</p>
              )}

              {item.url && item.url !== "#" && (
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 font-black text-white shadow-lg">
                  {item.cta || "Open related content"} <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        )}
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}
