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
import { getPosts, getPaginations } from "post-tool";

const Page: NextPage<Props> = ({ paths, pagination }) => {
  const nextGenerator = useCallback<PaginationProps['nextGenerator']>((current) => {
    return `/page/${current + 1}`;
  }, []);

  const prevGenerator = useCallback<PaginationProps['prevGenerator']>((current) => {
    return `/page/${current - 1}`;
  }, []);

  return (
    <Layout>
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <PostItem {...path} />
          <hr />
        </React.Fragment>
      ))}
      <Pagination pagination={pagination} nextGenerator={nextGenerator} prevGenerator={prevGenerator} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    publicRuntimeConfig: { pagination: paginationConfig },
  } = getConfig();
  const allPosts = await getPosts();
  const paginations = await getPaginations(allPosts, paginationConfig.perPage);
  const paths = [];
  for (let i = 1; i <= paginations.length; ++i) {
    paths.push({
      params: { id: i.toString() },
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
  const pages = await getPaginations(allPosts, paginationConfig.perPage);
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
    },
  };
};

interface Props {
  paths: PostItemProps[];
  pagination: PaginationProps["pagination"];
}

export default Page;
