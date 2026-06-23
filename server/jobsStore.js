import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const JOBS_FILE =
  process.env.JOBS_FILE ||
  path.resolve(process.cwd(), "server/data/jobs.json");

async function ensureJobsFile() {
  await fs.mkdir(path.dirname(JOBS_FILE), {
    recursive: true,
  });

  try {
    await fs.access(JOBS_FILE);
  } catch {
    await fs.writeFile(JOBS_FILE, "[]\n", "utf8");
  }
}

async function writeJobs(jobs) {
  await ensureJobsFile();

  const temporaryFile = `${JOBS_FILE}.tmp`;

  await fs.writeFile(
    temporaryFile,
    `${JSON.stringify(jobs, null, 2)}\n`,
    "utf8"
  );

  await fs.rename(temporaryFile, JOBS_FILE);
}

export async function readJobs({ includeDrafts = false } = {}) {
  await ensureJobsFile();

  const fileContents = await fs.readFile(JOBS_FILE, "utf8");
  const jobs = JSON.parse(fileContents || "[]");

  const visibleJobs = includeDrafts
    ? jobs
    : jobs.filter((job) => job.published);

  return visibleJobs.sort(
    (firstJob, secondJob) =>
      (firstJob.sortOrder ?? 999) -
      (secondJob.sortOrder ?? 999)
  );
}

export async function createJob(input) {
  const jobs = await readJobs({
    includeDrafts: true,
  });

  const now = new Date().toISOString();

  const newJob = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  jobs.push(newJob);

  await writeJobs(jobs);

  return newJob;
}

export async function updateJob(id, input) {
  const jobs = await readJobs({
    includeDrafts: true,
  });

  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return null;
  }

  jobs[jobIndex] = {
    ...jobs[jobIndex],
    ...input,
    id,
    updatedAt: new Date().toISOString(),
  };

  await writeJobs(jobs);

  return jobs[jobIndex];
}

export async function deleteJob(id) {
  const jobs = await readJobs({
    includeDrafts: true,
  });

  const remainingJobs = jobs.filter((job) => job.id !== id);

  if (remainingJobs.length === jobs.length) {
    return false;
  }

  await writeJobs(remainingJobs);

  return true;
}