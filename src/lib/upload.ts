import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPrisma } from "@/lib/prisma";
import { storedImageUrl } from "@/lib/stored-image";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./upload-limits";

export class UploadError extends Error {}

/**
 * Stores an admin-uploaded image (Akcie / Upozornenie) and returns its public URL.
 * Bytes go into Neon (StoredImage table) and are served from /api/media/[id].
 * Local dev without a database falls back to public/uploads.
 */
export async function saveUploadedImage(file: File, folder: string): Promise<string> {
  const extension = ACCEPTED_IMAGE_TYPES[file.type];
  if (!extension) {
    throw new UploadError("Nepodporovaný formát. Použite JPG, PNG, WEBP, AVIF alebo GIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new UploadError("Obrázok je príliš veľký — maximum je 3 MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const record = await getPrisma().storedImage.create({
      data: {
        data: buffer,
        mimeType: file.type,
      },
    });
    return storedImageUrl(record.id);
  } catch (error) {
    if (process.env.VERCEL) {
      console.error("Database image upload failed on Vercel.", error);
      throw new UploadError("Obrázok sa nepodarilo uložiť do databázy.");
    }
  }

  const filename = `${randomUUID()}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
