"use client";

import { useActionState } from "react";
import { buttonClass } from "./styles";
import { cn } from "@/lib/format";

export interface ActionState {
  status: "idle" | "ok" | "error";
  message?: string;
}

export const idleState: ActionState = { status: "idle" };

export type FormAction = (
  state: ActionState,
  formData: FormData,
) => Promise<ActionState>;

export function AdminForm({
  action,
  children,
  submitLabel,
  className,
  footerClassName,
  extraFooter,
}: {
  action: FormAction;
  children: React.ReactNode;
  submitLabel: string;
  className?: string;
  footerClassName?: string;
  extraFooter?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, idleState);

  return (
    <form action={formAction} className={className}>
      {children}
      <div className={cn("mt-5 flex flex-wrap items-center gap-4", footerClassName)}>
        <button type="submit" className={buttonClass} disabled={pending}>
          {pending ? "Ukladám…" : submitLabel}
        </button>
        {extraFooter}
        {state.status !== "idle" && !pending ? (
          <p
            className={cn(
              "text-[12px]",
              state.status === "ok" ? "text-clay" : "text-red-700",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
