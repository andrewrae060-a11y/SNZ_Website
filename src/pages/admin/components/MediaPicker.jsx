import {
  Image,
  Link,
  Upload,
  Video,
  X,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import {
  SelectField,
  TextField,
} from "./FormFields";

const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_CMS_API_URL ||
    ""
).replace(/\/+$/, "");

async function uploadMediaDirectly(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE}/api/admin/media/upload`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  let result = null;

  const contentType =
    response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    result = await response.json();
  } else {
    result = {
      message: await response.text(),
    };
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        "The media upload failed."
    );
  }

  const asset = result?.asset;

  if (!asset?.url) {
    throw new Error(
      "The upload completed, but the server did not return a media URL."
    );
  }

  return asset;
}

export default function MediaPicker({
  label,
  value = {},
  onChange,
  onUploadMedia,
  imagesOnly = false,
}) {
  const inputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const mediaType =
    value.mediaType ||
    (value.videoUrl
      ? "video"
      : "image");

  const mediaUrl =
    mediaType === "video"
      ? value.videoUrl || ""
      : value.image || "";

  const updateMediaUrl = (
    nextUrl
  ) => {
    if (mediaType === "video") {
      onChange({
        ...value,
        videoUrl: nextUrl,
        video: Boolean(nextUrl),
        mediaType: "video",
      });

      return;
    }

    onChange({
      ...value,
      image: nextUrl,
      mediaType: "image",
      video: false,
    });
  };

  const changeMediaType = (
    nextType
  ) => {
    onChange({
      ...value,
      mediaType: nextType,
      video:
        nextType === "video",
    });
  };

  const uploadFile = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      setError("");

      const isVideo =
        file.type.startsWith(
          "video/"
        );

      if (
        imagesOnly &&
        isVideo
      ) {
        throw new Error(
          "Only image files can be used for this field."
        );
      }

      const asset =
        typeof onUploadMedia === "function"
          ? await onUploadMedia(file)
          : await uploadMediaDirectly(file);

      const uploadedIsVideo =
        asset.mimeType?.startsWith(
          "video/"
        ) || isVideo;

      const nextMediaType =
        uploadedIsVideo && !imagesOnly
          ? "video"
          : "image";

      onChange({
        ...value,
        mediaId:
          asset.id ||
          asset.storageKey ||
          null,
        image:
          nextMediaType === "image"
            ? asset.url
            : value.image || "",
        videoUrl:
          nextMediaType === "video"
            ? asset.url
            : "",
        mediaType:
          nextMediaType,
        video:
          nextMediaType === "video",
        imageAlt:
          asset.altText ||
          value.imageAlt ||
          "",
      });
    } catch (uploadError) {
      setError(
        uploadError.message ||
          "The file could not be uploaded."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }
    }
  };

  const removeMedia = () => {
    onChange({
      ...value,
      mediaId: null,
      image: "",
      videoUrl: "",
      mediaType: "image",
      video: false,
      imageAlt: "",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-800">
            {label}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upload a file or provide an existing URL.
          </p>
        </div>

        {mediaUrl && (
          <button
            type="button"
            onClick={removeMedia}
            className="inline-flex items-center text-sm font-bold text-red-700"
          >
            <X className="mr-1 h-4 w-4" />
            Remove
          </button>
        )}
      </div>

      {!imagesOnly && (
        <div className="mt-4">
          <SelectField
            label="Media type"
            value={mediaType}
            onChange={
              changeMediaType
            }
            options={[
              {
                value: "image",
                label: "Image",
              },
              {
                value: "video",
                label: "Video",
              },
            ]}
          />
        </div>
      )}

      <div className="mt-4">
        <TextField
          label={
            mediaType === "video"
              ? "Video URL"
              : "Image URL"
          }
          type="url"
          value={mediaUrl}
          onChange={
            updateMediaUrl
          }
          placeholder="https://..."
          helpText="You can use an existing hosted-media URL instead of uploading."
        />
      </div>

      <div className="mt-4">
        <input
          ref={inputRef}
          type="file"
          accept={
            imagesOnly
              ? "image/jpeg,image/png,image/webp,image/gif"
              : "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
          }
          onChange={uploadFile}
          className="hidden"
        />

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
          className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:opacity-50"
        >
          <Upload className="mr-2 h-4 w-4" />

          {uploading
            ? "Uploading…"
            : "Upload from computer"}
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">
          {error}
        </p>
      )}

      {mediaUrl && (
        <div className="mt-5 max-w-full overflow-hidden rounded-2xl border border-slate-200">
          {mediaType ===
          "video" ? (
            <video
              src={mediaUrl}
              controls
              className="h-64 w-full bg-black object-contain"
            />
          ) : (
            <img
              src={mediaUrl}
              alt={
                value.imageAlt ||
                ""
              }
              className="h-64 w-full object-cover"
            />
          )}

        <div className="flex items-start gap-2 p-3 text-sm text-slate-600">
            {mediaType === "video" ? (
              <Video className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <Image className="mt-0.5 h-4 w-4 shrink-0" />
            )}

            <span className="min-w-0 flex-1 break-all leading-5">
              {mediaUrl}
            </span>

            <Link className="mt-0.5 h-4 w-4 shrink-0" />
          </div>
        </div>
      )}

      {mediaType === "image" && (
        <div className="mt-4">
          <TextField
            label="Image alternative text"
            value={
              value.imageAlt ||
              ""
            }
            onChange={(imageAlt) =>
              onChange({
                ...value,
                imageAlt,
              })
            }
            helpText="Describe the image for screen-reader users. Leave blank only when the image is decorative."
          />
        </div>
      )}
    </div>
  );
}