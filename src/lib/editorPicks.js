export const EDITOR_PICK_SLUG_MAX_LENGTH = 20;

const SLUG_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "in",
  "is",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

function slugWords(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .filter(Boolean);
}

function fitWords(words) {
  const selected = [];

  for (const word of words) {
    const candidate = [...selected, word].join("-");

    if (candidate.length > EDITOR_PICK_SLUG_MAX_LENGTH) {
      if (selected.length === 0) {
        return word.slice(0, EDITOR_PICK_SLUG_MAX_LENGTH);
      }

      break;
    }

    selected.push(word);
  }

  return selected.join("-");
}

export function normalizeEditorPickSlug(value) {
  return fitWords(slugWords(value));
}

export function createEditorPickSlug(title) {
  const words = slugWords(title);
  const conciseWords = words.filter(
    (word) => !SLUG_STOP_WORDS.has(word)
  );

  return (
    fitWords(conciseWords.length ? conciseWords : words) ||
    "editors-pick"
  );
}

export function getEditorPickSlug(item) {
  return (
    normalizeEditorPickSlug(item?.pageSlug || item?.slug) ||
    createEditorPickSlug(item?.title)
  );
}

export function getEditorPickPath(item) {
  return `/content-hub/${getEditorPickSlug(item)}`;
}

export function ensureEditorPickPageSlug(data = {}) {
  return {
    ...data,
    pageSlug:
      normalizeEditorPickSlug(data.pageSlug || data.slug) ||
      createEditorPickSlug(data.title),
  };
}
