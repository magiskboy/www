import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import slugify from "slugify";
import { Pagination, PaginationProps } from "components/Pagination";
import type { Meta } from "components/Post";

const SERIALIZE_OPTS = {
  rehypePlugins: [rehypeHighlight, rehypeKatex],
  remarkPlugins: [remarkMath],
};

const POST_DIR = path.join(".", "contents", "posts");
console.log(process.cwd());

export async function getPosts(): Promise<Post[]> {
  const filenames = await fs.readdir(POST_DIR);
  const posts = await Promise.all(
    filenames
      .map((filename) => path.join(POST_DIR, filename))
      .map(async (filename, index): Promise<Post> => {
        const slug = getSlugByMdx(filenames[index]);
        const fileContent = (await fs.readFile(filename)).toString();
        const { attributes: meta, body } = fm<Meta>(fileContent);
        const [mdxBody, mdxDescription] = await Promise.all([
          serialize(body, { mdxOptions: SERIALIZE_OPTS }),
          serialize(meta.description || "", { mdxOptions: SERIALIZE_OPTS }),
        ]);
        return {
          slug,
          meta,
          mdxBody,
          mdxDescription,
          body,
        };
      })
  );

  return posts
    .filter((post) => post.meta.published)
    .sort((a, b) => {
      const t1 = (a.meta.date as Date).getTime();
      const t2 = (b.meta.date as Date).getTime();
      if (t1 < t2) return 1;
      if (t1 > t2) return -1;
      return 0;
    });
}

export async function getPaginations(
  posts: Post[],
  perPage = 5
): Promise<Pagination[]> {
  const paginations: Pagination[] = [];
  for (let i = 0; i < posts.length; i += perPage) {
    paginations.push({
      posts: posts.slice(i, i + perPage),
      pagination: {
        hasNext: true,
        hasPrevious: true,
        current: Math.floor(i / perPage) + 1,
      },
    });
  }

  if (paginations.length > 0) {
    paginations[0].pagination.hasPrevious = false;
    paginations[paginations.length - 1].pagination.hasNext = false;
  }
  return paginations;
}

export async function getCollection(
  name: keyof Post["meta"],
  perPage = 5
): Promise<Collection[]> {
  const allPosts = (await getPosts()).filter((post) =>
    Object.hasOwn(post.meta, name)
  );

  const grouped: Record<string, Post[]> = {};
  for (const post of allPosts) {
    const labels = post.meta[name] as string[];
    for (const label of labels) {
      if (!Object.hasOwn(grouped, label)) {
        grouped[label] = [];
      }
      grouped[label].push(post);
    }
  }

  const collections: Collection[] = [];
  for (const [label, posts] of Object.entries(grouped)) {
    const paginations = await getPaginations(posts, perPage);
    collections.push({
      label,
      slug: slugify(label),
      paginations,
    });
  }
  return collections;
}

export interface Collection {
  label: string;
  slug: string;
  paginations: Pagination[];
}

type MDXContent = Awaited<ReturnType<typeof serialize>>;

export interface Post {
  slug: string;
  meta: Meta;
  mdxBody: MDXContent;
  mdxDescription: MDXContent;
  body: string;
}

export interface Pagination {
  posts: Post[];
  pagination: PaginationProps["pagination"];
}

function getSlugByMdx(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}
