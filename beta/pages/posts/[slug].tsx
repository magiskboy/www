import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Head from 'next/head';
import { Comment, Image, Table, Meta, Post as PostWrapper } from "components";
import getPosts from "get-post";

const components = { Image, Table, Link };

const Post: NextPage<PageProps> = ({ source, meta, mdxDescription }) => {
  const newMeta = meta;
  newMeta.date = new Date(meta.date);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/base16/github.min.css"
          integrity="sha512-+evfh0lCceddhK7IkrvCj9metOEXRt6QNKNMWXBNINkQyLrxLkjyu7ye/g7claDFWtZHSpgJAMR7zTjo++oDPQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"
          integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X"
          crossOrigin="anonymous"
        />
      </Head>
      <PostWrapper meta={newMeta} mdxDescription={mdxDescription}>
        <MDXRemote {...source} components={components} />
      </PostWrapper>
      <Comment />
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const slug = (context.params?.slug as string) || "";
  const post = (await getPosts()).find((post) => post.slug === slug);
  if (!post) throw new Error(`${slug} not found`);
  return {
    props: {
      source: post.mdxBody,
      meta: {
        ...post.meta,
        date: (post.meta.date as Date).toUTCString(),
      },
      mdxDescription: post.mdxDescription,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getPosts()).map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

interface PageProps {
  meta: Meta;
  source: Awaited<ReturnType<typeof serialize>>;
  mdxDescription: Awaited<ReturnType<typeof serialize>>;
}
