import assert from "node:assert/strict";
import { test } from "node:test";
import { budgetOptions, readEnquiry, timelineOptions, validateEnquiry, type Enquiry } from "../lib/enquiry.ts";

const valid: Enquiry = {
  name: "A Person",
  company: "A Company",
  email: "person@example.com",
  website: "",
  services: ["Brand Identity"],
  budget: budgetOptions[0],
  timeline: timelineOptions[0],
  description: "We need a new identity and a website to go with it.",
};

test("accepts a complete enquiry", () => {
  assert.deepEqual(validateEnquiry(valid), {});
});

test("requires every mandatory field and leaves website optional", () => {
  const errors = validateEnquiry({ ...valid, name: "", company: "", email: "", services: [], budget: "", timeline: "", description: "" });
  assert.deepEqual(Object.keys(errors).sort(), ["budget", "company", "description", "email", "name", "services", "timeline"]);
});

test("rejects malformed emails", () => {
  for (const email of ["nope", "a@b", "a b@example.com", "@example.com"]) {
    assert.ok(validateEnquiry({ ...valid, email }).email, email);
  }
});

test("accepts websites with or without a scheme and rejects junk", () => {
  for (const website of ["example.com", "https://example.co.in/about"]) {
    assert.equal(validateEnquiry({ ...valid, website }).website, undefined, website);
  }
  for (const website of ["not a url", "localhost", "javascript:alert(1)"]) {
    assert.ok(validateEnquiry({ ...valid, website }).website, website);
  }
});

test("rejects values outside the offered options", () => {
  assert.ok(validateEnquiry({ ...valid, budget: "A million dollars" }).budget);
  assert.ok(validateEnquiry({ ...valid, timeline: "Yesterday" }).timeline);
  assert.ok(validateEnquiry({ ...valid, services: ["Crypto"] }).services);
});

test("enforces description length bounds", () => {
  assert.ok(validateEnquiry({ ...valid, description: "Too short" }).description);
  assert.ok(validateEnquiry({ ...valid, description: "x".repeat(5001) }).description);
});

test("readEnquiry trims text and collects multi-select values", () => {
  const data = new FormData();
  data.set("name", "  Spaced  ");
  data.append("services", "Brand Identity");
  data.append("services", "Growth & Marketing");
  const enquiry = readEnquiry(data);
  assert.equal(enquiry.name, "Spaced");
  assert.deepEqual(enquiry.services, ["Brand Identity", "Growth & Marketing"]);
  assert.equal(enquiry.company, "");
});
