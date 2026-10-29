import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover: string;
  excerpt: string;
  status: "published" | "draft";
  slug: string;
}

export interface EventFrontmatter {
  title: string;
  date: string;
  endDate?: string;
  location: string;
  capacity?: number;
  description: string;
  cover: string;
  status: "upcoming" | "ongoing" | "past" | "cancelled";
  slug: string;
  registrationLink?: string;
}

interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

interface Event {
  slug: string;
  frontmatter: EventFrontmatter;
  content: string;
}

function readDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }
}

export function getPosts(): Post[] {
  const dir = path.join(CONTENT_DIR, "posts");
  const files = readDir(dir);
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as PostFrontmatter,
        content,
      };
    })
    .filter((p) => p.frontmatter.status !== "draft")
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const dir = path.join(CONTENT_DIR, "posts");
  const files = readDir(dir);
  for (const file of files) {
    const fileSlug = file.replace(/\.mdx?$/, "");
    if (fileSlug === slug) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    }
  }
  return null;
}

export function getEvents(): Event[] {
  const dir = path.join(CONTENT_DIR, "events");
  const files = readDir(dir);
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as EventFrontmatter,
        content,
      };
    })
    .sort((a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime());
}

export function getEventBySlug(slug: string): Event | null {
  const dir = path.join(CONTENT_DIR, "events");
  const files = readDir(dir);
  for (const file of files) {
    const fileSlug = file.replace(/\.mdx?$/, "");
    if (fileSlug === slug) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as EventFrontmatter,
        content,
      };
    }
  }
  return null;
}

export function savePost(slug: string, frontmatter: PostFrontmatter, content: string) {
  const dir = path.join(CONTENT_DIR, "posts");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const frontmatterStr = matter.stringify(content, frontmatter);
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), frontmatterStr, "utf-8");
}

// Удобная обертка для сохранения поста из формы
export function savePostFromForm(form: { slug: string; title: string; description: string; content: string; status: "published" | "draft"; cover: string }) {
  const frontmatter: PostFrontmatter = {
    title: form.title,
    date: new Date().toISOString().split("T")[0],
    description: form.description,
    tags: [],
    cover: form.cover,
    excerpt: form.description,
    status: form.status,
    slug: form.slug,
  };
  savePost(form.slug, frontmatter, form.content);
}

export function saveEvent(slug: string, frontmatter: EventFrontmatter, content: string) {
  const dir = path.join(CONTENT_DIR, "events");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const frontmatterStr = matter.stringify(content, frontmatter);
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), frontmatterStr, "utf-8");
}

// Удобная обертка для сохранения события из формы
export function saveEventFromForm(form: { slug: string; title: string; description: string; content: string; date: string; endDate: string; location: string; capacity: number; cover: string; registrationLink: string; status: "upcoming" | "ongoing" | "past" | "cancelled" }) {
  const frontmatter: EventFrontmatter = {
    title: form.title,
    date: form.date,
    endDate: form.endDate || form.date,
    description: form.description,
    cover: form.cover,
    location: form.location,
    capacity: form.capacity,
    status: form.status,
    slug: form.slug,
    registrationLink: form.registrationLink,
  };
  saveEvent(form.slug, frontmatter, form.content);
}

export function deletePost(slug: string) {
  const dir = path.join(CONTENT_DIR, "posts");
  const filePath = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export function deleteEvent(slug: string) {
  const dir = path.join(CONTENT_DIR, "events");
  const filePath = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export function getPostDrafts(): Post[] {
  const dir = path.join(CONTENT_DIR, "posts");
  const files = readDir(dir);
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as PostFrontmatter,
        content,
      };
    })
    .filter((p) => p.frontmatter.status === "draft");
}