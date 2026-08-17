import { getPrisma } from "@/lib/prisma";
import type { EventItem } from "@/types/events";

export async function getPublishedEvents(): Promise<EventItem[]> {
  try {
    const rows = await getPrisma().event.findMany({
      where: { active: true },
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        body: true,
        imageUrl: true,
        position: true,
      },
    });

    return rows;
  } catch (error) {
    console.error("Failed to load events.", error);
    return [];
  }
}
