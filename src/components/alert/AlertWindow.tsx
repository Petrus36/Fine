import { connection } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { currentDate } from "@/lib/now";
import { AlertModal } from "./AlertModal";

interface ActiveAlert {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
  buttonLabel: string | null;
  buttonUrl: string | null;
  updatedAt: Date;
}

async function findActiveAlert(): Promise<ActiveAlert | null> {
  if (!process.env.DATABASE_URL) return null;

  const now = await currentDate();

  try {
    return await getPrisma().alertWindow.findFirst({
      where: {
        active: true,
        AND: [
          { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
          { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
        ],
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.error("Could not load the alert window.", error);
    return null;
  }
}

/** Renders nothing unless an alert is switched on and inside its date range. */
export async function AlertWindow() {
  // Read at request time so switching the alert on shows up without a rebuild.
  await connection();

  const alert = await findActiveAlert();
  if (!alert) return null;

  return (
    <AlertModal
      // Changing the alert makes visitors who already dismissed it see the new one.
      version={`${alert.id}:${alert.updatedAt.getTime()}`}
      title={alert.title}
      body={alert.body}
      imageUrl={alert.imageUrl}
      buttonLabel={alert.buttonLabel}
      buttonUrl={alert.buttonUrl}
    />
  );
}
