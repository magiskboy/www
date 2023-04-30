import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Comment, Image, Table, Meta, Post as PostWrapper, Caution } from "components";
import { getPosts } from "tools/post-tool";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const components = { Image, Table, Link, Caution };

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
  const locale = context.locale || 'vi';
  const slug = (context.params?.slug as string) || "";
  const allPosts = await getPosts();
  const post = (locale === 'en' ? allPosts.en : allPosts.vi).find((post) => post.slug === slug);
  if (!post) throw new Error(`${slug} not found`);
  return {
    props: {
      source: post.mdxBody,
      meta: {
        ...post.meta,
        date: (post.meta.date as Date).toUTCString(),
      },
      mdxDescription: post.mdxDescription,
      ...(await serverSideTranslations(locale)),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getPosts();
  const paths = [];
  for (const post of allPosts.vi) {
    paths.push({
      params: { slug: post.slug },
      locale: "vi",
    })
  }
  for (const post of allPosts.en) {
    paths.push({
      params: { slug: post.slug },
      locale: "en",
    })
  }
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
