"use client";

import { useRef, useState } from "react";
import { VenueQuickScanResults } from "@/components/venue-quick-scan-results";
import { Button } from "@/components/ui";
import { PHOTO_UPLOAD_NOTICE } from "@/lib/privacy-content";
import type { QuickScanResult } from "@/lib/venue-quick-scan";

type Props = {
  onScanComplete: (result: QuickScanResult) => void;
  disabled?: boolean;
};

async function stripExifFromFile(file: File): Promise<{ blob: Blob; mimeType: string }> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image");
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const mimeType = file.type.startsWith("image/") ? file.type : "image/jpeg";
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error("Could not process image"));
      },
      mimeType,
      0.92,
    );
  });

  return { blob, mimeType };
}

export function VenuePhotoScan({ onScanComplete, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [uploadConsent, setUploadConsent] = useState(false);
  const [scanResult, setScanResult] = useState<QuickScanResult | null>(null);

  async function scanFile(file: File) {
    if (!uploadConsent) {
      setStatus("error");
      setMessage("Please confirm you understand the photo upload rules before scanning.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setMessage("Please choose a photo file.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setStatus("error");
      setMessage("Photos must be under 4 MB.");
      return;
    }

    setStatus("scanning");
    setMessage("");
    setScanResult(null);

    try {
      const { blob, mimeType } = await stripExifFromFile(file);
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result;
        if (typeof dataUrl !== "string") {
          setStatus("error");
          setMessage("Could not read that photo.");
          return;
        }

        setPreview(dataUrl);
        const base64 = dataUrl.split(",")[1];
        if (!base64) {
          setStatus("error");
          setMessage("Could not read that photo.");
          return;
        }

        try {
          const response = await fetch("/api/venue-photo-scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64, mimeType }),
          });
          const data = (await response.json()) as QuickScanResult & { error?: string; ok?: boolean };
          if (!response.ok) {
            setStatus("error");
            setMessage(data.error ?? "Scan failed. Describe access in text instead.");
            return;
          }

          const result: QuickScanResult = {
            features: data.features ?? "",
            alreadyAccessible: data.alreadyAccessible ?? [],
            needsImprovement: data.needsImprovement ?? [],
            smallSteps: data.smallSteps ?? [],
            measurements: data.measurements,
            notes: data.notes,
          };

          setScanResult(result);
          onScanComplete(result);
          setStatus("ok");
          setMessage("Scan complete — review the results below and edit your listing details before you submit.");
        } catch {
          setStatus("error");
          setMessage("Could not reach the scan service. Describe access in text instead.");
        }
      };
      reader.onerror = () => {
        setStatus("error");
        setMessage("Could not read that photo.");
      };
      reader.readAsDataURL(blob);
    } catch {
      setStatus("error");
      setMessage("Could not process that photo. Describe access in text instead.");
    }
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void scanFile(file);
  }

  const uploadDisabled = disabled || status === "scanning" || !uploadConsent;

  return (
    <div className="rounded-2xl border border-[#EFE5DA] bg-[#FDFBF8] p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold text-heading">Quick Feature Scan</h3>
        <span className="rounded-full bg-[#FDE9DD] px-2.5 py-0.5 text-xs font-semibold text-[#C8430F]">Beta</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">
        Scan entrances, routes, toilets, parking, or signage. Upload photos and we&apos;ll show what already looks
        accessible, what may need work, and small steps you could take — before you submit your venue listing.
      </p>

      <aside className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
        {PHOTO_UPLOAD_NOTICE}
      </aside>

      <label className="mt-4 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-muted">
        <input
          type="checkbox"
          checked={uploadConsent}
          onChange={(event) => setUploadConsent(event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#F04A16]"
        />
        <span>I confirm my photos follow these rules and do not contain unnecessary personal information.</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={onFileChange}
        disabled={uploadDisabled}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="secondary" disabled={uploadDisabled} onClick={() => inputRef.current?.click()}>
          {status === "scanning" ? "Scanning photo…" : "Scan an area or upload a photo"}
        </Button>
      </div>

      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Uploaded venue access photo preview"
          className="mt-4 max-h-48 rounded-xl border border-border object-cover"
        />
      ) : null}

      {status === "error" && message ? (
        <p className="form-error-text mt-3 text-sm" role="alert">
          {message}
        </p>
      ) : null}

      {status === "ok" && message ? (
        <p className="form-success-text mt-3 text-sm" role="status">
          {message}
        </p>
      ) : null}

      {scanResult ? (
        <div className="mt-4">
          <VenueQuickScanResults result={scanResult} />
        </div>
      ) : null}
    </div>
  );
}
