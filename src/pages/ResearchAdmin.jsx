import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  LogIn,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
  UserRoundX,
  Users,
  X,
  XCircle,
} from "lucide-react";

const STATUS_OPTIONS = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
  {
    value: "REVOKED",
    label: "Revoked",
  },
  {
    value: "EXPIRED",
    label: "Expired",
  },
];

async function readJsonResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }

  try {
    const text = await response.text();

    return {
      message:
        text ||
        `Unexpected server response (${response.status}).`,
    };
  } catch {
    return {
      message: `Unexpected server response (${response.status}).`,
    };
  }
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusClasses(status) {
  switch (status) {
    case "APPROVED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "REJECTED":
      return "border-rose-200 bg-rose-50 text-rose-700";

    case "REVOKED":
      return "border-slate-300 bg-slate-100 text-slate-700";

    case "EXPIRED":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-blue-200 bg-blue-50 text-blue-700";
  }
}

function LoginPanel({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setStatus("submitting");

    try {
      await onLogin({
        email: form.email.trim(),
        password: form.password,
      });

      setForm({
        email: "",
        password: "",
      });
    } catch (loginError) {
      setError(
        loginError?.message ||
          "The administrator login was unsuccessful."
      );
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.22em] text-teal-300">
            Smart Net Zero
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Research administrator
          </h1>

          <p className="mt-3 leading-7 text-white/65">
            Sign in to review and manage research-library
            access applications.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-bold text-white/80"
              >
                Administrator email
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20"
                placeholder="research@smartnetzero.co.uk"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-bold text-white/80"
              >
                Password
              </label>

              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={12}
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20"
                placeholder="Enter your administrator password"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 font-black text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Signing in
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function PinModal({ approval, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!approval) {
    return null;
  }

  const handleCopy = async () => {
    if (
      !approval.pin ||
      !navigator.clipboard?.writeText
    ) {
      setCopied(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(approval.pin);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-5 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-modal-title"
        className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close PIN window"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2
          id="pin-modal-title"
          className="mt-6 text-2xl font-black text-slate-950"
        >
          Access approved
        </h2>

        <p className="mt-2 leading-7 text-slate-600">
          A new PIN has been generated for:
        </p>

        <p className="mt-3 font-bold text-slate-950">
          {approval.email}
        </p>

        {approval.pin ? (
          <>
            <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
                Development PIN
              </p>

              <p className="mt-3 font-mono text-3xl font-black tracking-[0.18em] text-slate-950">
                {approval.pin}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-black text-white hover:bg-slate-800"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  PIN copied
                </>
              ) : (
                <>
                  <Clipboard className="h-5 w-5" />
                  Copy PIN
                </>
              )}
            </button>

            <p className="mt-4 text-sm leading-6 text-amber-700">
              This plain PIN is displayed only during
              development. Copy it now. The database stores only
              its secure hash.
            </p>
          </>
        ) : (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
            The application was approved, but no plain PIN was
            returned. In production, the PIN should be delivered
            through the email-notification service.
          </div>
        )}
      </section>
    </div>
  );
}

function ConfirmationModal({
  action,
  request,
  busy,
  onConfirm,
  onCancel,
}) {
  if (!action || !request) {
    return null;
  }

  const isApproval = action === "approve";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            isApproval
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {isApproval ? (
            <UserCheck className="h-7 w-7" />
          ) : (
            <UserRoundX className="h-7 w-7" />
          )}
        </div>

        <h2
          id="confirmation-modal-title"
          className="mt-6 text-2xl font-black text-slate-950"
        >
          {isApproval
            ? "Approve this application?"
            : "Reject this application?"}
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          {isApproval
            ? "Approval will generate a new 10-digit research-library PIN."
            : "The applicant will no longer appear in the pending list."}
        </p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-5">
          <p className="font-black text-slate-950">
            {request.fullName}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {request.email}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {request.organisation ||
              "No organisation supplied"}
          </p>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={busy}
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={onConfirm}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-60 ${
              isApproval
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-rose-600 hover:bg-rose-500"
            }`}
          >
            {busy ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Processing
              </>
            ) : isApproval ? (
              <>
                <Check className="h-5 w-5" />
                Approve
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" />
                Reject
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

function RequestCard({
  request,
  onApprove,
  onReject,
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-black text-slate-950">
              {request.fullName}
            </h3>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-black ${statusClasses(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <p className="font-bold text-slate-800">
                Email
              </p>

              <p className="mt-1 break-all">
                {request.email}
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-800">
                Organisation
              </p>

              <p className="mt-1">
                {request.organisation || "Not supplied"}
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-800">
                Role
              </p>

              <p className="mt-1">
                {request.role || "Not supplied"}
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-800">
                Requested
              </p>

              <p className="mt-1">
                {formatDate(request.createdAt)}
              </p>
            </div>

            {request.approvedAt ? (
              <div>
                <p className="font-bold text-slate-800">
                  Approved
                </p>

                <p className="mt-1">
                  {formatDate(request.approvedAt)}
                </p>
              </div>
            ) : null}

            {request.rejectedAt ? (
              <div>
                <p className="font-bold text-slate-800">
                  Rejected
                </p>

                <p className="mt-1">
                  {formatDate(request.rejectedAt)}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {request.status === "PENDING" ? (
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => onApprove(request)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-black text-white hover:bg-emerald-500"
            >
              <UserCheck className="h-5 w-5" />
              Approve
            </button>

            <button
              type="button"
              onClick={() => onReject(request)}
              className="flex items-center justify-center gap-2 rounded-xl border border-rose-300 px-5 py-3 font-black text-rose-700 hover:bg-rose-50"
            >
              <UserRoundX className="h-5 w-5" />
              Reject
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ResearchAdmin() {
  useEffect(() => {
        document.title = "Research Admin | Smart Net Zero";
      }, []);

  const [sessionStatus, setSessionStatus] =
    useState("checking");

  const [admin, setAdmin] = useState(null);

  const [selectedStatus, setSelectedStatus] =
    useState("PENDING");

  const [requests, setRequests] = useState([]);

  const [requestStatus, setRequestStatus] =
    useState("idle");

  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [confirmation, setConfirmation] =
    useState(null);

  const [approvalResult, setApprovalResult] =
    useState(null);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/admin/session",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      const result = await readJsonResponse(response);

      if (
        response.ok &&
        result.authenticated === true
      ) {
        setAdmin(result.admin || null);
        setSessionStatus("authenticated");
        return true;
      }

      setAdmin(null);
      setRequests([]);
      setSessionStatus("unauthenticated");
      return false;
    } catch (sessionError) {
      console.error(
        "Administrator session check failed:",
        sessionError
      );

      setAdmin(null);
      setRequests([]);
      setSessionStatus("unauthenticated");
      return false;
    }
  }, []);

  const loadRequests = useCallback(
    async (status) => {
      const requestedStatus =
        status || selectedStatus;

      setRequestStatus("loading");
      setError("");

      try {
        const response = await fetch(
          `/api/admin/research-access?status=${encodeURIComponent(
            requestedStatus
          )}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
            },
          }
        );

        const result =
          await readJsonResponse(response);

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          setAdmin(null);
          setRequests([]);
          setRequestStatus("idle");
          setSessionStatus("unauthenticated");
          return;
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "The access requests could not be loaded."
          );
        }

        setRequests(
          Array.isArray(result.requests)
            ? result.requests
            : []
        );

        setRequestStatus("loaded");
      } catch (loadError) {
        console.error(
          "Research access request loading failed:",
          loadError
        );

        setRequests([]);
        setRequestStatus("error");

        setError(
          loadError?.message ||
            "The access requests could not be loaded."
        );
      }
    },
    [selectedStatus]
  );

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      loadRequests(selectedStatus);
    }
  }, [
    sessionStatus,
    selectedStatus,
    loadRequests,
  ]);

  const handleLogin = async ({
    email,
    password,
  }) => {
    setError("");
    setMessage("");

    const response = await fetch(
      "/api/admin/login",
      {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      }
    );

    const result =
      await readJsonResponse(response);

    if (
      !response.ok ||
      result.authenticated !== true
    ) {
      throw new Error(
        result.message ||
          "The administrator login was unsuccessful."
      );
    }

    /*
     * The backend has now set the administrator cookie.
     * Re-check the session immediately so the dashboard
     * appears without requiring a browser refresh.
     */
    setSessionStatus("checking");

    const authenticated = await checkSession();

    if (!authenticated) {
      throw new Error(
        "Login succeeded, but the administrator session could not be confirmed. Check the backend cookie configuration."
      );
    }

    setMessage(
      "Administrator login successful."
    );

    setError("");
  };

  const handleLogout = async () => {
    setError("");

    try {
      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!response.ok) {
        const result =
          await readJsonResponse(response);

        console.warn(
          result.message ||
            "The server did not confirm logout."
        );
      }
    } catch (logoutError) {
      console.error(
        "Administrator logout failed:",
        logoutError
      );
    } finally {
      setAdmin(null);
      setRequests([]);
      setRequestStatus("idle");
      setSessionStatus("unauthenticated");
      setMessage("");
      setError("");
      setConfirmation(null);
      setApprovalResult(null);
      setSearchTerm("");
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setSearchTerm("");
    setMessage("");
    setError("");
  };

  const handleApprove = (request) => {
    setConfirmation({
      action: "approve",
      request,
      busy: false,
    });
  };

  const handleReject = (request) => {
    setConfirmation({
      action: "reject",
      request,
      busy: false,
    });
  };

  const performAction = async () => {
    if (!confirmation) {
      return;
    }

    const { action, request } =
      confirmation;

    setConfirmation((current) => ({
      ...current,
      busy: true,
    }));

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/research-access/${encodeURIComponent(
          request.id
        )}/${encodeURIComponent(action)}`,
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({}),
        }
      );

      const result =
        await readJsonResponse(response);

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        setConfirmation(null);
        setAdmin(null);
        setRequests([]);
        setRequestStatus("idle");
        setSessionStatus("unauthenticated");

        throw new Error(
          result.message ||
            "Your administrator session has expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `The application could not be ${action}d.`
        );
      }

      setConfirmation(null);

      if (action === "approve") {
        setApprovalResult({
          email:
            result.user?.email ||
            request.email,
          pin:
            result.developmentPin ||
            result.pin ||
            "",
        });

        setMessage(
          `${request.fullName} has been approved.`
        );
      } else {
        setMessage(
          `${request.fullName} has been rejected.`
        );
      }

      await loadRequests(selectedStatus);
    } catch (actionError) {
      console.error(
        "Research access update failed:",
        actionError
      );

      setConfirmation((current) =>
        current
          ? {
              ...current,
              busy: false,
            }
          : null
      );

      setError(
        actionError?.message ||
          "The application could not be updated."
      );
    }
  };

  const filteredRequests = useMemo(() => {
    const searchValue = searchTerm
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return requests;
    }

    return requests.filter((request) => {
      const searchableText = [
        request.fullName,
        request.email,
        request.organisation,
        request.role,
        request.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        searchValue
      );
    });
  }, [requests, searchTerm]);

  if (sessionStatus === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <RefreshCw className="mx-auto h-9 w-9 animate-spin text-teal-300" />

          <p className="mt-4 font-bold">
            Checking administrator session
          </p>
        </div>
      </main>
    );
  }

  if (
    sessionStatus !== "authenticated"
  ) {
    return (
      <LoginPanel onLogin={handleLogin} />
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-white/10 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">
                  Smart Net Zero
                </p>

                <h1 className="text-2xl font-black">
                  Research access administration
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-white/60">
              Signed in as{" "}
              {admin?.email ||
                "administrator"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-bold text-white hover:bg-white/10"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Current view
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {selectedStatus}
                </p>
              </div>

              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Records shown
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  {filteredRequests.length}
                </p>
              </div>

              <Search className="h-8 w-8 text-teal-600" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Session
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-700">
                  Active
                </p>
              </div>

              <ShieldCheck className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm lg:p-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Research-library applications
                </h2>

                <p className="mt-2 text-slate-600">
                  Review and manage applicant
                  access status.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  loadRequests(selectedStatus)
                }
                disabled={
                  requestStatus === "loading"
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-5 w-5 ${
                    requestStatus === "loading"
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(
                (option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        option.value
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm font-black transition ${
                      selectedStatus ===
                      option.value
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {option.label}
                  </button>
                )
              )}
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                placeholder="Search by name, email, organisation or role"
              />
            </div>
          </div>

          {message ? (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{message}</p>
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          <div className="mt-7">
            {requestStatus === "loading" ? (
              <div className="flex min-h-52 items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-teal-600" />

                  <p className="mt-3 font-bold text-slate-600">
                    Loading applications
                  </p>
                </div>
              </div>
            ) : filteredRequests.length ===
              0 ? (
              <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7">
                <div className="text-center">
                  <Clock3 className="mx-auto h-9 w-9 text-slate-400" />

                  <p className="mt-4 font-black text-slate-800">
                    No{" "}
                    {selectedStatus.toLowerCase()}{" "}
                    applications
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    New or matching records will
                    appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map(
                  (request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onApprove={
                        handleApprove
                      }
                      onReject={handleReject}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      <ConfirmationModal
        action={confirmation?.action}
        request={confirmation?.request}
        busy={confirmation?.busy}
        onConfirm={performAction}
        onCancel={() =>
          setConfirmation(null)
        }
      />

      <PinModal
        approval={approvalResult}
        onClose={() =>
          setApprovalResult(null)
        }
      />
    </main>
  );
}