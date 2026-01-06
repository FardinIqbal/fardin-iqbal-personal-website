import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import type { BlogPost } from "@/types";
import { slugify } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// Rehype plugin to generate IDs for headings
function rehypeHeadingIds() {
  return (tree: any) => {
    const usedIds = new Set<string>();

    const visit = (node: any) => {
      if (
        node.type === "element" &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)
      ) {
        // Extract text content from heading
        const getText = (n: any): string => {
          if (n.type === "text") return n.value || "";
          if (n.children) {
            return n.children.map(getText).join("");
          }
          return "";
        };

        const text = getText(node).trim();
        if (text) {
          // Generate slug from text
          let id = slugify(text);
          
          // Ensure uniqueness
          let uniqueId = id;
          let counter = 1;
          while (usedIds.has(uniqueId)) {
            uniqueId = `${id}-${counter}`;
            counter++;
          }
          
          usedIds.add(uniqueId);
          
          // Set ID if not already present
          if (!node.properties?.id) {
            node.properties = {
              ...node.properties,
              id: uniqueId,
            };
          }
        }
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
  };
}

// Rehype plugin to enhance code blocks with language labels
function rehypeCodeBlockEnhancer() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === "element" && node.tagName === "pre") {
        const codeElement = node.children?.find(
          (child: any) => child.type === "element" && child.tagName === "code"
        );
        if (codeElement) {
          const classNameArray = Array.isArray(codeElement.properties?.className)
            ? codeElement.properties.className
            : typeof codeElement.properties?.className === "string"
            ? [codeElement.properties.className]
            : [];
          
          const language = classNameArray
            .find((cls: string) => cls.startsWith("language-"))
            ?.replace("language-", "") || "text";
          
          // Add code-block class and data-lang attribute
          const existingClasses = Array.isArray(node.properties?.className)
            ? node.properties.className
            : typeof node.properties?.className === "string"
            ? [node.properties.className]
            : [];
          
          node.properties = {
            ...node.properties,
            className: ["code-block", ...existingClasses],
            "data-lang": language,
          };
        }
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
  };
}

async function compileMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeHeadingIds)
    .use(rehypeCodeBlockEnhancer)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(".mdx", "");
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug,
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          image: data.image,
          published: data.published !== false,
          readingTime: readingTime(content).text,
          content, // Raw content for listing pages
          externalUrl: data.externalUrl,
          featured: data.featured === true,
        } as BlogPost;
      })
  );

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<(BlogPost & { compiledContent: string }) | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Compile markdown to HTML
  const compiledContent = await compileMarkdown(content);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    image: data.image,
    published: data.published !== false,
    readingTime: readingTime(content).text,
    content,
    compiledContent,
    externalUrl: data.externalUrl,
    featured: data.featured === true,
  };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
