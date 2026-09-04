import type { ProcessedAttachment, StructuredFact } from "../types.ts";

/**
 * Image Metadata & Envelope Preprocessor (PNG, JPG, WEBP, SVG).
 * Extracts container metadata honestly without hallucinating unextracted OCR text.
 */
export function processImageData(
  id: string,
  name: string,
  mimeType: string,
  size: number
): ProcessedAttachment {
  const sizeMb = (size / (1024 * 1024)).toFixed(2);
  const ext = name.split(".").pop()?.toUpperCase() || "IMAGE";

  const facts: StructuredFact[] = [
    {
      key: "Image Format",
      value: ext,
      category: "system",
      confidence: 1.0,
      source: name,
    },
    {
      key: "File Weight",
      value: `${sizeMb} MB`,
      category: "metric",
      confidence: 1.0,
      source: name,
    },
  ];

  return {
    id,
    name,
    category: "image",
    mimeType: mimeType || `image/${ext.toLowerCase()}`,
    size,
    processing: {
      status: "partial",
      method: "Image Envelope Inspector",
      warning: "Image uploaded for contextual reference. Visual details will be guided by user directive.",
    },
    summary: {
      overview: `${ext} image reference (${sizeMb} MB).`,
    },
    facts,
  };
}
