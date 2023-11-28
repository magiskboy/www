import React, { useCallback } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import getConfig from "next/config";
import {
  PostItem,
  PostItemProps,
  Pagination,
  PaginationProps,
  Layout,
} from "components";
import { getPosts, getPaginations } from "tools/post-tool";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Page: NextPage<Props> = ({ paths, pagination }) => {
  const nextGenerator = useCallback<PaginationProps["nextGenerator"]>(
    (current) => {
      return `/page/${current + 1}`;
    },
    []
  );

  const prevGenerator = useCallback<PaginationProps["prevGenerator"]>(
    (current) => {
      return `/page/${current - 1}`;
    },
    []
  );

  return (
    <Layout>
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <PostItem {...path} />
          <hr />
        </React.Fragment>
      ))}
      <Pagination
        pagination={pagination}
        nextGenerator={nextGenerator}
        prevGenerator={prevGenerator}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const {
    publicRuntimeConfig: { pagination: paginationConfig },
  } = getConfig();
  const allPosts = await getPosts();
  const paths = [];

  // for vi
  let posts = allPosts.vi;
  let paginations = getPaginations(posts, paginationConfig.perPage);
  for (let i = 1; i <= paginations.length; ++i) {
    paths.push({
      params: { id: i.toString() },
      locale: "vi",
    });
  }

  // for en
  posts = allPosts.en;
  paginations = getPaginations(posts, paginationConfig.perPage);
  for (let i = 1; i <= paginations.length; ++i) {
    paths.push({
      params: { id: i.toString() },
      locale: "en",
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const {
    publicRuntimeConfig: { pagination: paginationConfig },
  } = getConfig();
  const pageId = parseInt(context.params!.id as string);
  const allPosts = await getPosts();
  const pposts = context.locale === "en" ? allPosts.en : allPosts.vi;
  const pages = getPaginations(pposts, paginationConfig.perPage);
  const { posts, pagination } = pages[pageId - 1];
  const paths: PostItemProps[] = posts.map((post) => ({
    ...post.meta,
    description: post.mdxDescription.compiledSource,
    slug: post.slug,
    date: (post.meta.date as Date).toUTCString(),
  }));

  return {
    props: {
      paths,
      pagination,
      ...(await serverSideTranslations(context.locale || 'vi')),
    },
  };
};

interface Props {
  paths: PostItemProps[];
  pagination: PaginationProps["pagination"];
}

export default Page;
