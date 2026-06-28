import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Edit3,
  FilePlus2,
  LogOut,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";

import SectionForm from "./forms/SectionForm";

const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_CMS_API_URL ||
  ""
).replace(/\/+$/, "");

const TOKEN_KEY = "snz_content_manager_token";
const CONTENT_MANAGER_EMAIL = "ContentManger@smartnetzero.co.uk";
const ALLOWED_CMS_ROLES = new Set(["content_manager", "super_admin"]);
const STARTING_SECTION = "channelPosts";

const CMS_SECTIONS = [
  { key: "page", label: "Page settings" },
  { key: "heroCards", label: "Hero cards" },
  { key: "channelPosts", label: "Social posts" },
  { key: "editorPicks", label: "Editor’s picks" },
  { key: "partnerContent", label: "Partner content" },
  { key: "events", label: "Events" },
  { key: "quickActions", label: "Quick actions" },
  { key: "channels", label: "Social channels" },
];

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function apiRequest(path, options = {}) {
  const token = getStoredToken();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(options.body && !isFormData
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    let responseBody = null;

    if (response.status !== 204) {
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        responseBody = await response.json();
      } else {
        responseBody = { message: await response.text() };
      }
    }

    if (!response.ok) {
      const error = new Error(
        responseBody?.message ||
          responseBody?.error ||
          "The request could not be completed."
      );
      error.status = response.status;
      throw error;
    }

    return responseBody;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The server did not respond within 15 seconds.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function createSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normaliseDestinationUrl(value) {
  const url = String(value || "").trim();

  if (!url) return "";

  if (
    url.startsWith("/") ||
    url.startsWith("#") ||
    /^mailto:/i.test(url) ||
    /^tel:/i.test(url)
  ) {
    return url;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

function normaliseContentUrls(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return data;
  }

  const normalised = { ...data };

  for (const field of ["url", "videoUrl", "heroImage", "image"]) {
    if (typeof normalised[field] === "string") {
      normalised[field] = normaliseDestinationUrl(normalised[field]);
    }
  }

  return normalised;
}

function getDefaultData(section) {
  switch (section) {
    case "page":
      return {
        eyebrow: "Social Media & Content Hub",
        headingLineOne: "Inspiring action.",
        headingLineTwo: "Driving change.",
        intro: "",
        socialHandle: "@smartnetzero",
        phoneCardText: "",
        heroImage: "",
        heroImageAlt: "",
        heroMediaId: null,
      };

    case "heroCards":
      return {
        type: "Article",
        title: "",
        cta: "Read more",
        url: "",
      };

    case "channelPosts":
      return {
        channel: "LinkedIn",
        publishedLabel: "Today",
        time: "Today",
        title: "",
        tags: [],
        image: "",
        imageAlt: "",
        videoUrl: "",
        mediaType: "image",
        mediaId: null,
        likes: 0,
        comments: 0,
        shares: 0,
        video: false,
        url: "",
      };

    case "editorPicks":
      return {
        type: "Article",
        title: "",
        cta: "Read article",
        image: "",
        imageAlt: "",
        mediaId: null,
        mediaType: "image",
        iconType: "article",
        url: "",
      };

    case "partnerContent":
      return {
        partner: "",
        type: "Thought Leadership",
        title: "",
        cta: "Read more",
        image: "",
        imageAlt: "",
        mediaId: null,
        mediaType: "image",
        url: "",
      };

    case "events":
      return {
        date: "",
        type: "Webinar",
        title: "",
        time: "10:00 AM GMT",
        action: "Register now",
        cta: "Register now",
        image: "",
        imageAlt: "",
        mediaId: null,
        mediaType: "image",
        url: "",
      };

    case "quickActions":
      return {
        actionType: "contribute",
        title: "",
        text: "",
        description: "",
        cta: "Learn more",
        url: "",
      };

    case "channels":
      return {
        name: "LinkedIn",
        action: "Follow",
        url: "",
      };

    default:
      return { title: "" };
  }
}

function createNewItem(section, sortOrder) {
  return {
    id: null,
    section,
    itemKey: "",
    status: "draft",
    sortOrder,
    data: getDefaultData(section),
  };
}

function normaliseItems(content, section) {
  if (!content || typeof content !== "object") return [];

  const sectionItems = content[section];
  if (!Array.isArray(sectionItems)) return [];

  return sectionItems.map((item) => ({
    id: item.id,
    section: item.section || section,
    itemKey: item.itemKey || item.item_key || "",
    status: item.status || "draft",
    sortOrder: item.sortOrder ?? item.sort_order ?? 0,
    data:
      item.data && typeof item.data === "object"
        ? item.data
        : {},
    createdAt: item.createdAt || item.created_at,
    updatedAt: item.updatedAt || item.updated_at,
  }));
}

function getItemTitle(item) {
  return (
    item?.data?.title ||
    item?.data?.heading ||
    item?.data?.headingLineOne ||
    item?.data?.name ||
    item?.data?.partner ||
    item?.itemKey ||
    "Untitled item"
  );
}

export default function AdminCMS({ goToPage }) {
  useEffect(() => {
        document.title = "Content Manager Admin | Smart Net Zero";
      }, []);

  const [authenticated, setAuthenticated] = useState(
    Boolean(getStoredToken())
  );
  const [selectedSection, setSelectedSection] = useState(
    STARTING_SECTION
  );
  const [content, setContent] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const items = useMemo(
    () => normaliseItems(content, selectedSection),
    [content, selectedSection]
  );

  const loadContent = useCallback(async () => {
    if (!getStoredToken()) {
      setAuthenticated(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await apiRequest("/api/admin/content");
      setContent(result?.content || result || {});
      setAuthenticated(true);
    } catch (requestError) {
      if (requestError.status === 401) {
        removeToken();
        setAuthenticated(false);
      }

      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadContent();
  }, [authenticated, loadContent]);

  const handleLogin = (token) => {
    storeToken(token);
    setAuthenticated(true);
    setMessage("Administrator signed in.");
  };

  const handleSignOut = () => {
    removeToken();
    setAuthenticated(false);
    setContent({});
    setEditingItem(null);
    setMessage("");
    setError("");
  };

  const handleSaved = async () => {
    setEditingItem(null);
    setMessage("Content saved successfully.");
    await loadContent();
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete "${getItemTitle(item)}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");

      await apiRequest(`/api/admin/content/${item.id}`, {
        method: "DELETE",
      });

      setMessage("Content deleted.");
      await loadContent();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} goToPage={goToPage} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-slate-950 p-5 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">
              Smart Net Zero
            </p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">
              Content administration
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Manage the Social Media and Content Hub.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {goToPage && (
              <button
                type="button"
                onClick={() => goToPage("SocialMedia")}
                className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-bold transition hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                View page
              </button>
            )}

            <button
              type="button"
              onClick={loadContent}
              disabled={loading}
              className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-bold transition hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </header>

        {message && (
          <StatusMessage
            type="success"
            message={message}
            onClose={() => setMessage("")}
          />
        )}

        {error && (
          <StatusMessage
            type="error"
            message={error}
            onClose={() => setError("")}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl bg-white p-3 shadow-sm">
            <p className="px-3 py-2 text-xs font-black uppercase tracking-[0.15em] text-slate-400">
              Content sections
            </p>

            {CMS_SECTIONS.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => {
                  setSelectedSection(section.key);
                  setEditingItem(null);
                }}
                className={`mb-1 block w-full rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
                  selectedSection === section.key
                    ? "bg-teal-50 text-teal-800"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {section.label}
                <span className="ml-2 text-xs font-normal text-slate-400">
                  {normaliseItems(content, section.key).length}
                </span>
              </button>
            ))}
          </aside>

          <main className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-teal-700">
                  Section
                </p>
                <h2 className="text-2xl font-black">
                  {CMS_SECTIONS.find(
                    (section) => section.key === selectedSection
                  )?.label}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingItem(
                    createNewItem(selectedSection, items.length)
                  )
                }
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-700"
              >
                <FilePlus2 className="mr-2 h-4 w-4" />
                Add item
              </button>
            </div>

            {loading && items.length === 0 ? (
              <div className="rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                Loading content…
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                <p className="font-bold text-slate-700">
                  No content exists in this section.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Select Add item to create the first record.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-black">
                          {getItemTitle(item)}
                        </h3>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        Key: {item.itemKey}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Display order: {item.sortOrder}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold transition hover:bg-slate-50"
                      >
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {editingItem && (
        <ContentEditor
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

function AdminLogin({ onLogin, goToPage }) {
  const [email, setEmail] = useState(CONTENT_MANAGER_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const result = await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!result?.token) {
        throw new Error(
          "The server did not return an administrator token."
        );
      }

      const administrator = result?.administrator || result?.admin;
      const role = String(administrator?.role || "").toLowerCase();

      if (!ALLOWED_CMS_ROLES.has(role)) {
        throw new Error(
          "This account does not have Content Manager access."
        );
      }

      onLogin(result.token);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-5 py-20">
      <form
        onSubmit={submit}
        className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
          Smart Net Zero
        </p>
        <h1 className="mt-2 text-3xl font-black">
          Administrator login
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          Sign in with the authorised Content Manager account to manage Social Media and Content Hub content.
        </p>

        {error && (
          <div className="mt-5 flex gap-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        <label className="mt-6 block">
          <span className="text-sm font-bold text-slate-700">
            Email address
          </span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-700">
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-slate-950 p-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        {goToPage && (
          <button
            type="button"
            onClick={() => goToPage("SocialMedia")}
            className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-bold text-slate-700"
          >
            Return to website
          </button>
        )}
      </form>
    </div>
  );
}

function ContentEditor({ item, onClose, onSaved }) {
  const [form, setForm] = useState({
    ...item,
    data: {
      ...(item.data || {}),
    },
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (requestedStatus) => {
    try {
      setSaving(true);
      setError("");

      const suggestedTitle =
        form.data.title ||
        form.data.name ||
        form.data.partner ||
        form.data.headingLineOne ||
        `${form.section}-${Date.now()}`;

      const itemKey = form.id
        ? form.itemKey
        : createSlug(suggestedTitle);

      if (!itemKey) {
        throw new Error("Please enter a title or name before saving.");
      }

      if (
        form.section !== "page" &&
        !String(
          form.data.title ||
            form.data.name ||
            form.data.partner ||
            ""
        ).trim()
      ) {
        throw new Error("Please enter a title or name.");
      }

      const requestBody = {
        section: form.section,
        itemKey,
        status: requestedStatus || form.status || "draft",
        sortOrder: Number(form.sortOrder) || 0,
        data: normaliseContentUrls(form.data),
      };

      await apiRequest(
        form.id
          ? `/api/admin/content/${form.id}`
          : "/api/admin/content",
        {
          method: form.id ? "PUT" : "POST",
          body: JSON.stringify(requestBody),
        }
      );

      await onSaved();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto my-8 w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-teal-700">
              {form.id ? "Edit content" : "Create content"}
            </p>
            <h2 className="mt-1 text-2xl font-black">
              {getItemTitle(form)}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Complete the fields below. External addresses are automatically
              saved with https:// when needed.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-5 flex gap-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="text-sm font-bold text-slate-700">
              Display order
            </span>
            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(event) =>
                setForm({
                  ...form,
                  sortOrder: Number(event.target.value),
                })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-500"
            />
            <span className="mt-1 block text-xs text-slate-500">
              Lower numbers appear first.
            </span>
          </label>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-700">
              Current status
            </p>
            <div className="mt-2">
              <StatusBadge status={form.status || "draft"} />
            </div>
            {form.id && (
              <p className="mt-2 text-xs text-slate-500">
                Internal key: {form.itemKey}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 p-5">
          <h3 className="text-lg font-black text-slate-950">
            Content details
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            These fields control what appears on the Social Media page.
          </p>

          <div className="mt-5">
            <SectionForm
              section={form.section}
              value={form.data}
              onChange={(data) =>
                setForm({
                  ...form,
                  data,
                })
              }
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => save("draft")}
            disabled={saving}
            className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 font-black text-amber-800 disabled:opacity-50"
          >
            Save draft
          </button>

          {form.id && (
            <button
              type="button"
              onClick={() => save("archived")}
              disabled={saving}
              className="rounded-xl border border-slate-300 px-5 py-3 font-black text-slate-700 disabled:opacity-50"
            >
              Archive
            </button>
          )}

          <button
            type="button"
            onClick={() => save("published")}
            disabled={saving}
            className="inline-flex items-center rounded-xl bg-teal-600 px-5 py-3 font-black text-white transition hover:bg-teal-700 disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    published: "bg-emerald-50 text-emerald-700",
    draft: "bg-amber-50 text-amber-700",
    archived: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
        styles[status] || styles.draft
      }`}
    >
      {status}
    </span>
  );
}

function StatusMessage({ type, message, onClose }) {
  const success = type === "success";

  return (
    <div
      className={`mb-5 flex items-start justify-between gap-3 rounded-xl border p-4 ${
        success
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      <div className="flex gap-2 text-sm font-bold">
        {success ? (
          <CheckCircle2 className="h-5 w-5 shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 shrink-0" />
        )}
        {message}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss message"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
