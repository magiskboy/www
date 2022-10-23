import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import type { Meta } from "components/Post";

const SERIALIZE_OPTS = {
  rehypePlugins: [rehypeHighlight, rehypeKatex],
  remarkPlugins: [remarkMath],
};

const POST_DIR = path.join(".", "contents", "posts");

async function getPosts(): Promise<Post[]> {
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

  return posts.sort((a, b) => {
    const t1 = (a.meta.date as Date).getTime();
    const t2 = (b.meta.date as Date).getTime();
    if (t1 < t2) return 1;
    if (t1 > t2) return -1;
    return 0;
  });
}

type MDXContent = Awaited<ReturnType<typeof serialize>>;

interface Post {
  slug: string;
  meta: Meta;
  mdxBody: MDXContent;
  mdxDescription: MDXContent;
  body: string;
}

function getSlugByMdx(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export default getPosts;
