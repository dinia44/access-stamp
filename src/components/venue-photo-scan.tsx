"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui";

type Props = {
  onFeaturesDetected: (features: string, notes?: string) => void;
  disabled?: boolean;
};

export function VenuePhotoScan({ onFeaturesDetected, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function scanFile(file: File) {
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
          body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
        });
        const data = (await response.json()) as { features?: string; notes?: string; error?: string };
        if (!response.ok) {
          setStatus("error");
          setMessage(data.error ?? "Scan failed. Describe access in text instead.");
          return;
        }

        onFeaturesDetected(data.features ?? "", data.notes);
        setStatus("ok");
        setMessage(data.notes ? `${data.notes} We added what we could see to the form below.` : "Scan complete — check the access features field below.");
      } catch {
        setStatus("error");
        setMessage("Could not reach the scan service. Describe access in text instead.");
      }
    };
    reader.onerror = () => {
      setStatus("error");
      setMessage("Could not read that photo.");
    };
    reader.readAsDataURL(file);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void scanFile(file);
  }

  return (
    <div className="rounded-2xl border border-[#EFE5DA] bg-[#FDFBF8] p-5">
      <h3 className="text-sm font-semibold text-heading">Scan access with AI</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Take or upload photos of entrances, routes, toilets, or parking. We&apos;ll suggest access features you can
        review before you submit your listing.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={onFileChange}
        disabled={disabled || status === "scanning"}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          disabled={disabled || status === "scanning"}
          onClick={() => inputRef.current?.click()}
        >
          {status === "scanning" ? "Scanning photo…" : "Take or upload photo"}
        </Button>
      </div>

      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Uploaded venue access photo preview" className="mt-4 max-h-48 rounded-xl border border-border object-cover" />
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
    </div>
  );
}
