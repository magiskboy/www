import fs from "fs/promises";
import path from "path";
import _ from 'lodash';
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

var __getPostsCached: Promise<Record<string, Post[]>> | null = null;

async function readMDX(filename: string, fullPath: string): Promise<Post> {
  const slug = path.parse(filename).name;
  const fileContent = (await fs.readFile(fullPath)).toString();
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
}

export async function getPosts(): Promise<Record<string, Post[]>> {
  if (__getPostsCached) return __getPostsCached;

  __getPostsCached = (async function() {
    const localeDirs = await fs.readdir(path.join('.', 'contents'));
    const allPosts: Record<string, Post[]> = {};
    for (const locale of localeDirs) {
      const filenames = await fs.readdir(path.join('.', 'contents', locale, 'posts')).catch(() => []);
      if (filenames.length === 0) continue;
      const posts = await Promise.all(filenames.map(filename =>
        readMDX(
          filename,
          path.join('.', 'contents', locale, 'posts', filename),
        )
      ));

      allPosts[locale] = _.sortBy(_.filter(posts, ['meta.published', true]), ['meta.date']).reverse()
    }
    return allPosts;
  })();

  return __getPostsCached;
}

export function getPaginations(posts: Post[], perPage = 5): Pagination[] {
  const paginations: Pagination[] = _.chunk(posts, perPage).map((chunk, i)=> ({
    posts: chunk,
    pagination: {
      hasNext: true,
      hasPrevious: true,
      current: i + 1, // count from 1
    }
  }));

  if (paginations.length > 0) {
    paginations[0].pagination.hasPrevious = false;
    paginations[paginations.length - 1].pagination.hasNext = false;
  }
  return paginations;
}

export async function getCollection(name: keyof Post["meta"], perPage = 5, locale: string = 'vi'): Promise<Collection[]> {
  const allPosts = await getPosts();
  const posts = allPosts[locale].filter(post => Object.hasOwn(post.meta, name));
  const groups = _.groupBy(posts, `meta[\'${name}\']`);
  return Object.entries(groups).map(([label, posts]) => ({
    label,
    slug: slugify(label),
    paginations: getPaginations(posts, perPage),
  }));
}
