// Enquiry options and validation, shared by the browser and the server so the
// two can never disagree. No framework imports: this file runs anywhere.

export const serviceOptions = ["Brand Identity", "Digital Experiences", "Social & Content", "Growth & Marketing", "Not sure yet"] as const;

export const budgetOptions = [
  "Under ₹50,000",
  "₹50,000–₹1,50,000",
  "₹1,50,000–₹5,00,000",
  "₹5,00,000+",
  "Outside India: we'll talk in your currency",
  "Not sure yet",
] as const;

export const timelineOptions = ["As soon as possible", "Within 1–3 months", "3–6 months out", "Flexible"] as const;

export interface Enquiry {
  name: string;
  company: string;
  email: string;
  website: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
}

export type EnquiryField = keyof Enquiry;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const limits = { short: 200, description: 5000, descriptionMin: 20 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isOneOf = (options: readonly string[], value: string) => options.includes(value);

function validWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function validateEnquiry(input: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (!input.name) errors.name = "Tell us who we'd be talking to.";
  else if (input.name.length > limits.short) errors.name = "That name is longer than we can store.";

  if (!input.company) errors.company = "Which business or company is this for?";
  else if (input.company.length > limits.short) errors.company = "That name is longer than we can store.";

  if (!input.email) errors.email = "We need an email address to reply to.";
  else if (input.email.length > limits.short || !EMAIL.test(input.email)) errors.email = "That email address doesn't look right.";

  if (input.website && (input.website.length > limits.short || !validWebsite(input.website))) {
    errors.website = "That doesn't look like a web address. It's optional, so you can leave it blank.";
  }

  if (input.services.length === 0) errors.services = "Pick at least one, or choose \"Not sure yet\".";
  else if (!input.services.every((service) => isOneOf(serviceOptions, service))) errors.services = "Please choose from the list.";

  if (!isOneOf(budgetOptions, input.budget)) errors.budget = "Pick the closest range, or choose \"Not sure yet\".";
  if (!isOneOf(timelineOptions, input.timeline)) errors.timeline = "Pick the closest timeline.";

  if (!input.description) errors.description = "A few lines about the project is all we need.";
  else if (input.description.length < limits.descriptionMin) errors.description = "Could you tell us a little more? A sentence or two is enough.";
  else if (input.description.length > limits.description) errors.description = `Please keep this under ${limits.description.toLocaleString("en-IN")} characters.`;

  return errors;
}

export function readEnquiry(data: FormData): Enquiry {
  const text = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: text("name"),
    company: text("company"),
    email: text("email"),
    website: text("website"),
    services: data.getAll("services").filter((value): value is string => typeof value === "string"),
    budget: text("budget"),
    timeline: text("timeline"),
    description: text("description"),
  };
}
