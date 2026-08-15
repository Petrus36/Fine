import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./upload-limits";

export class UploadError extends Error {}

/**
 * Stores an uploaded image and returns its public URL. Uses Vercel Blob when a
 * token is configured (required on Vercel — its filesystem is read-only) and
 * falls back to `public/uploads` for local development.
 */
export async function saveUploadedImage(file: File, folder: string): Promise<string> {
  const extension = ACCEPTED_IMAGE_TYPES[file.type];
  if (!extension) {
    throw new UploadError("Nepodporovaný formát. Použite JPG, PNG, WEBP, AVIF alebo GIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new UploadError("Obrázok je príliš veľký — maximum je 3 MB.");
  }

  const filename = `${randomUUID()}.${extension}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`${folder}/${filename}`, file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  const directory = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));

  return `/uploads/${folder}/${filename}`;
}
