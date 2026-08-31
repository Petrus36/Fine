import Image, { type ImageProps } from "next/image";

type UploadedImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

/** CMS uploads from admin (akcie, upozornenie) — served from /api/media or /uploads in dev. */
export function UploadedImage({ src, alt, ...props }: UploadedImageProps) {
  const remote = src.startsWith("http://") || src.startsWith("https://");

  return <Image src={src} alt={alt} unoptimized={remote} {...props} />;
}
