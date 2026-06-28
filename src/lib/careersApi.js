async function request(
  path,
  options = {}
) {
  const headers = new Headers(
    options.headers || {}
  );

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  const response = await fetch(
    path,
    {
      ...options,
      headers,
      credentials: "include",
    }
  );

  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  const data =
    contentType.includes(
      "application/json"
    )
      ? await response.json()
      : {
          message:
            await response.text(),
        };

  if (!response.ok) {
    throw new Error(
      data.message ||
        `Request failed with status ${response.status}.`
    );
  }

  return data;
}

export const careersApi = {
  getPublishedJobs() {
    return request("/api/jobs");
  },

  login(email, password) {
    return request(
      "/api/admin/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      }
    );
  },

  logout() {
    return request(
      "/api/admin/logout",
      {
        method: "POST",
      }
    );
  },

  getAdminSession() {
    return request(
      "/api/admin/session"
    );
  },

  getAdminJobs() {
    return request(
      "/api/jobs/admin"
    );
  },

  createJob(job) {
    return request(
      "/api/jobs",
      {
        method: "POST",
        body: JSON.stringify(job),
      }
    );
  },

  updateJob(id, job) {
    return request(
      `/api/jobs/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(job),
      }
    );
  },

  deleteJob(id) {
    return request(
      `/api/jobs/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};