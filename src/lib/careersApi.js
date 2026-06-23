const TOKEN_STORAGE_KEY = "snz-careers-admin-token";

export const adminToken = {
  get() {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  },

  set(token) {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  clear() {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};

async function request(
  path,
  options = {},
  requiresAuthentication = false
) {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (requiresAuthentication) {
    const token = adminToken.get();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || "The request failed."
    );
  }

  return data;
}

export const careersApi = {
  getPublishedJobs() {
    return request("/api/jobs");
  },

  login(email, password) {
    return request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },

  getAdminJobs() {
    return request(
      "/api/jobs/admin",
      {},
      true
    );
  },

  createJob(job) {
    return request(
      "/api/jobs",
      {
        method: "POST",
        body: JSON.stringify(job),
      },
      true
    );
  },

  updateJob(id, job) {
    return request(
      `/api/jobs/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(job),
      },
      true
    );
  },

  deleteJob(id) {
    return request(
      `/api/jobs/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },
};