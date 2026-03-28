"use client";

import jsQR from "jsqr";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const FRAME_SKIP = 4;

function toClickableHref(text: string): string | null {
  const t = text.trim();
  if (!t) return null;
  try {
    const u = new URL(t);
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch {
    /* ignore */
  }
  if (/^https?:\/\//i.test(t)) {
    try {
      return new URL(t).href;
    } catch {
      return null;
    }
  }
  return null;
}

export default function QrCodeScannerPage() {
  const hintId = useId();
  const errorId = useId();
  const resultId = useId();
  const permHintId = useId();
  const videoRegionId = useId();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameCountRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [decoded, setDecoded] = useState<string | null>(null);
  const [source, setSource] = useState<"camera" | "file" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    frameCountRef.current = 0;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    const v = videoRef.current;
    if (v) {
      v.srcObject = null;
    }
    setCameraOn(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const decodeImageData = useCallback((data: ImageData): string | null => {
    const res = jsQR(data.data, data.width, data.height, {
      inversionAttempts: "attemptBoth",
    });
    return res?.data ?? null;
  }, []);

  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !streamRef.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx || video.readyState < video.HAVE_CURRENT_DATA) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const w = video.videoWidth;
    const h = video.videoHeight;
    if (w === 0 || h === 0) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    frameCountRef.current += 1;
    if (frameCountRef.current % FRAME_SKIP !== 0) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(video, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const text = decodeImageData(imageData);
    if (text) {
      setDecoded(text);
      setSource("camera");
      setError(null);
    }

    rafRef.current = requestAnimationFrame(scanFrame);
  }, [decodeImageData]);

  const startCamera = async () => {
    setError(null);
    setDecoded(null);
    setSource(null);
    stopCamera();

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError(
        "Your browser does not support camera access. Try Chrome, Safari, or Firefox on HTTPS or localhost.",
      );
      return;
    }

    setBusy(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      const v = videoRef.current;
      if (!v) {
        stream.getTracks().forEach((t) => t.stop());
        setBusy(false);
        return;
      }
      v.srcObject = stream;
      await v.play();
      setCameraOn(true);
      rafRef.current = requestAnimationFrame(scanFrame);
    } catch (e: unknown) {
      const name = e instanceof Error ? e.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setError(
          "Camera permission was blocked. Allow camera access in your browser settings and try again.",
        );
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setError("No camera was found on this device.");
      } else {
        setError("Could not start the camera. Check permissions and try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleStopCamera = () => {
    stopCamera();
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);
    setDecoded(null);
    setSource(null);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG, JPG, WebP, etc.).");
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setError("Could not read the image.");
        return;
      }
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const max = 2048;
      let tw = nw;
      let th = nh;
      if (tw > max || th > max) {
        const s = max / Math.max(tw, th);
        tw = Math.round(tw * s);
        th = Math.round(th * s);
      }
      canvas.width = tw;
      canvas.height = th;
      ctx.drawImage(img, 0, 0, tw, th);
      const imageData = ctx.getImageData(0, 0, tw, th);
      const text = decodeImageData(imageData);
      if (text) {
        setDecoded(text);
        setSource("file");
      } else {
        setError(
          "No QR code was found in that image. Use a sharper photo or try the camera.",
        );
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError("Could not load the image file.");
    };
    img.src = url;
  };

  const handleClear = () => {
    setDecoded(null);
    setSource(null);
    setError(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const href = decoded ? toClickableHref(decoded) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.qrCodeScanner)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="qr-scan-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">QR Code Scanner</span>
              </p>
            </nav>

            <h1
              id="qr-scan-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              QR Code Scanner Online Free
            </h1>

            <p id={hintId} className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Scan with your camera or upload a screenshot—decoded text stays on
              your device. Use HTTPS or localhost so the browser can access the
              camera.
            </p>
            <p
              id={permHintId}
              className="mt-2 text-sm font-medium text-foreground sm:text-base"
            >
              When you start the camera, your browser will ask for permission—tap
              Allow on mobile.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              QR scanner
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-hidden
              tabIndex={-1}
              onChange={onFileChange}
            />

            <div
              id={videoRegionId}
              className="relative overflow-hidden rounded-xl border border-border bg-black/90"
            >
              <video
                ref={videoRef}
                className={`aspect-[4/3] w-full object-cover sm:aspect-video ${
                  cameraOn ? "block" : "hidden"
                }`}
                playsInline
                muted
                autoPlay
                aria-label="Camera preview for QR scanning"
              />
              {!cameraOn ? (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-muted/40 px-4 py-12 text-center sm:aspect-video">
                  <p className="text-sm font-medium text-foreground">
                    Camera preview
                  </p>
                  <p className="max-w-xs text-xs text-muted-foreground">
                    Start the camera to scan live, or upload a QR image below.
                  </p>
                </div>
              ) : null}
            </div>

            <canvas ref={canvasRef} className="hidden" aria-hidden />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void startCamera()}
                disabled={busy || cameraOn}
                className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-auto"
              >
                {busy ? "Starting…" : "Start camera"}
              </button>
              <button
                type="button"
                onClick={handleStopCamera}
                disabled={!cameraOn}
                className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-auto"
              >
                Stop camera
              </button>
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:h-11 sm:w-auto"
              >
                Upload image
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!decoded && !cameraOn && !error}
                className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-auto"
              >
                Clear result
              </button>
            </div>

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div
              id={resultId}
              className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6"
              aria-live="polite"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Result
              </p>
              {decoded ? (
                <div className="mt-3 space-y-3">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-lg font-semibold text-primary underline-offset-4 hover:underline sm:text-xl"
                    >
                      {decoded}
                    </a>
                  ) : (
                    <p className="whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-foreground sm:text-base">
                      {decoded}
                    </p>
                  )}
                  {source ? (
                    <p className="text-xs text-muted-foreground">
                      Source: {source === "camera" ? "Camera" : "Uploaded image"}
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Scan a code or upload an image—decoded text or links appear here.
                </p>
              )}
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="qr-scan-seo-heading">
            <h2
              id="qr-scan-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a QR Code Scanner?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A QR code scanner reads the black-and-white square pattern and turns
              it into text—often a website URL, Wi‑Fi login, or app deep link. This
              tool decodes codes in your browser without installing an app.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Scan QR Code Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Allow camera access when prompted (mobile: use the rear camera).</li>
              <li>Tap Start camera and point at the QR code until a result appears.</li>
              <li>Or tap Upload image and choose a photo that contains the code.</li>
              <li>Open links in a new tab only if you trust the source.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use Cases
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">Websites:</strong> jump
                to menus, tickets, or campaigns.
              </li>
              <li>
                <strong className="font-medium text-foreground">Payments:</strong>{" "}
                read payment or wallet payloads (always verify the merchant).
              </li>
              <li>
                <strong className="font-medium text-foreground">Apps:</strong>{" "}
                install links, sign-in helpers, and two-factor setup codes.
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Point the camera at a QR that encodes{" "}
                <span className="font-mono text-foreground">https://example.com</span>
                —the tool shows that string and turns it into a tappable link.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  Can I scan QR code from image?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Use Upload image with a clear screenshot or photo of the code.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does it work on mobile?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Large tap targets and{" "}
                  <code className="rounded bg-muted px-1 font-mono text-sm">
                    playsInline
                  </code>{" "}
                  video help on phones; HTTPS is required for camera access on most
                  browsers.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s QR scanner is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Frames and images are processed locally; we do not upload your
                  scans to our servers.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/qr-code-scanner" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
