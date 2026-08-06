export const MAX_ATTACHMENTS = 3;
export const MAX_SOURCE_BYTES = 15 * 1024 * 1024; // 15 MB raw file
export const MAX_ENCODED_BYTES = 1_800_000; // ~1.8 MB after compression
export const MAX_DIMENSION = 1280;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

export type ChatAttachment = {
  id: string;
  filename: string;
  mediaType: string;
  /** data: URL that is safe to both render locally and send to the model */
  url: string;
};

export class AttachmentError extends Error {}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new AttachmentError("unreadable"));
    img.src = src;
  });
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new AttachmentError("unreadable"));
    reader.readAsDataURL(file);
  });
}

/**
 * Normalises a picked image into a compact JPEG/PNG data URL.
 * Phone photos are 4-12 MB; sending them raw makes the chat request fail,
 * so everything is downscaled and re-encoded before it leaves the browser.
 */
export async function fileToAttachment(file: File): Promise<ChatAttachment> {
  if (!file.type.startsWith("image/")) throw new AttachmentError("type");
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    throw new AttachmentError("type");
  }
  if (file.size > MAX_SOURCE_BYTES) throw new AttachmentError("size");

  const original = await readAsDataUrl(file);
  const id = `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Animated GIFs cannot be re-encoded on a canvas without losing frames.
  if (file.type === "image/gif") {
    if (original.length > MAX_ENCODED_BYTES) throw new AttachmentError("size");
    return { id, filename: file.name, mediaType: file.type, url: original };
  }

  let img: HTMLImageElement;
  try {
    img = await loadImage(original);
  } catch {
    throw new AttachmentError("unreadable");
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    if (original.length > MAX_ENCODED_BYTES) throw new AttachmentError("size");
    return { id, filename: file.name, mediaType: file.type, url: original };
  }
  ctx.drawImage(img, 0, 0, width, height);

  let quality = 0.82;
  let url = canvas.toDataURL("image/jpeg", quality);
  while (url.length > MAX_ENCODED_BYTES && quality > 0.4) {
    quality -= 0.12;
    url = canvas.toDataURL("image/jpeg", quality);
  }
  if (url.length > MAX_ENCODED_BYTES) throw new AttachmentError("size");

  return { id, filename: file.name, mediaType: "image/jpeg", url };
}