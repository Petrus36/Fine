"use client";

import { useFormStatus } from "react-dom";

export function ConfirmSubmit({
  children,
  className,
  message,
  formAction,
}: {
  children: React.ReactNode;
  className?: string;
  message: string;
  /** Set when the button posts to a different action than its parent form. */
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      formAction={formAction}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
