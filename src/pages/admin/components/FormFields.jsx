export function TextField({
  label,
  value = "",
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  helpText = "",
  disabled = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-500 disabled:bg-slate-100"
      />

      {helpText && (
        <span className="mt-1 block text-xs text-slate-500">
          {helpText}
        </span>
      )}
    </label>
  );
}

export function TextAreaField({
  label,
  value = "",
  onChange,
  required = false,
  placeholder = "",
  helpText = "",
  maxLength,
  rows = 5,
}) {
  const length =
    String(value || "").length;

  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </span>

      <textarea
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-500"
      />

      <span className="mt-1 flex justify-between gap-3 text-xs text-slate-500">
        <span>{helpText}</span>

        {maxLength && (
          <span>
            {length}/{maxLength}
          </span>
        )}
      </span>
    </label>
  );
}

export function SelectField({
  label,
  value = "",
  onChange,
  options = [],
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </span>

      <select
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function NumberField({
  label,
  value = 0,
  onChange,
  min = 0,
  max,
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        type="number"
        min={min}
        max={max}
        value={Number(value || 0)}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-500"
      />
    </label>
  );
}

export function CheckboxField({
  label,
  checked = false,
  onChange,
  helpText = "",
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(event) =>
          onChange(
            event.target.checked
          )
        }
        className="mt-1 h-4 w-4 rounded border-slate-300"
      />

      <span>
        <span className="block text-sm font-bold text-slate-700">
          {label}
        </span>

        {helpText && (
          <span className="mt-1 block text-xs text-slate-500">
            {helpText}
          </span>
        )}
      </span>
    </label>
  );
}

export function TagsField({
  label,
  value = [],
  onChange,
}) {
  const tagText =
    Array.isArray(value)
      ? value.join(", ")
      : "";

  return (
    <TextField
      label={label}
      value={tagText}
      onChange={(nextValue) => {
        const tags = nextValue
          .split(",")
          .map((tag) =>
            tag.trim()
          )
          .filter(Boolean);

        onChange(tags);
      }}
      placeholder="#NetZero, #SmartBuildings"
      helpText="Separate each hashtag with a comma."
    />
  );
}