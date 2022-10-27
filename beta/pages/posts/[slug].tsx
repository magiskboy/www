import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Comment, Image, Table, Meta, Post as PostWrapper } from "components";
import { getPosts } from "tools/post-tool";

const components = { Image, Table, Link };

const Post: NextPage<PageProps> = ({ source, meta, mdxDescription }) => {
  const newMeta = meta;
  newMeta.date = new Date(meta.date);
  return (
    <>
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
