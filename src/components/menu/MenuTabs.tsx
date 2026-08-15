"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/format";

type TabKey = "daily" | "weekly";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "daily", label: "Denné menu" },
  { key: "weekly", label: "Týždenné menu" },
];

export function MenuTabs({
  daily,
  weekly,
}: {
  daily: React.ReactNode;
  weekly: React.ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("daily");

  return (
    <>
      <Container className="px-0 sm:px-8">
        <div role="tablist" aria-label="Typ menu" className="grid grid-cols-2">
          {tabs.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${tab.key}`}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "px-4 py-4 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors",
                  isActive
                    ? "bg-bark text-paper"
                    : "bg-paper text-espresso/70 hover:text-clay",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Container>

      <div id="panel-daily" role="tabpanel" hidden={active !== "daily"}>
        {daily}
      </div>
      <div id="panel-weekly" role="tabpanel" hidden={active !== "weekly"}>
        {weekly}
      </div>
    </>
  );
}
