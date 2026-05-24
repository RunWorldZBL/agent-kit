#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const rel = (...parts) => path.join(...parts).replaceAll("\\", "/");
const abs = (...parts) => path.join(root, ...parts);

function fail(message) {
  errors.push(message);
}

function exists(...parts) {
  return fs.existsSync(abs(...parts));
}

function walk(dir, options = {}) {
  const out = [];
  const start = abs(dir);
  if (!fs.existsSync(start)) return out;

  const ignored = new Set(["node_modules", ".git"]);
  const stack = [start];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      const relative = path.relative(root, full).replaceAll("\\", "/");
      if (entry.isDirectory()) {
        if (ignored.has(entry.name)) continue;
        if (options.skipArchive && relative.startsWith("docs/archive/")) continue;
        stack.push(full);
      } else {
        out.push(relative);
      }
    }
  }
  return out;
}

function findDirs(name) {
  const matches = [];
  const ignored = new Set(["node_modules", ".git"]);
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const full = path.join(current, entry.name);
      const relative = path.relative(root, full).replaceAll("\\", "/");
      if (ignored.has(entry.name)) continue;
      if (relative.startsWith("docs/archive/")) continue;
      if (entry.name === name) matches.push(relative);
      stack.push(full);
    }
  }
  return matches;
}

function checkRequiredFiles() {
  const required = [
    "AGENTS.md",
    "backend/AGENTS.md",
    "frontend/AGENTS.md",
    "shared/api-contracts/AGENTS.md",
    ".codex/skills/test-driven-development/SKILL.md",
    ".codex/skills/openspec-apply-change/SKILL.md",
    ".codex/skills/openspec-archive-change/SKILL.md",
    ".codex/skills/openspec-explore/SKILL.md",
    ".codex/skills/openspec-propose/SKILL.md",
    ".codex/skills/planning-with-files/SKILL.md",
  ];

  for (const file of required) {
    if (!exists(file)) fail(`Missing required harness file: ${file}`);
  }
}

function checkForbiddenEntrypoints() {
  for (const dir of findDirs(".claude")) fail(`Forbidden active Claude directory: ${dir}`);
  for (const dir of findDirs(".kiro")) fail(`Forbidden active Kiro directory: ${dir}`);

  if (exists("backend/.github")) fail("Forbidden backend/.github agent entrypoint directory exists");
  if (exists("backend/.codex/prompts")) fail("Forbidden backend/.codex/prompts directory exists");

  const backendOpenSpecSkills = fs.existsSync(abs("backend/.codex/skills"))
    ? fs.readdirSync(abs("backend/.codex/skills"), { withFileTypes: true })
      .filter(entry => entry.isDirectory() && entry.name.startsWith("openspec-"))
      .map(entry => rel("backend/.codex/skills", entry.name))
    : [];

  for (const dir of backendOpenSpecSkills) {
    fail(`OpenSpec skills must live at root .codex/skills, not backend: ${dir}`);
  }
}

function parseFrontmatter(file) {
  const text = fs.readFileSync(abs(file), "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;

  const lines = match[1].split(/\r?\n/).filter(Boolean);
  const fields = new Map();
  for (const line of lines) {
    const fieldMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!fieldMatch) {
      fields.set(line, undefined);
      continue;
    }
    fields.set(fieldMatch[1], fieldMatch[2].replace(/^["']|["']$/g, ""));
  }
  return fields;
}

function checkSkills() {
  const skillFiles = [
    ...walk(".codex/skills"),
    ...walk("backend/.codex/skills"),
    ...walk("frontend/.codex/skills"),
  ].filter(file => file.endsWith("/SKILL.md"));

  for (const file of skillFiles) {
    const fields = parseFrontmatter(file);
    if (!fields) {
      fail(`Skill missing YAML frontmatter: ${file}`);
      continue;
    }

    const keys = [...fields.keys()];
    const allowed = new Set(["name", "description"]);
    for (const key of keys) {
      if (!allowed.has(key)) fail(`Skill frontmatter has unsupported field "${key}": ${file}`);
    }

    if (!fields.get("name")) fail(`Skill frontmatter missing name: ${file}`);
    if (!fields.get("description")) fail(`Skill frontmatter missing description: ${file}`);

    const dirName = path.basename(path.dirname(file));
    if (fields.get("name") && fields.get("name") !== dirName) {
      fail(`Skill name "${fields.get("name")}" does not match directory "${dirName}": ${file}`);
    }
  }
}

function checkPlanningState() {
  if (exists(".planning")) {
    fail("Active .planning/ directory exists. Remove it or archive completed runtime notes before committing.");
  }
}

checkRequiredFiles();
checkForbiddenEntrypoints();
checkSkills();
checkPlanningState();

if (errors.length > 0) {
  console.error("Harness check failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Harness check passed.");
