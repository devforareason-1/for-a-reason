"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { CheckboxGroup, SelectField, TextAreaField, TextField } from "@/components/contact/form-fields";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { budgetOptions, readEnquiry, serviceOptions, timelineOptions, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";
import { site } from "@/lib/site";

const initialState: EnquiryState = { status: "idle" };

const fieldOrder: (keyof EnquiryErrors)[] = ["name", "company", "email", "website", "services", "budget", "timeline", "description"];

function focusFirstError(form: HTMLFormElement, errors: EnquiryErrors) {
  const first = fieldOrder.find((field) => errors[field]);
  if (!first) return;
  const target = form.querySelector<HTMLElement>(`[name="${first}"]`);
  target?.focus();
}

const failureMessages: Partial<Record<EnquiryState["status"], string>> = {
  unavailable: "We couldn't send this: our enquiry inbox isn't connected yet. Nothing was submitted.",
  failed: "We couldn't send this because of a problem on our side. Your answers are still here, so please try again.",
  limited: "That's a few too many attempts in a short time. Please wait a few minutes and try again.",
};

export function EnquiryForm() {
  const [state, dispatch, pending] = useActionState(submitEnquiry, initialState);
  const [clientErrors, setClientErrors] = useState<EnquiryErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errors: EnquiryErrors = clientErrors ?? (state.status === "invalid" ? state.errors : {});
  const failure = failureMessages[state.status];

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "invalid" && formRef.current) focusFirstError(formRef.current, state.errors);
  }, [state]);

  // Dispatching manually rather than through the form's action prop stops React resetting
  // the fields after a failed send. The action prop stays for visitors without JavaScript.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validateEnquiry(readEnquiry(data));
    if (Object.keys(found).length > 0) {
      setClientErrors(found);
      focusFirstError(form, found);
      return;
    }
    setClientErrors(null);
    startTransition(() => dispatch(data));
  };

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
        <p className="font-display text-display font-bold">
          Received<span className="text-ember">.</span>
        </p>
        <p className="mt-6 max-w-xl text-lede">Thank you. We read every enquiry ourselves and will reply to the email address you gave us.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={dispatch} onSubmit={handleSubmit} noValidate className="grid gap-x-10 gap-y-10 md:grid-cols-2">
      {/* Honeypot: hidden from people and from assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Reference
          <input type="text" name="reference" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <TextField name="name" label="Name" autoComplete="name" maxLength={200} error={errors.name} />
      <TextField name="company" label="Business / company" autoComplete="organization" maxLength={200} error={errors.company} />
      <TextField name="email" label="Email" type="email" autoComplete="email" inputMode="email" maxLength={200} error={errors.email} />
      <TextField name="website" label="Website" optional autoComplete="url" inputMode="url" placeholder="example.com" maxLength={200} error={errors.website} />

      <div className="md:col-span-2">
        <CheckboxGroup name="services" legend="Service needed" options={serviceOptions} error={errors.services} />
      </div>
      <SelectField name="budget" label="Estimated budget" placeholder="Select a range" options={budgetOptions} error={errors.budget} />
      <SelectField name="timeline" label="Desired timeline" placeholder="Select timeline" options={timelineOptions} error={errors.timeline} />

      <TextAreaField name="description" label="Project description" placeholder="Tell us about your project, goals and any specific requirements…" maxLength={5000} className="md:col-span-2" error={errors.description} />

      <div className="flex flex-col items-start gap-5 md:col-span-2">
        {failure && (
          <div role="alert" className="max-w-2xl border-l-2 border-rust pl-4 leading-relaxed">
            <p>{failure}</p>
            {site.contact.email && (
              <p className="mt-2 opacity-85">
                You can also write to us directly at{" "}
                <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">
                  {site.contact.email}
                </a>
                .
              </p>
            )}
          </div>
        )}
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? "Sending…" : "Send Enquiry"}
          {!pending && <ArrowGlyph />}
        </Button>
      </div>
    </form>
  );
}
