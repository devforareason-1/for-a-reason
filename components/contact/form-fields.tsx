import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Fields live on the ivory enquiry panel.
const inputStyles =
  "mt-2 w-full rounded-md border border-ink/25 bg-transparent px-3 py-2.5 text-base text-ink outline-none transition-colors duration-(--duration-fast) placeholder:text-ink/55 hover:border-ink/50 focus:border-ember aria-[invalid=true]:border-rust";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-rust">
      {message}
    </p>
  );
}

interface FieldProps {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
}

const describedBy = (name: string, error?: string) => (error ? `${name}-error` : undefined);

function FieldLabel({ name, label, optional }: Pick<FieldProps, "name" | "label" | "optional">) {
  return (
    <label htmlFor={name} className="block text-sm font-medium">
      {label}
      {optional ? <span className="font-normal opacity-70"> (optional)</span> : <span aria-hidden="true"> *</span>}
    </label>
  );
}

export function TextField({ name, label, error, optional, className, ...props }: FieldProps & Omit<ComponentProps<"input">, "name">) {
  return (
    <div className={className}>
      <FieldLabel name={name} label={label} optional={optional} />
      <input
        id={name}
        name={name}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error)}
        className={inputStyles}
        {...props}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

export function TextAreaField({ name, label, error, optional, className, ...props }: FieldProps & Omit<ComponentProps<"textarea">, "name">) {
  return (
    <div className={className}>
      <FieldLabel name={name} label={label} optional={optional} />
      <textarea
        id={name}
        name={name}
        rows={5}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error)}
        className={cn(inputStyles, "resize-y")}
        {...props}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

interface SelectFieldProps extends FieldProps {
  placeholder: string;
  options: readonly string[];
}

export function SelectField({ name, label, error, className, placeholder, options }: SelectFieldProps) {
  return (
    <div className={className}>
      <FieldLabel name={name} label={label} />
      <select
        id={name}
        name={name}
        required
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error)}
        className={inputStyles}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

interface CheckboxGroupProps {
  name: string;
  legend: string;
  options: readonly string[];
  error?: string;
}

export function CheckboxGroup({ name, legend, options, error }: CheckboxGroupProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm font-medium">
        {legend}
        <span aria-hidden="true"> *</span>
      </legend>
      <div className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" name={name} value={option} className="size-4.5 cursor-pointer accent-ember" />
            {option}
          </label>
        ))}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}
