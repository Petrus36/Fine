import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const image = await getPrisma().storedImage.findUnique({
    where: { id },
    select: { data: true, mimeType: true },
  });

  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(image.data, {
    headers: {
      "Content-Type": image.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
