import "server-only";
import { getPrisma } from "@/lib/prisma";

const MEDIA_PATH = "/api/media/";

export function storedImageUrl(id: string): string {
  return `${MEDIA_PATH}${id}`;
}

export function parseStoredImageId(url: string | null | undefined): string | null {
  if (!url?.startsWith(MEDIA_PATH)) return null;
  const id = url.slice(MEDIA_PATH.length);
  return id.length > 0 ? id : null;
}

export async function deleteStoredImage(url: string | null | undefined): Promise<void> {
  const id = parseStoredImageId(url);
  if (!id) return;

  try {
    await getPrisma().storedImage.delete({ where: { id } });
  } catch {
    // Already removed or never existed.
  }
}
