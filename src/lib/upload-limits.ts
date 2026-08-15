/** Shared between the upload handler and the admin form's client-side check. */
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
