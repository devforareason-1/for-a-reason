import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { nextProject, projects } from "../content/projects.ts";
import { services } from "../content/services.ts";

test("logo data was generated cleanly from the brand kit", () => {
  const logo = JSON.parse(readFileSync("components/brand/logo-paths.json", "utf8"));
  for (const mark of [logo.wordmark, logo.monogram]) {
    assert.ok(mark.width > 0 && mark.height > 0);
    assert.ok(mark.letters.length > 0 && mark.period.length > 0);
    assert.doesNotMatch(mark.letters + mark.period, /NaN|undefined/);
  }
  const { left, right } = logo.wordmark.clearSpace;
  assert.equal(Math.round(logo.wordmark.width + left + right), 1079);
});

test("project slugs are unique", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
});

test("unconfirmed projects stay unpublished", () => {
  assert.equal(projects.some((project) => project.slug === "sahyadri-steel-studio"), false);
});

test("sample and concept entries never carry outcomes", () => {
  for (const project of projects) {
    if (project.sample || project.kind === "concept") {
      assert.equal(project.outcomes, undefined, project.slug);
    }
  }
});

test("project services resolve and images exist with alt text", () => {
  const slugs = new Set(services.map((service) => service.slug));
  for (const project of projects) {
    for (const service of project.services) assert.ok(slugs.has(service), `${project.slug}: ${service}`);
    const images = [project.cover, project.approach.image, project.execution.image].filter((image) => image !== undefined);
    for (const image of images) {
      assert.ok(image.alt.length > 0, `${project.slug}: alt`);
      assert.ok(existsSync(`public${image.src}`), image.src);
    }
  }
});

test("next project wraps around and never returns itself", () => {
  for (const project of projects) assert.notEqual(nextProject(project.slug)?.slug, project.slug);
});
