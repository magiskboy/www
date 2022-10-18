import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import fm from 'front-matter';
import path from 'path';
import fs from 'fs/promises';
import Image from 'components/Image';
import Table from 'components/Table';
import PostWrapper, { Meta } from 'components/Post';
import { getSlugByMdx } from 'helper';
import rehypeHighlight from "rehype-highlight"

const components = { Image, Table, Link };
const contentDir = 'contents';

const Post: NextPage<PageProps> = ({ source, meta }) => {
  const newMeta = meta;
  newMeta.date = new Date(meta.date);
  return (
    <PostWrapper meta={newMeta}>
      <MDXRemote {...source} components={components} />
    </PostWrapper>
  );
}

export default Post;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const slug = (context.params?.slug as string) || '';
  const { meta, source } = await getPostContent(slug);

  const mdxSource = await serialize(source, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  const mdxDescription = await serialize(meta.description || '');

  return { props: { source: mdxSource, meta: { ...meta, description: mdxDescription.compiledSource } } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join('.', 'contents');
  const files = await fs.readdir(dir);
  return {
    paths: files.map(file => ({ params: { slug: getSlugByMdx(file) } })),
    fallback: false
  }
}

interface PageProps {
  meta: Meta,
  source: Awaited<ReturnType<typeof serialize>>;
}

async function getPostContent(slug: string): Promise<{ meta: Meta, source: string }> {
  const filename = path.join('.', contentDir, `${slug}.mdx`);
  const stat = await fs.stat(filename);

  if (stat.isFile()) {
    const data = await fs.readFile(filename, { encoding: 'utf8' });
    const parsed = fm<Meta>(data.toString());
    const meta = parsed.attributes;
    if (typeof meta.date === 'object') {
      meta.date = meta.date.toUTCString();
    }
    return {
      meta,
      source: parsed.body,
    }
  }

  throw new Error(`${slug} not found`);
}

