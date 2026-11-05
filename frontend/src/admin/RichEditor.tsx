import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extensions";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { uploadImage } from "./upload";
import { inputClass, useFail } from "./ui";

/**
 * WordPress-style visual editor for blog articles. Stores HTML.
 * Toolbar: block type, bold/italic/underline/strike, lists, quote, alignment, links, images (with alt text),
 * divider, clear formatting, undo/redo, and a "Code" view to edit the raw HTML.
 */
export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [mode, setMode] = useState<"visual" | "code">("visual");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https", HTMLAttributes: { target: null, rel: null } },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your article… Use the toolbar above for headings, lists, links and images." }),
    ],
    content: value,
    editorProps: { attributes: { class: "post-body min-h-[480px] px-5 py-4 focus:outline-none" } },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-bx-line-strong bg-white">
      <div className="flex items-center justify-between border-b border-bx-line bg-bx-surface px-2 pt-2 text-xs font-semibold">
        <div className="flex">
          {(["visual", "code"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                if (m === "visual" && mode === "code") editor.commands.setContent(value, { emitUpdate: false });
                setMode(m);
              }}
              className={cn("rounded-t-md border border-b-0 px-3 py-1.5", mode === m ? "border-bx-line bg-white text-bx-ink" : "border-transparent text-bx-slate")}
            >
              {m === "visual" ? "Visual" : "Code (HTML)"}
            </button>
          ))}
        </div>
        <WordCount editor={editor} />
      </div>

      {mode === "visual" ? (
        <>
          <Toolbar editor={editor} />
          <ImageBar editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <textarea
          className="block min-h-[520px] w-full resize-y px-5 py-4 font-mono text-[12.5px] leading-relaxed text-bx-ink focus:outline-none"
          value={value}
          spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function WordCount({ editor }: { editor: Editor }) {
  const words = useEditorState({
    editor,
    selector: ({ editor: e }) => e.state.doc.textContent.split(/\s+/).filter(Boolean).length,
  });
  return <span className="pb-1.5 pr-2 font-normal text-bx-slate">{words} words</span>;
}

function Toolbar({ editor }: { editor: Editor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      block: e.isActive("heading", { level: 2 }) ? "h2" : e.isActive("heading", { level: 3 }) ? "h3" : e.isActive("heading", { level: 4 }) ? "h4" : "p",
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      left: e.isActive({ textAlign: "left" }),
      center: e.isActive({ textAlign: "center" }),
      right: e.isActive({ textAlign: "right" }),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });
  const chain = () => editor.chain().focus();

  const setLink = () => {
    const prev = (editor.getAttributes("link").href as string | undefined) ?? "";
    const input = window.prompt("Link address (https://… for other sites, or /insights/… for a page on this site). Leave empty to remove the link.", prev);
    if (input === null) return;
    const url = input.trim();
    if (!url) return void chain().extendMarkRange("link").unsetLink().run();
    const href = /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}`;
    if (editor.state.selection.empty && !s.link) {
      // Nothing selected: insert the address itself as the link text
      chain().insertContent({ type: "text", text: url, marks: [{ type: "link", attrs: { href } }] }).run();
    } else {
      chain().extendMarkRange("link").setLink({ href }).run();
    }
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-bx-line bg-white px-2 py-1.5">
      <select
        aria-label="Text style"
        className="mr-1 h-8 rounded-md border border-bx-line-strong bg-white px-2 text-sm"
        value={s.block}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") chain().setParagraph().run();
          else chain().setHeading({ level: Number(v.slice(1)) as 2 | 3 | 4 }).run();
        }}
      >
        <option value="p">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>
      <Sep />
      <Tool icon={Bold} label="Bold (Ctrl+B)" active={s.bold} onClick={() => chain().toggleBold().run()} />
      <Tool icon={Italic} label="Italic (Ctrl+I)" active={s.italic} onClick={() => chain().toggleItalic().run()} />
      <Tool icon={UnderlineIcon} label="Underline (Ctrl+U)" active={s.underline} onClick={() => chain().toggleUnderline().run()} />
      <Tool icon={Strikethrough} label="Strikethrough" active={s.strike} onClick={() => chain().toggleStrike().run()} />
      <Sep />
      <Tool icon={List} label="Bulleted list" active={s.bullet} onClick={() => chain().toggleBulletList().run()} />
      <Tool icon={ListOrdered} label="Numbered list" active={s.ordered} onClick={() => chain().toggleOrderedList().run()} />
      <Tool icon={Quote} label="Quote" active={s.quote} onClick={() => chain().toggleBlockquote().run()} />
      <Sep />
      <Tool icon={AlignLeft} label="Align left" active={s.left} onClick={() => chain().setTextAlign("left").run()} />
      <Tool icon={AlignCenter} label="Align centre" active={s.center} onClick={() => chain().setTextAlign("center").run()} />
      <Tool icon={AlignRight} label="Align right" active={s.right} onClick={() => chain().setTextAlign("right").run()} />
      <Sep />
      <Tool icon={LinkIcon} label="Insert / edit link (Ctrl+K)" active={s.link} onClick={setLink} />
      {s.link && <Tool icon={Unlink} label="Remove link" onClick={() => chain().extendMarkRange("link").unsetLink().run()} />}
      <ImageTool editor={editor} />
      <Tool icon={Minus} label="Divider line" onClick={() => chain().setHorizontalRule().run()} />
      <Tool icon={RemoveFormatting} label="Clear formatting" onClick={() => chain().unsetAllMarks().clearNodes().run()} />
      <Sep />
      <Tool icon={Undo2} label="Undo (Ctrl+Z)" disabled={!s.canUndo} onClick={() => chain().undo().run()} />
      <Tool icon={Redo2} label="Redo (Ctrl+Y)" disabled={!s.canRedo} onClick={() => chain().redo().run()} />
    </div>
  );
}

function ImageTool({ editor }: { editor: Editor }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const fail = useFail();
  return (
    <>
      <Tool icon={ImagePlus} label={busy ? "Uploading…" : "Add image"} disabled={busy} onClick={() => ref.current?.click()}>
        {busy && <span className="ml-1 text-xs">Uploading…</span>}
      </Tool>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setBusy(true);
          try {
            const src = await uploadImage("posts", file, 1600);
            const alt = window.prompt("Describe this image in a few words (alt text, used by Google and screen readers):", "") ?? "";
            editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
          } catch (err) {
            fail(err as Error, "Image upload");
          } finally {
            setBusy(false);
          }
        }}
      />
    </>
  );
}

/** Shown while an image is selected: edit its alt text, or remove it. */
function ImageBar({ editor }: { editor: Editor }) {
  const img = useEditorState({
    editor,
    selector: ({ editor: e }) => (e.isActive("image") ? { alt: (e.getAttributes("image").alt as string | undefined) ?? "" } : null),
  });
  if (!img) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-bx-line bg-bx-orange/10 px-3 py-2 text-sm">
      <span className="font-semibold">Image alt text</span>
      <input
        className={cn(inputClass, "h-8 max-w-md flex-1 py-1")}
        placeholder="Describe the image for Google and screen readers"
        value={img.alt}
        onChange={(e) => editor.chain().updateAttributes("image", { alt: e.target.value }).run()}
      />
      <button type="button" className="rounded-md px-2 py-1 font-semibold text-red-600 hover:bg-red-50" onClick={() => editor.chain().focus().deleteSelection().run()}>
        Remove image
      </button>
    </div>
  );
}

function Tool({
  icon: I,
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep the editor's selection
      onClick={onClick}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-bx-ink-soft transition-colors hover:bg-bx-surface disabled:opacity-35",
        active && "bg-bx-navy-900 text-white hover:bg-bx-navy-900",
      )}
    >
      <I size={16} strokeWidth={2.2} />
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px bg-bx-line" aria-hidden />;
