import { z } from "zod";

const textListSchema = z
  .array(z.string().trim().min(1).max(500))
  .default([]);

export const jobSchema = z.object({
  title: z.string().trim().min(2).max(120),

  department: z.string().trim().min(2).max(100),

  location: z.string().trim().min(2).max(120),

  type: z.string().trim().min(2).max(80),

  status: z.string().trim().min(2).max(40).default("Open"),

  icon: z
    .enum(["leaf", "shield", "building", "search", "briefcase"])
    .default("briefcase"),

  summary: z.string().trim().min(10).max(800),

  salary: z.string().trim().max(150).optional().default(""),

  roleIncludes: textListSchema,

  skillsNeeded: textListSchema,

  benefits: textListSchema,

  published: z.boolean().default(false),

  sortOrder: z.coerce.number().int().min(0).max(9999).default(100),
});