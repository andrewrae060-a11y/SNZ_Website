import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const JOBS_FILE =
  process.env.JOBS_FILE ||
  path.resolve(
    process.cwd(),
    "server",
    "data",
    "jobs.json"
  );

async function ensureStore() {
  await fs.mkdir(path.dirname(JOBS_FILE), {
    recursive: true,
  });

  try {
    await fs.access(JOBS_FILE);
  } catch {
    await fs.writeFile(
      JOBS_FILE,
      "[]\n",
      "utf8"
    );
  }
}

export async function readJobs({
  includeDrafts = false,
} = {}) {
  await ensureStore();

  const raw = await fs.readFile(
    JOBS_FILE,
    "utf8"
  );

  let jobs;

  try {
    jobs = JSON.parse(raw || "[]");
  } catch {
    throw new Error(
      `The jobs data file contains invalid JSON: ${JOBS_FILE}`
    );
  }

  if (!Array.isArray(jobs)) {
    throw new Error(
      `The jobs data file must contain a JSON array: ${JOBS_FILE}`
    );
  }

  const filtered = includeDrafts
    ? jobs
    : jobs.filter(
        (job) => job.published === true
      );

  return filtered.sort(
    (a, b) =>
      (a.sortOrder ?? 999) -
      (b.sortOrder ?? 999)
  );
}

async function writeJobs(jobs) {
  await ensureStore();

  const tempFile = `${JOBS_FILE}.tmp`;

  await fs.writeFile(
    tempFile,
    `${JSON.stringify(jobs, null, 2)}\n`,
    "utf8"
  );

  await fs.rename(tempFile, JOBS_FILE);
}

export async function createJob(input) {
  const jobs = await readJobs({
    includeDrafts: true,
  });

  const now = new Date().toISOString();

  const job = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  jobs.push(job);

  await writeJobs(jobs);

  return job;
}

export async function updateJob(id, input) {
  const jobs = await readJobs({
    includeDrafts: true,
  });

  const index = jobs.findIndex(
    (job) => job.id === id
  );

  if (index === -1) {
    return null;
  }

  jobs[index] = {
    ...jobs[index],
    ...input,
    id,
    createdAt: jobs[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  await writeJobs(jobs);

  return jobs[index];
}

export async function deleteJob(id) {
  const jobs = await readJobs({
    includeDrafts: true,
  });

  const nextJobs = jobs.filter(
    (job) => job.id !== id
  );

  if (nextJobs.length === jobs.length) {
    return false;
  }

  await writeJobs(nextJobs);

  return true;
}