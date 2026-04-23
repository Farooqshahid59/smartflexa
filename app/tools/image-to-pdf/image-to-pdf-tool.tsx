"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronUp, Download, Loader2, Trash2, Upload } from "lucide-react";

import {
  type BuildImagePdfOptions,
  type ImagePdfOrientation,
  type ImagePdfPageSize,
  buildPdfFromImages,
  isAcceptedImageFile,
} from "@/lib/image-to-pdf";

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

function reorderItems(items: ImageItem[], fromId: string, toId: string): ImageItem[] {
  if (fromId === toId) return items;
  const fromIdx = items.findIndex((i) => i.id === fromId);
  const toIdx = items.findIndex((i) => i.id === toId);
  if (fromIdx < 0 || toIdx < 0) return items;
  const next = [...items];
  const [moved] = next.splice(fromIdx, 1);
  next.splice(toIdx, 0, moved!);
  return next;
}

export function ImageToPdfTool() {
  const zoneId = useId();
  const fileInputId = useId();
  const pageSizeId = useId();
  const orientationId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<ImagePdfPageSize>("a4");
  const [orientation, setOrientation] = useState<ImagePdfOrientation>("portrait");
  const [dropActive, setDropActive] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsRef = useRef(items);
  itemsRef.current = items;
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
  }, []);

  const addFiles = useCallback((list: FileList | File[]) => {
    const arr = Array.from(list).filter(isAcceptedImageFile);
    if (arr.length === 0) {
      setError("Only JPG, PNG, or WebP images are supported.");
      return;
    }
    setError(null);
    setItems((prev) => {
      const added: ImageItem[] = arr.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      return [...prev, ...added];
    });
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) addFiles(files);
    e.target.value = "";
  };

  const onZoneDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDropActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const it = prev.find((p) => p.id === id);
      if (it) URL.revokeObjectURL(it.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
    setError(null);
  };

  const clearAll = () => {
    setItems((prev) => {
      prev.forEach((i) => URL.revokeObjectURL(i.previewUrl));
      return [];
    });
    setError(null);
  };

  const move = (index: number, dir: -1 | 1) => {
    setItems((prev) => {
      const next = [...prev];
      const j = index + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j]!, next[index]!];
      return next;
    });
  };

  const onCardDragStart = (e: DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const onCardDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onCardDrop = (e: DragEvent, targetId: string) => {
    e.preventDefault();
    const fromId = e.dataTransfer.getData("text/plain") || draggingId;
    setDraggingId(null);
    if (!fromId) return;
    setItems((prev) => reorderItems(prev, fromId, targetId));
  };

  const onCardDragEnd = () => setDraggingId(null);

  const opts: BuildImagePdfOptions = { pageSize, orientation };

  const handleDownload = async () => {
    if (items.length === 0) {
      setError("Add at least one image.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const blob = await buildPdfFromImages(
        items.map((i) => i.file),
        opts,
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "smartflexa-images.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not build PDF.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr,280px]">
        <div
          id={zoneId}
          role="region"
          aria-label="Image drop zone"
          onDragOver={(e) => {
            e.preventDefault();
            setDropActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDropActive(false);
          }}
          onDrop={onZoneDrop}
          className={`rounded-xl border-2 border-dashed p-6 transition ${
            dropActive
              ? "border-primary bg-primary/5"
              : "border-border bg-muted/20 hover:border-muted-foreground/40"
          }`}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <Upload className="h-10 w-10 text-muted-foreground" aria-hidden />
            <p className="text-sm font-medium text-foreground">
              Drag &amp; drop images here, or choose files
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, or WebP — multiple files at once. Processing stays in your browser.
            </p>
            <input
              ref={inputRef}
              id={fileInputId}
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              multiple
              className="sr-only"
              onChange={onInputChange}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Choose images
            </button>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="space-y-2">
            <label htmlFor={pageSizeId} className="text-sm font-medium text-foreground">
              Page size
            </label>
            <select
              id={pageSizeId}
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as ImagePdfPageSize)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="a4">A4</option>
              <option value="letter">US Letter</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor={orientationId} className="text-sm font-medium text-foreground">
              Orientation
            </label>
            <select
              id={orientationId}
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as ImagePdfOrientation)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => void handleDownload()}
              disabled={busy || items.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Download className="h-4 w-4" aria-hidden />
              )}
              Download PDF
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={items.length === 0}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {items.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Order ({items.length} {items.length === 1 ? "image" : "images"}) — drag cards to reorder
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item, index) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => onCardDragStart(e, item.id)}
                onDragOver={onCardDragOver}
                onDrop={(e) => onCardDrop(e, item.id)}
                onDragEnd={onCardDragEnd}
                className={`group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition ${
                  draggingId === item.id ? "opacity-60 ring-2 ring-primary" : ""
                }`}
              >
                {/* Blob preview URLs — next/image not applicable. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/55 px-1 py-1 backdrop-blur-sm">
                  <span className="truncate px-1 text-[10px] font-medium text-white">
                    {index + 1}. {item.file.name}
                  </span>
                </div>
                <div className="absolute right-1 top-1 flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded bg-black/45 p-1 text-white hover:bg-black/65 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="rounded bg-black/45 p-1 text-white hover:bg-black/65 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded bg-black/45 p-1 text-white hover:bg-red-600/90"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
