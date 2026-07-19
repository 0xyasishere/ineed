"use client";

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "url" | "textarea" | "select";
  rows?: number;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  rows = 4,
  options,
  min,
  max,
  step,
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  const baseClasses = "w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]";
  const errorClasses = error ? "border-red-500 focus:border-red-500 focus:shadow-[3px_3px_0_rgba(239,68,68,0.3)]" : "";

  return (
    <div>
      <label className="block text-xs font-bold text-foreground/60 mb-1.5">{label}</label>
      
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : type === "select" ? (
        <select
          {...register(name)}
          className={`${baseClasses} ${errorClasses} cursor-pointer`}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name, { valueAsNumber: type === "number" })}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}
      
      {error && (
        <p className="mt-1.5 text-xs font-bold text-red-500">{error}</p>
      )}
    </div>
  );
}
