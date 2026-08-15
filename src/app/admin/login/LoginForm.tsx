"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Field } from "@/components/admin/Field";
import { buttonClass, inputClass } from "@/components/admin/styles";

export interface LoginState {
  message?: string;
  /** Kept so a failed attempt does not clear the e-mail field. */
  email?: string;
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {} as LoginState);

  return (
    <form action={formAction} className="mt-6">
      <div className="space-y-4">
        <Field label="E-mail" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            defaultValue={state.email ?? ""}
            required
            className={inputClass}
          />
        </Field>
        <Field label="Heslo" htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={inputClass}
          />
        </Field>
      </div>

      <button type="submit" className={`${buttonClass} mt-6 w-full`} disabled={pending}>
        {pending ? "Prihlasujem…" : "Prihlásiť sa"}
      </button>

      {state.message && !pending ? (
        <p className="mt-4 text-[12px] text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}
