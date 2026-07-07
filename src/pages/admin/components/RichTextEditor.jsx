import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link,
  List,
  ListOrdered,
  Palette,
  Pilcrow,
  Type,
} from "lucide-react";

export default function RichTextEditor({
  label,
  value = "",
  onChange,
  helpText,
}) {
  const editorRef = useRef(null);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (
      editorRef.current &&
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const emitChange = () => {
    onChange?.(editorRef.current?.innerHTML || "");
  };

  const runCommand = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const applyBlock = (tagName) => {
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, tagName);
    emitChange();
  };

  const applyTextColour = (colour) => {
    runCommand("foreColor", colour);
  };

  const applyFontSize = (size) => {
    editorRef.current?.focus();

    document.execCommand("fontSize", false, size);
    emitChange();
  };

  const addLink = () => {
    const url = linkUrl.trim();

    if (!url) return;

    const normalisedUrl =
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("mailto:")
        ? url
        : `https://${url}`;

    runCommand("createLink", normalisedUrl);
    setLinkUrl("");
  };

  const clearFormatting = () => {
    editorRef.current?.focus();
    document.execCommand("removeFormat", false, null);
    document.execCommand("formatBlock", false, "p");
    emitChange();
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-bold text-slate-700">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
          <ToolbarButton
            title="Paragraph"
            onClick={() => applyBlock("p")}
          >
            <Pilcrow className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            title="Heading 1"
            onClick={() => applyBlock("h2")}
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            title="Heading 2"
            onClick={() => applyBlock("h3")}
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Bold"
            onClick={() => runCommand("bold")}
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            title="Italic"
            onClick={() => runCommand("italic")}
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Bullet list"
            onClick={() => runCommand("insertUnorderedList")}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            title="Numbered list"
            onClick={() => runCommand("insertOrderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Normal text size"
            onClick={() => applyFontSize("3")}
          >
            <Type className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            title="Large text"
            onClick={() => applyFontSize("5")}
          >
            <span className="text-xs font-black">A+</span>
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Teal text"
            onClick={() => applyTextColour("#0f766e")}
          >
            <Palette className="h-4 w-4 text-teal-700" />
          </ToolbarButton>

          <ToolbarButton
            title="Violet text"
            onClick={() => applyTextColour("#6d28d9")}
          >
            <Palette className="h-4 w-4 text-violet-700" />
          </ToolbarButton>

          <ToolbarButton
            title="Slate text"
            onClick={() => applyTextColour("#0f172a")}
          >
            <Palette className="h-4 w-4 text-slate-900" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Clear formatting"
            onClick={clearFormatting}
          >
            <span className="text-xs font-black">Tx</span>
          </ToolbarButton>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white p-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            placeholder="Paste link URL"
            className="min-w-[220px] flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
          />

          <button
            type="button"
            onClick={addLink}
            className="inline-flex items-center rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white"
          >
            <Link className="mr-2 h-4 w-4" />
            Add link
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={emitChange}
          onBlur={emitChange}
          className="rich-text-editor min-h-[240px] max-w-none overflow-y-auto p-5 text-base leading-7 text-slate-700 outline-none"
        />
      </div>

      {helpText && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {helpText}
        </p>
      )}
    </div>
  );
}

function ToolbarButton({ title, onClick, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-9 w-px bg-slate-200" />;
}