"use client";

import { Field, Input, Textarea } from "@/components/ui/field";
import type { FieldDef } from "@/lib/booking/fields";

const INPUT_TYPE = { text: "text", email: "email", tel: "tel" } as const;

/** Renderer for `text` / `email` / `tel` / `textarea` fields. */
export function TextField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (value: string) => void;
}) {
  const shared = {
    id: field.key,
    value,
    placeholder: field.placeholder,
    autoComplete: field.autoComplete,
    maxLength: field.maxLength,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(event.target.value),
  };

  return (
    <Field label={field.label} htmlFor={field.key} hint={field.hint}>
      {field.kind === "textarea" ? (
        <Textarea {...shared} rows={3} />
      ) : (
        <Input
          {...shared}
          type={INPUT_TYPE[field.kind as "text" | "email" | "tel"]}
        />
      )}
    </Field>
  );
}
