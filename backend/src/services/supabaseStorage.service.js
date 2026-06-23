import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const researchBucket =
  process.env.SUPABASE_RESEARCH_BUCKET || "research-pdfs";

const signedUrlSeconds =
  Number(process.env.SIGNED_PDF_URL_SECONDS) || 300;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is missing from backend/.env.");
}

if (!serviceRoleKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY is missing from backend/.env."
  );
}

const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function createResearchDocumentSignedUrl(
  storageKey
) {
  const { data, error } = await supabaseAdmin.storage
    .from(researchBucket)
    .createSignedUrl(storageKey, signedUrlSeconds);

  if (error) {
    throw new Error(
      `Unable to create the document link: ${error.message}`
    );
  }

  if (!data?.signedUrl) {
    throw new Error(
      "Supabase did not return a signed document link."
    );
  }

  return {
    signedUrl: data.signedUrl,
    expiresInSeconds: signedUrlSeconds,
  };
}